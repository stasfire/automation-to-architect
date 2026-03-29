# Module 2: AWS Cloud Fundamentals and Core Services

Master the essential AWS services and cloud computing concepts to build scalable, reliable applications on AWS.

## Learning Objectives

- Understand cloud computing models and AWS's shared responsibility model
- Create and secure an AWS account with billing controls
- Launch and configure EC2 instances for compute workloads
- Store and serve content using S3 and understand storage classes
- Implement identity and access management with IAM
- Design and deploy network infrastructure with VPC
- Monitor costs and optimize resource usage

## Key Concepts

**Shared Responsibility Model**: AWS manages infrastructure security (hardware, data center), while customers manage application security (OS patches, firewall rules, authentication). Understanding this is critical for designing secure systems.

**EC2 (Elastic Compute Cloud)**: Virtual machines in the cloud. Instance types are optimized for different workloads (general-purpose, compute-optimized, memory-optimized). You control OS, applications, and networking.

**S3 (Simple Storage Service)**: Object storage service for files, backups, and static content. Offers multiple storage classes (Standard, Infrequent Access, Glacier) for different cost/access patterns.

**IAM (Identity and Access Management)**: Manages users, groups, roles, and permissions. Follows least-privilege principle: grant minimum permissions needed for users to perform their job.

**VPC (Virtual Private Cloud)**: Isolated network environment in AWS. Contains public subnets (internet-accessible) and private subnets (internal only). Essential for application security and architecture.

**Billing and Cost Management**: AWS provides Free Tier (12 months free on many services), billing alerts, and cost analysis tools. Proper monitoring prevents unexpected charges.

## Curated Resources

- **AWS Cloud Practitioner Essentials on Skill Builder**: https://aws.amazon.com/training/learn-about/architect/
  Official AWS training covering core services, cloud concepts, and certification preparation. Free and self-paced.

- **AWS Free Tier**: https://aws.amazon.com/free/
  Learn which services are free for 12 months, which have always-free tiers, and which offer free trials. Essential for hands-on practice without costs.

- **AWS Management Console**: https://aws.amazon.com/console/
  The web interface for accessing all AWS services. Explore the console while following tutorials.

- **AWS Documentation**: https://docs.aws.amazon.com/
  Comprehensive reference for every AWS service with API documentation and best practices.

## Exercises

1. **Create AWS Free Tier Account** - Sign up for an AWS account, enable MFA, set up billing alerts for $1+, and explore the Free Tier eligibility.

2. **Launch EC2 Instance** - Create a t2.micro instance, configure security groups to allow SSH/HTTP traffic, connect via SSH, and verify connectivity.

3. **Create S3 Bucket and Static Website** - Create an S3 bucket, enable static website hosting, upload HTML/CSS files, and access the website via the public endpoint.

4. **Set Up IAM Users, Roles, and Policies** - Create an IAM user for application access (not root), attach a policy granting S3 and EC2 read permissions, generate access keys, and test the restricted access.

5. **Design VPC with Public and Private Subnets** - Create a VPC with CIDR block 10.0.0.0/16, create public subnet (10.0.1.0/24) and private subnet (10.0.2.0/24), attach Internet Gateway for public access, and configure route tables.

## How to Mark Complete

1. Complete all 5 exercises and document each with screenshots showing successful results.
2. Answer the quiz questions in `tests/quiz.json` and achieve at least 80% (4/5 correct).
3. Create a summary document explaining the shared responsibility model and how it applies to your completed exercises.
4. Verify your AWS account is set up securely (MFA enabled, billing alerts configured, root account not used for daily work).
5. Update a progress file indicating completion date.

**Estimated Time**: 2 weeks of study and hands-on practice
