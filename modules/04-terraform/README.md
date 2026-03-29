# Module 04: Terraform and Infrastructure as Code

## Learning Objectives

- Understand Infrastructure as Code (IaC) principles and benefits
- Install and configure Terraform in your local environment
- Master the Terraform workflow: init, plan, apply, destroy
- Write and manage Terraform configuration files (HCL syntax)
- Provision cloud infrastructure (AWS, Azure, GCP) using Terraform
- Create reusable and maintainable Terraform modules
- Manage Terraform state and implement remote backends
- Import existing infrastructure into Terraform management
- Work with providers, variables, outputs, and data sources
- Prepare for the HashiCorp Certified: Terraform Associate certification

## Key Concepts

**Infrastructure as Code (IaC)**
Infrastructure defined in code (not manual console clicks) enables version control, consistency, repeatability, and easier collaboration. Changes are auditable and reversible.

**Terraform Workflow**
The core cycle: `terraform init` (initialize working directory and download providers), `terraform plan` (preview changes), `terraform apply` (execute changes), and `terraform destroy` (remove resources).

**State Files**
Terraform maintains a state file (.tfstate) that tracks real-world resource configuration. This is the single source of truth. State must be carefully managed and protected in production environments.

**Providers**
Plugins that interact with cloud platforms (AWS, Azure, GCP, etc.) and services. Providers define resources and data sources available for use in configuration.

**Resources and Data Sources**
Resources are managed infrastructure objects (EC2 instances, S3 buckets, databases). Data sources fetch information about existing infrastructure without managing it.

**Modules**
Reusable containers of Terraform configurations. Modules package infrastructure patterns (VPC, load balancer, database) for consistency and code reuse across projects.

**Variables and Outputs**
Input variables make configurations dynamic and reusable. Outputs expose values from your infrastructure (IP addresses, DNS names) for use by other configurations or automation.

**Remote State and Backends**
Storing state remotely (S3, Terraform Cloud) enables team collaboration, prevents concurrent modifications, and provides backup/disaster recovery. Backends abstract state storage.

## Curated Resources

- [HashiCorp Terraform Certification Tutorials](https://developer.hashicorp.com/terraform/tutorials/certification-004) - Official HashiCorp learning path for the Associate certification
- [HashiCorp Terraform Associate Certification](https://developer.hashicorp.com/certifications/infrastructure-automation) - Certification overview, requirements, and exam details
- [Terraform for Associate Certification Study Guide](https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004) - Comprehensive study guide with learning objectives
- [Terraform Beginner to Advanced Course on Udemy](https://www.udemy.com/course/terraform-beginner-to-advanced/) - Hands-on video course covering practical Terraform usage (~$14 with sales)

## Exercises

1. **Install Terraform and Initialize Your First Project**
   - Download and install Terraform for your OS
   - Create a project directory and initialize with `terraform init`
   - Verify installation with `terraform version`

2. **Provision an AWS EC2 Instance with Terraform**
   - Configure AWS provider with credentials
   - Write HCL to provision an EC2 instance with security group
   - Apply configuration and verify instance creation in AWS console
   - Destroy resources cleanly

3. **Use Variables and Outputs**
   - Create `variables.tf` with input variables (instance type, AMI, tags)
   - Create `outputs.tf` to export instance public IP and ID
   - Use `terraform.tfvars` to provide variable values
   - Output values should be accessible after `terraform apply`

4. **Create Reusable Modules**
   - Refactor EC2 provisioning into a module (modules/ec2/)
   - Define module inputs (variables) and outputs
   - Create a main configuration that calls the module
   - Test module reusability by instantiating it twice with different values

5. **Manage State with Remote Backend (S3)**
   - Create an S3 bucket and DynamoDB table for remote state
   - Configure backend block in Terraform to use S3
   - Migrate local state to remote with `terraform init`
   - Verify state is stored remotely and team members can access it

6. **Import Existing Infrastructure into Terraform**
   - Provision a resource manually via AWS console (EC2 instance or S3 bucket)
   - Write Terraform configuration for that resource (without creation)
   - Use `terraform import` to bring the resource under Terraform management
   - Verify state matches actual resource with `terraform plan`

## Estimated Time Commitment

**3 weeks** (roughly 6-8 hours per week)
- Week 1: Installation, basics, first provisioning (Exercises 1-2)
- Week 2: Variables, modules, state management (Exercises 3-5)
- Week 3: Import, advanced patterns, practice exam (Exercise 6 + review)

## Certification Path

This module covers the HashiCorp Certified: Terraform Associate exam.

**Estimated Cost:**
- Udemy course: ~$14 (often on sale from $99)
- Exam fee: $70
- **Total: ~$84**

**How to Mark Complete**

1. Complete all 6 exercises with working code committed to your repository
2. Pass the practice quiz with 80%+ accuracy (see `tests/quiz.json`)
3. Pass the official HashiCorp Terraform Associate exam
4. Update `cert_passed: true` in your learning tracker
5. Document lessons learned and most useful patterns in a short reflection

## Next Steps

After completing this module:
- Move to Module 05: Kubernetes for container orchestration at scale
- Explore Terraform Cloud for team collaboration and governance
- Combine Terraform with CI/CD (Module 06) for full infrastructure automation
