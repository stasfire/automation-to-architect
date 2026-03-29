#!/usr/bin/env node
/**
 * update-progress.js
 *
 * Reads progress.json and generates a markdown progress table + SVG badges.
 * Run: node scripts/update-progress.js
 *
 * This script:
 * 1. Reads progress.json
 * 2. Calculates overall completion percentage
 * 3. Updates the README.md progress section between marker comments
 * 4. Generates a simple SVG badge for the repo
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PROGRESS_FILE = path.join(ROOT, 'progress.json');
const README_FILE = path.join(ROOT, 'README.md');
const BADGE_FILE = path.join(ROOT, '.github', 'progress-badge.svg');

function loadProgress() {
  const raw = fs.readFileSync(PROGRESS_FILE, 'utf8');
  return JSON.parse(raw);
}

function calcStats(progress) {
  const modules = Object.values(progress.modules);
  const totalExercises = modules.reduce((sum, m) => sum + m.exercises_total, 0);
  const completedExercises = modules.reduce((sum, m) => sum + m.exercises_completed, 0);
  const testsPassed = modules.filter(m => m.test_passed).length;
  const modulesCompleted = modules.filter(m => m.status === 'completed').length;
  const pct = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

  return { totalExercises, completedExercises, testsPassed, modulesCompleted, totalModules: modules.length, pct };
}

function statusEmoji(status) {
  switch (status) {
    case 'completed': return '✅';
    case 'in_progress': return '🔄';
    case 'not_started': return '⬜';
    default: return '⬜';
  }
}

function exerciseBar(completed, total) {
  const filled = Math.round((completed / total) * 10);
  const empty = 10 - filled;
  return '█'.repeat(filled) + '░'.repeat(empty) + ` ${completed}/${total}`;
}

function generateProgressTable(progress, stats) {
  let table = `| # | Module | Status | Exercises | Test |\n`;
  table += `|---|--------|--------|-----------|------|\n`;

  for (const [key, mod] of Object.entries(progress.modules)) {
    const num = key.split('-')[0];
    const status = statusEmoji(mod.status);
    const exercises = exerciseBar(mod.exercises_completed, mod.exercises_total);
    const test = mod.test_passed ? '✅' : '⬜';
    const cert = mod.cert_passed !== undefined ? (mod.cert_passed ? ' 🏆' : '') : '';
    table += `| ${num} | **${mod.title}** | ${status} | \`${exercises}\` | ${test}${cert} |\n`;
  }

  table += `\n**Overall: ${stats.pct}%** — ${stats.completedExercises}/${stats.totalExercises} exercises · ${stats.testsPassed}/${stats.totalModules} tests passed · ${stats.modulesCompleted}/${stats.totalModules} modules completed\n`;

  return table;
}

function generateBadgeSVG(pct) {
  const color = pct === 100 ? '#22c55e' : pct >= 50 ? '#eab308' : '#3b82f6';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="20">
  <rect width="100" height="20" rx="3" fill="#555"/>
  <rect x="100" width="60" height="20" rx="3" fill="${color}"/>
  <rect x="100" width="4" height="20" fill="${color}"/>
  <text x="50" y="14" fill="#fff" font-family="Verdana" font-size="11" text-anchor="middle">progress</text>
  <text x="130" y="14" fill="#fff" font-family="Verdana" font-size="11" text-anchor="middle">${pct}%</text>
</svg>`;
}

function updateReadme(progressTable) {
  if (!fs.existsSync(README_FILE)) return;

  let readme = fs.readFileSync(README_FILE, 'utf8');
  const startMarker = '<!-- PROGRESS:START -->';
  const endMarker = '<!-- PROGRESS:END -->';

  if (readme.includes(startMarker) && readme.includes(endMarker)) {
    const before = readme.substring(0, readme.indexOf(startMarker) + startMarker.length);
    const after = readme.substring(readme.indexOf(endMarker));
    readme = before + '\n\n' + progressTable + '\n' + after;
    fs.writeFileSync(README_FILE, readme);
    console.log('README.md progress section updated.');
  } else {
    console.log('No progress markers found in README.md. Skipping update.');
  }
}

// --- Main ---
const progress = loadProgress();
const stats = calcStats(progress);
const table = generateProgressTable(progress, stats);
const badge = generateBadgeSVG(stats.pct);

updateReadme(table);
fs.writeFileSync(BADGE_FILE, badge);
console.log(`Badge written to ${BADGE_FILE}`);
console.log(`\nProgress: ${stats.pct}% (${stats.completedExercises}/${stats.totalExercises} exercises)`);
