# Module 06: CI/CD Pipelines and GitOps

## Learning Objectives

- Understand Continuous Integration, Continuous Delivery, and Continuous Deployment concepts
- Create and configure GitHub Actions workflows
- Build and test applications automatically on code changes
- Build and push Docker images in CI pipelines
- Deploy applications to cloud platforms (AWS, Vercel, Kubernetes) from CI
- Implement branch protection with required status checks
- Manage secrets and credentials securely in CI/CD systems
- Implement GitOps workflows with environment promotion (dev → staging → prod)
- Monitor and troubleshoot CI/CD pipeline failures
- Understand Kubernetes-native CI/CD tools (ArgoCD, Flux, Devtron)
- Use AI-assisted pipeline optimization (GitHub Copilot for workflow authoring)
- Best practices for pipeline design and maintenance

## Key Concepts

**Continuous Integration (CI)**
Automatically run tests, linting, and builds on every code change. Catches integration issues early and ensures code quality before merging.

**Continuous Delivery (CD)**
Automatically build, test, and prepare code for production but require manual approval for deployment. Ensures production-ready artifacts at all times.

**Continuous Deployment**
Automatically deploy every successful change directly to production with no manual approval. Highest velocity but requires mature testing and monitoring.

**GitHub Actions**
GitHub's native CI/CD platform. Workflows are YAML files triggered by events (push, pull_request, schedule). Actions are reusable units of automation.

**GitOps**
Infrastructure and deployment configuration defined in Git. Pull requests drive all changes. Git is the single source of truth for desired infrastructure state.

**Secrets Management**
Sensitive data (API keys, tokens, passwords) encrypted at rest in CI/CD. Only decrypted during job execution. Never log secrets.

**Environment Promotion**
Code flows through environments with increasing stability: dev (testing) → staging (production-like) → production. Each environment has its own approval gates and configuration.

**Artifacts and Images**
Build outputs (Docker images, compiled binaries, packages) produced by CI and consumed by CD. Store in registries (ECR, Docker Hub) for versioning and deployment.

**GitOps Controllers (ArgoCD / Flux)**
Kubernetes-native continuous delivery tools that sync the desired state from Git to your cluster. ArgoCD provides a web UI for visualizing sync status. Flux is lighter-weight and runs entirely via CRDs. Both enable pull-based deployments where the cluster pulls changes from Git rather than CI pushing to the cluster.

**AI-Assisted Pipeline Authoring**
GitHub Copilot can generate workflow YAML, suggest CI steps, and debug failing pipelines. Tools like Harness use AI to optimize pipeline execution order, predict flaky tests, and auto-rollback failed deployments.

## Curated Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions) - Official GitHub Actions reference, workflow syntax, and best practices
- [GitLab CI Documentation](https://docs.gitlab.com/ee/ci/) - Comprehensive GitLab CI/CD pipeline configuration guide
- [GitHub Marketplace Actions](https://github.com/marketplace?type=actions) - Community and verified actions for common tasks (tests, deployments, notifications)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/) - Kubernetes-native GitOps continuous delivery
- [Dometrain - Learn GitHub Actions (Free)](https://dometrain.com/course/from-zero-to-hero-github-actions/) - Free course from basics to advanced workflows

## Exercises

1. **Create GitHub Action that Runs Tests on Push**
   - Initialize a Node.js or Python project with unit tests
   - Create a `.github/workflows/test.yml` workflow
   - Trigger tests on push to any branch and pull requests
   - Generate test reports and fail builds on test failures
   - Add badge to README showing workflow status

2. **Build and Push Docker Image in CI**
   - Create a Dockerfile for your application
   - Write a GitHub Actions workflow that builds the Docker image
   - Authenticate with Docker Hub or AWS ECR
   - Tag images with commit SHA and version tags
   - Push image on successful build
   - Use Docker layer caching to speed up builds

3. **Deploy to AWS/Vercel from CI Pipeline**
   - Set up AWS credentials or Vercel token as secrets in GitHub
   - Create workflow that deploys to Vercel on push to main branch
   - Alternatively, deploy to AWS Lambda, EC2, or ECS
   - Verify deployment by checking running application
   - Document deployment configuration and credentials setup

4. **Implement Branch Protection with Required Checks**
   - Create a GitHub repository branch protection rule
   - Require status checks (tests, linting, build) to pass before merge
   - Dismiss stale reviews on new pushes
   - Require pull request reviews before merge
   - Verify protections prevent merging without passing checks

5. **Set Up GitOps Workflow with Environment Promotion**
   - Create Git branches for dev, staging, and production
   - Set up three separate CI/CD pipelines (one per environment)
   - Dev automatically deploys on commit; staging/prod require approval
   - Use GitHub environments with deployment protection rules
   - Document the promotion process: dev → staging (after manual testing) → prod (after approval)
   - Implement secrets per environment (different database URLs, API keys)

## Estimated Time Commitment

**2 weeks** (roughly 5-7 hours per week)
- Week 1: GitHub Actions basics, tests, Docker builds (Exercises 1-2)
- Week 2: Deployments, branch protection, GitOps (Exercises 3-5)

## Best Practices

- Keep workflows DRY: extract common steps into reusable actions
- Use matrix builds to test multiple versions (Node 16, 18, 20)
- Cache dependencies (npm, pip) to speed up builds
- Use semantic versioning for image tags and releases
- Never commit secrets; use encrypted environment variables
- Require code reviews before production deployments
- Monitor deployment outcomes with notifications
- Keep workflows readable: use descriptive job and step names

## How to Mark Complete

1. Complete all 5 exercises with working workflows committed to your repository
2. All workflows pass and deploy successfully
3. Pass the practice quiz with 80%+ accuracy (see `tests/quiz.json`)
4. Test branch protection by attempting to merge failing PR (verify it's blocked)
5. Document your GitOps promotion strategy and lessons learned

## Next Steps

After completing this module:
- Integrate Kubernetes deployments (Module 05) with GitOps workflows
- Use Terraform (Module 04) to provision CI/CD infrastructure
- Explore advanced topics: GitOps controllers (ArgoCD, Flux), infrastructure-as-code deployments, secret rotation
- Set up comprehensive monitoring and observability for pipelines and deployments
