#!/usr/bin/env node
/**
 * run-tests.js
 *
 * Discovers and runs all module tests (JSON quiz files).
 * Each test file is a JSON array of multiple-choice questions.
 *
 * Usage:
 *   node scripts/run-tests.js                  # Run all tests
 *   node scripts/run-tests.js 01-docker        # Run specific module
 *   node scripts/run-tests.js --check          # CI mode: exit 1 if any test file is malformed
 *   node scripts/run-tests.js --interactive    # Interactive quiz mode
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const MODULES_DIR = path.join(ROOT, 'modules');
const PROGRESS_FILE = path.join(ROOT, 'progress.json');

function discoverTests(moduleFilter) {
  const modules = fs.readdirSync(MODULES_DIR).filter(d => {
    if (moduleFilter && !d.includes(moduleFilter)) return false;
    return fs.statSync(path.join(MODULES_DIR, d)).isDirectory();
  }).sort();

  const tests = [];
  for (const mod of modules) {
    const testDir = path.join(MODULES_DIR, mod, 'tests');
    if (!fs.existsSync(testDir)) continue;
    const files = fs.readdirSync(testDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      tests.push({ module: mod, file: path.join(testDir, file), name: file });
    }
  }
  return tests;
}

function validateTest(testFile) {
  const raw = fs.readFileSync(testFile, 'utf8');
  const questions = JSON.parse(raw);

  if (!Array.isArray(questions)) throw new Error('Test must be a JSON array');

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!q.question) throw new Error(`Question ${i + 1}: missing "question" field`);
    if (!Array.isArray(q.options) || q.options.length < 2) throw new Error(`Question ${i + 1}: needs at least 2 options`);
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) {
      throw new Error(`Question ${i + 1}: "answer" must be a valid option index`);
    }
    if (!q.explanation) throw new Error(`Question ${i + 1}: missing "explanation" field`);
  }
  return questions;
}

function checkMode(tests) {
  let allValid = true;
  for (const test of tests) {
    try {
      validateTest(test.file);
      console.log(`  ✅ ${test.module}/${test.name} — valid`);
    } catch (err) {
      console.error(`  ❌ ${test.module}/${test.name} — ${err.message}`);
      allValid = false;
    }
  }
  return allValid;
}

async function interactiveMode(tests) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise(resolve => rl.question(q, resolve));

  let totalCorrect = 0;
  let totalQuestions = 0;

  for (const test of tests) {
    let questions;
    try {
      questions = validateTest(test.file);
    } catch (err) {
      console.log(`\n⚠️  Skipping ${test.module}/${test.name}: ${err.message}`);
      continue;
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📝 ${test.module} — ${test.name.replace('.json', '')}`);
    console.log(`${'═'.repeat(60)}\n`);

    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`${i + 1}. ${q.question}\n`);
      q.options.forEach((opt, j) => console.log(`   ${String.fromCharCode(65 + j)}) ${opt}`));

      const response = await ask('\n   Your answer (A/B/C/D): ');
      const answerIdx = response.trim().toUpperCase().charCodeAt(0) - 65;

      if (answerIdx === q.answer) {
        console.log(`\n   ✅ Correct!\n`);
        correct++;
      } else {
        console.log(`\n   ❌ Wrong. Correct answer: ${String.fromCharCode(65 + q.answer)}) ${q.options[q.answer]}\n`);
      }
      console.log(`   💡 ${q.explanation}\n`);
      totalQuestions++;
    }

    totalCorrect += correct;
    const pct = Math.round((correct / questions.length) * 100);
    console.log(`\nScore: ${correct}/${questions.length} (${pct}%) ${pct >= 80 ? '— PASSED ✅' : '— needs review 📖'}`);
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`Overall: ${totalCorrect}/${totalQuestions} (${Math.round((totalCorrect / totalQuestions) * 100)}%)`);
  console.log(`${'═'.repeat(60)}\n`);

  rl.close();
}

// --- Main ---
const args = process.argv.slice(2);
const isCheck = args.includes('--check');
const isInteractive = args.includes('--interactive');
const moduleFilter = args.find(a => !a.startsWith('--'));

const tests = discoverTests(moduleFilter);

if (tests.length === 0) {
  console.log('No test files found. Add JSON quiz files to modules/*/tests/');
  process.exit(0);
}

console.log(`Found ${tests.length} test file(s):\n`);

if (isCheck) {
  const valid = checkMode(tests);
  process.exit(valid ? 0 : 1);
} else if (isInteractive) {
  interactiveMode(tests).catch(console.error);
} else {
  // Default: validate all
  const valid = checkMode(tests);
  console.log(valid ? '\nAll tests valid.' : '\nSome tests have issues.');
  process.exit(valid ? 0 : 1);
}
