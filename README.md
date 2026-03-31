# Automation to Architect

**A free, open-source learning path for automation engineers transitioning to Solutions Architect, Platform Engineer, or DevOps roles.**

> "What's the skill behind the skill? It was never about writing test scripts. It's about understanding how complex systems connect, evaluating tools, designing reliable workflows, and making smart infrastructure decisions under constraints."

---

## What This Is

A structured, hands-on curriculum that takes you from automation engineering to cloud architecture — with exercises, quizzes, real projects, and progress tracking. Built by an automation engineer going through the transition, for other engineers making the same move.

**Total cost to complete: ~$263** (two industry certifications + everything else is free)

**Time commitment: ~6 months** at 1-2 hours per day

---

## Progress

<!-- PROGRESS:START -->

| # | Module | Status | Exercises | Test |
|---|--------|--------|-----------|------|
| 01 | **Docker Fundamentals** | ⬜ | `░░░░░░░░░░ 0/5` | ⬜ |
| 02 | **AWS Cloud Foundations** | ⬜ | `░░░░░░░░░░ 0/5` | ⬜ |
| 03 | **AWS Solutions Architect Associate** | ⬜ | `░░░░░░░░░░ 0/8` | ⬜ |
| 04 | **Terraform & Infrastructure as Code** | ⬜ | `░░░░░░░░░░ 0/6` | ⬜ |
| 05 | **Kubernetes & Container Orchestration** | ⬜ | `░░░░░░░░░░ 0/6` | ⬜ |
| 06 | **CI/CD Pipelines & GitOps** | ⬜ | `░░░░░░░░░░ 0/5` | ⬜ |
| 07 | **Monitoring & Observability** | ⬜ | `░░░░░░░░░░ 0/5` | ⬜ |
| 08 | **System Design for Interviews** | ⬜ | `░░░░░░░░░░ 0/8` | ⬜ |
| 09 | **Interview Preparation & Portfolio** | ⬜ | `░░░░░░░░░░ 0/5` | ⬜ |
| 10 | **AI for Cloud & DevOps Engineers** | ⬜ | `░░░░░░░░░░ 0/5` | ⬜ |

**Overall: 0%** — 0/58 exercises · 0/10 tests passed · 0/10 modules completed

<!-- PROGRESS:END -->

---

## Modules

### Month 1 — Foundations

| Module | What You'll Learn | Time | Cost |
|--------|-------------------|------|------|
| [01 - Docker](modules/01-docker/) | Containers, images, volumes, networking, Compose | ~1 week | Free |
| [02 - AWS Foundations](modules/02-aws-foundations/) | Cloud concepts, core services, IAM, VPC, S3 | ~2 weeks | Free |

### Month 2-3 — AWS Certification

| Module | What You'll Learn | Time | Cost |
|--------|-------------------|------|------|
| [03 - AWS SA Associate](modules/03-aws-sa-associate/) | All SAA-C03 domains, hands-on labs, practice exams | ~6 weeks | ~$179 |

### Month 3-4 — Infrastructure as Code

| Module | What You'll Learn | Time | Cost |
|--------|-------------------|------|------|
| [04 - Terraform](modules/04-terraform/) | HCL, providers, state, modules, Terraform Cloud | ~3 weeks | ~$84 |

### Month 4-5 — Orchestration & Pipelines

| Module | What You'll Learn | Time | Cost |
|--------|-------------------|------|------|
| [05 - Kubernetes](modules/05-kubernetes/) | Pods, deployments, services, ingress, Helm | ~3 weeks | Free |
| [06 - CI/CD](modules/06-ci-cd-pipelines/) | GitHub Actions, GitLab CI, pipeline design | ~2 weeks | Free |

### Month 5-6 — Interview Ready

| Module | What You'll Learn | Time | Cost |
|--------|-------------------|------|------|
| [07 - Monitoring](modules/07-monitoring-observability/) | Prometheus, Grafana, OpenTelemetry, CloudWatch, alerting | ~2 weeks | Free |
| [08 - System Design](modules/08-system-design/) | Scalability, databases, caching, event-driven architecture | ~4 weeks | Free |
| [09 - Interview Prep](modules/09-interview-prep/) | Behavioral questions, portfolio, resume, mock interviews | ~2 weeks | Free |

### Month 6-7 — AI Skills

| Module | What You'll Learn | Time | Cost |
|--------|-------------------|------|------|
| [10 - AI for Cloud & DevOps](modules/10-ai-for-cloud-devops/) | GitHub Copilot, Amazon Bedrock, AI-powered monitoring, prompt engineering for IaC | ~3 weeks | Free |

---

## How It Works

### Learning

Each module has:
- **README** — learning objectives, key concepts, and curated resource links
- **exercises/** — hands-on tasks that build real skills
- **tests/** — JSON quiz files you can run interactively
- **notes/** — your personal notes (gitignored or committed, your choice)

### Testing

```bash
# Validate all test files are well-formed
node scripts/run-tests.js --check

# Take a quiz interactively
node scripts/run-tests.js --interactive

# Quiz a specific module
node scripts/run-tests.js --interactive 01-docker
```

### Progress Tracking

Edit `progress.json` as you complete exercises and pass tests. Then:

```bash
node scripts/update-progress.js
```

This regenerates the progress table in this README and the SVG badge. The GitHub Action does this automatically on push to main.

---

## Who This Is For

- **Automation engineers** seeing AI replace manual test scripting and wanting to level up
- **QA engineers** who want to move into DevOps, platform, or architecture roles
- **Self-taught developers** who can build apps but want to understand infrastructure
- **Career changers** targeting Solutions Architect, Platform Engineer, DevOps, or Integration Engineer roles

---

## Target Roles & Salary Ranges

| Role | Salary Range | Key Skills from This Course |
|------|-------------|----------------------------|
| Integration Engineer | $90K–$140K | Modules 01, 02, 06, 08 |
| DevOps Engineer | $110K–$160K | Modules 01, 04, 05, 06, 07 |
| Platform Engineer | $120K–$180K | Modules 01, 04, 05, 06, 07 |
| Solutions Architect | $130K–$200K+ | Modules 02, 03, 04, 08, 09 |

---

## Certification Roadmap

| Cert | Cost | When | ROI |
|------|------|------|-----|
| **AWS Solutions Architect Associate** | $150 | Month 3 | Unlocks SA + Platform roles. Most recognized cloud cert. |
| **HashiCorp Terraform Associate** | $70 | Month 4-5 | On nearly every DevOps job listing. Cheapest cert/highest signal. |
| **CKAD** (stretch) | $395-$445 | Month 7+ | Hands-on K8s exam. Pursue after landing first role. |

---

## Contributing

This is an open learning path. If you're on the same journey:

1. Fork this repo
2. Work through the modules at your pace
3. Submit PRs to improve exercises, fix errors, or add resources
4. Share your progress — tag your posts with `#AutomationToArchitect`

---

## License

MIT — use it, fork it, share it.
