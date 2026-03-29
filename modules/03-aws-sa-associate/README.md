# Module 3: AWS Solutions Architect Associate (SAA-C03) Exam Preparation

Prepare for the AWS Certified Solutions Architect - Associate (SAA-C03) certification by mastering architecture patterns, designing resilient systems, and understanding AWS best practices.

## Learning Objectives

- Apply the AWS Well-Architected Framework (operational excellence, security, reliability, performance, cost optimization)
- Design highly available and fault-tolerant architectures
- Implement auto-scaling and load balancing for resilience
- Optimize storage with lifecycle policies and CloudFront distribution
- Build serverless applications using Lambda, API Gateway, and DynamoDB
- Design multi-region strategies and disaster recovery
- Implement least-privilege IAM policies for security
- Pass the AWS Solutions Architect Associate certification exam

## Key Concepts

**Well-Architected Framework**: Five pillars guide AWS architecture. Operational Excellence (monitoring, automation), Security (least-privilege, encryption), Reliability (fault tolerance, auto-recovery), Performance Efficiency (scaling, optimization), Cost Optimization (right-sizing, reserved capacity).

**High Availability (HA)**: Systems designed to remain operational despite failures. Achieved through redundancy across availability zones, auto-scaling, and health checks.

**RDS Multi-AZ vs Read Replicas**: Multi-AZ provides synchronous replication to a standby for failover (HA). Read Replicas are asynchronous copies used for scaling read workloads, can be in different regions.

**S3 Consistency Model**: S3 provides strong consistency. PUT requests are immediately readable; DELETE operations may have brief inconsistency windows.

**Lambda Concurrency**: Lambda automatically scales within concurrency limits. Reserved concurrency guarantees capacity; provisioned concurrency pre-warms instances.

**ALB vs NLB**: Application Load Balancer (ALB) handles HTTP/HTTPS at Layer 7 (best for web apps). Network Load Balancer (NLB) handles TCP/UDP at Layer 4 (best for ultra-high performance, gaming, IoT).

**Route 53 Routing Policies**: Simple (single resource), Weighted (distribute traffic by percentage), Latency (route to lowest latency), Failover (active-passive), Geolocation (location-based), Multi-value (multiple healthy records).

**ElastiCache**: In-memory cache (Redis/Memcached) for reducing database load and improving response times. Common for session storage and frequently accessed data.

**Cost Optimization**: Right-size instances, use Reserved Instances for predictable workloads, implement lifecycle policies, choose appropriate storage classes.

## Curated Resources

- **Stephane Maarek Udemy Course**: https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/
  Comprehensive video course covering all exam domains with hands-on labs. Cost: ~$14.

- **Tutorials Dojo Practice Exams**: https://portal.tutorialsdojo.com/courses/aws-certified-solutions-architect-associate-practice-exams/
  High-quality practice exams with explanations for every question. Cost: ~$15.

- **Adrian Cantrill Course**: https://learn.cantrill.io/p/aws-certified-solutions-architect-associate-saa-c03
  In-depth architectural training with detailed explanations and real-world scenarios.

- **AWS Exam Page**: https://aws.amazon.com/certification/certified-solutions-architect-associate/
  Official exam details, sample questions, and registration information.

- **Free Practice Questions**: https://easy-prep.org/aws-solutions-architect-associate-exam-questions
  Free practice questions to supplement paid courses and assess readiness.

## Exercises

1. **Design Highly Available Web Application** - Create architecture diagram with multi-AZ deployment, ALB, auto-scaling group, RDS Multi-AZ, and S3 for static assets. Document failover behavior.

2. **Auto-Scaling with Load Balancer** - Set up an ALB, create launch template with web server, configure auto-scaling group (min 2, max 6 instances), and test scaling by simulating load.

3. **Implement S3 Lifecycle Policies** - Create S3 bucket, configure lifecycle policy to transition objects to Glacier after 30 days, delete after 1 year. Verify policy is applied.

4. **Configure CloudFront Distribution** - Create CloudFront distribution pointing to S3 bucket, configure caching behavior, set TTL, and verify content is served from edge locations.

5. **Design Serverless API** - Create Lambda function (business logic), API Gateway (HTTP endpoint), DynamoDB table (data storage), and IAM role with least-privilege permissions. Test end-to-end flow.

6. **Set Up Cross-Region Replication** - Create primary S3 bucket in us-east-1, enable cross-region replication to us-west-2, upload objects, verify replication.

7. **Implement Least-Privilege IAM Policies** - Audit existing IAM users/roles, remove overly permissive policies (e.g., `*:*`), create specific policies granting only required permissions (e.g., EC2 read-only, S3 specific bucket access).

8. **Take Practice Exams** - Complete 3 full-length practice exams from Tutorials Dojo or similar provider. Score 80%+ on each before attempting actual exam. Review incorrect answers and weak areas.

## Cost Information

Total cost for exam preparation materials and certification:
- Stephane Maarek Udemy course: ~$14 (sale price)
- Tutorials Dojo practice exams: ~$15
- AWS Solutions Architect Associate exam: $150
- **Total: ~$179**

Consider waiting for Udemy sales (frequent 80-90% discounts) and purchasing during promotions.

## Certification Tracking

- cert_passed: false
- exam_date: (to be filled in)
- score: (to be filled in)
- first_attempt_date: (to be filled in)

## How to Mark Complete

1. Complete all 8 exercises and document with architecture diagrams and configuration screenshots.
2. Answer the quiz questions in `tests/quiz.json` and achieve 100% (8/8 correct) to demonstrate mastery.
3. Complete at least 3 full-length practice exams with 80%+ score on each.
4. Schedule and pass the AWS Solutions Architect Associate certification exam (score 720+ out of 1000).
5. Update cert_passed to true and fill in exam_date and score when certification is achieved.
6. Update a progress file indicating completion date and certification achievement.

**Estimated Time**: 6 weeks of study, practice exams, and hands-on labs
