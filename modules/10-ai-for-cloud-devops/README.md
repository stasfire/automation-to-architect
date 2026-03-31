# Module 10: AI for Cloud and DevOps Engineers

Learn how AI is transforming infrastructure engineering — from generating Terraform with natural language to AI-powered monitoring, automated incident response, and building with foundation models on AWS.

> "Engineers who use AI will replace engineers who do not." — This module is about AI fluency, not data science. You don't need to train models. You need to know how to use them to 5-10x your infrastructure work.

## Learning Objectives

- Use GitHub Copilot (Agent Mode) to generate and debug infrastructure code
- Use Amazon Q Developer for AWS-specific code generation and troubleshooting
- Write effective prompts for IaC generation (Terraform, CloudFormation, Kubernetes manifests)
- Understand Amazon Bedrock: when to use foundation models vs custom ML
- Build a simple application using the Bedrock API with Claude or other models
- Implement AI-powered monitoring and anomaly detection
- Understand agentic workflows and the Model Context Protocol (MCP)
- Evaluate when AI-generated code is safe to deploy vs needs human review

## Key Concepts

**AI-Assisted Infrastructure as Code**
AI coding assistants (GitHub Copilot, Amazon Q, Claude Code) can generate Terraform modules, Kubernetes manifests, Dockerfiles, and CI/CD workflows from natural language descriptions. The key skill is writing precise prompts that specify constraints (region, instance type, security groups) and reviewing the output for correctness and security.

**GitHub Copilot Agent Mode**
Goes beyond autocomplete — Copilot Agent Mode can analyze your codebase, make multi-file changes, suggest terminal commands, and self-heal runtime errors. It supports multiple models (Claude, GPT, Gemini) and integrates with VS Code, JetBrains, and the CLI. Essential for any modern developer workflow.

**Amazon Q Developer**
AWS's AI assistant built on Bedrock. Generates CloudFormation and Terraform, explains AWS errors, suggests optimizations, and helps with migration planning. Free tier available. Integrated into the AWS Console, IDE extensions, and CLI.

**Amazon Bedrock**
AWS's managed service for accessing foundation models (Claude, Llama, Titan, Mistral) via API. No infrastructure to manage — you send prompts and get responses. Use Bedrock when you need AI capabilities in your applications without training custom models. Key use cases: chatbots, document analysis, code generation, content creation.

**When to Use Bedrock vs SageMaker**
- **Bedrock**: Use pre-trained models via API. Best for inference, RAG, prompt engineering. No ML expertise needed.
- **SageMaker**: Train, fine-tune, and deploy custom models. Best when you need domain-specific models trained on your data. Requires ML knowledge.

For Solutions Architects: recommend Bedrock for 90% of generative AI use cases. Recommend SageMaker only when customers need custom model training.

**Prompt Engineering for Infrastructure**
Writing effective prompts is a skill. For IaC generation: specify the cloud provider, resource types, naming conventions, security requirements, and compliance constraints. Always include "explain your reasoning" to verify the AI understood your intent. Review all generated code for security before applying.

**AI-Powered Monitoring (AIOps)**
AI enhances monitoring by detecting anomalies that static thresholds miss, correlating events across services, predicting failures before they happen, and auto-generating runbooks. Tools: PagerDuty AIOps, Dynatrace Davis AI, AWS DevOps Guru, Datadog Watchdog.

**Agentic Workflows and MCP**
AI agents that can take actions autonomously — reading files, running commands, calling APIs — through frameworks like LangChain, LangGraph, and the Model Context Protocol (MCP). MCP provides a standard way for AI models to interact with external tools and data sources. Understanding agent architecture is increasingly important for building AI-powered automation.

**AI in Integration Engineering**
AI transforms integration work by generating API data mappings, classifying events intelligently, predicting optimal routing, auto-generating API documentation, and enabling self-healing integration flows. Event-driven architectures combined with AI enable real-time intelligent processing at scale.

## Curated Resources

**AI Coding Assistants**
- [GitHub Copilot Docs](https://docs.github.com/en/copilot) - Official documentation for Copilot features including Agent Mode
- [Amazon Q Developer](https://aws.amazon.com/q/developer/) - AWS AI coding assistant with free tier

**AWS AI Services**
- [AWS Skill Builder - Generative AI Hub](https://skillbuilder.aws/generative-ai) - Free courses including Cloud Quest: Generative AI Practitioner
- [Building GenAI Apps with Amazon Bedrock](https://skillbuilder.aws/learn/TM4ZAXTGEZ/building-generative-ai-applications-using-amazon-bedrock/WM6Z6ZHU7K) - Free self-paced course on Bedrock
- [AWS Bedrock vs SageMaker Decision Guide](https://docs.aws.amazon.com/decision-guides/latest/bedrock-or-sagemaker/bedrock-or-sagemaker.html) - Official guidance on when to use which

**AI for DevOps**
- [KodeKloud AI Roadmap for DevOps Engineers](https://kodekloud.com/blog/ai-powered-roadmap-for-devops-and-cloud-engineers/) - Free roadmap with hands-on guidance
- [Anthropic MCP Documentation](https://modelcontextprotocol.io/) - Model Context Protocol specification and SDKs

Additional reading:
- Pulumi blog: "Top Claude Skills for DevOps" — practical AI workflows for infrastructure
- Spacelift: "Top AI DevOps Tools" — current landscape overview
- AWS re:Invent sessions on Bedrock architecture patterns (YouTube)

## Exercises

1. **Generate a Complete Terraform Module Using AI**
   - Use GitHub Copilot or Claude Code to generate a Terraform module for a VPC with public/private subnets, NAT gateway, and security groups
   - Prompt iteratively: start with basic requirements, then add constraints (specific CIDR ranges, tags, multi-AZ)
   - Review the generated code for security issues (open ports, missing encryption, overly permissive IAM)
   - Compare the AI output with a manually written module — document what the AI got right and wrong
   - Time: 3-4 hours

2. **Build a Simple App with Amazon Bedrock**
   - Set up AWS credentials and install the AWS SDK (Python boto3 or Node.js)
   - Write a script that sends a prompt to Claude via the Bedrock InvokeModel API
   - Build a simple CLI tool that takes a question about AWS services and returns an AI-generated answer
   - Add conversation history (multi-turn chat) using the Bedrock Converse API
   - Extend to summarize a document or generate a CloudFormation template from a description
   - Time: 4-5 hours

3. **Create an AI-Powered Incident Responder**
   - Set up a monitoring stack (Prometheus + Grafana from Module 07)
   - Write a script that detects anomalies in metrics (sudden spike in error rate or latency)
   - When anomaly detected, send the metrics context to Bedrock/Claude with the prompt: "Analyze these metrics and suggest root causes and remediation steps"
   - Output a formatted incident report with the AI-generated analysis
   - Time: 5-6 hours

4. **Prompt Engineering Challenge: Generate Kubernetes Manifests**
   - Start with a vague prompt: "Create a Kubernetes deployment for a web app"
   - Iteratively improve the prompt: add resource limits, health checks, HPA, PDB, security context
   - Document each iteration — how did the output improve with better prompts?
   - Final prompt should generate production-ready manifests that pass `kubectl --dry-run` and `kubescore`
   - Time: 3-4 hours

5. **Evaluate AI-Generated Code for Security**
   - Use AI to generate infrastructure code for 5 different scenarios (S3 bucket, RDS instance, Lambda function, API Gateway, IAM role)
   - Run each through a security scanner (checkov, tfsec, or AWS Config rules)
   - Document every security issue found
   - Write a "prompt engineering checklist" for secure IaC generation based on your findings
   - Time: 3-4 hours

## How to Mark Complete

1. Complete all 5 exercises with code and documentation committed to your repository
2. Pass the practice quiz with 80%+ accuracy (see `tests/quiz.json`)
3. Write a reflection covering:
   - Which AI tool was most useful for your workflow and why
   - Where AI-generated code needed the most human review
   - How you would integrate AI tools into a team's daily workflow
4. Bonus: Complete the AWS Cloud Quest: Generative AI Practitioner on Skill Builder (free badge)

## Estimated Time Commitment

**3 weeks** (roughly 5-7 hours per week)
- Week 1: AI coding assistants, IaC generation, prompt engineering (Exercises 1, 4)
- Week 2: Amazon Bedrock, building AI applications (Exercise 2)
- Week 3: AI-powered monitoring, security review, reflection (Exercises 3, 5)

## Next Steps

After completing this module:
- Pursue the AWS Certified Generative AI Developer Professional certification
- Explore building MCP servers for your own DevOps tools
- Integrate AI-powered monitoring into your production systems
- Combine this module with Module 09 (Interview Prep) — AI skills are now asked about in every Solutions Architect and Platform Engineer interview
