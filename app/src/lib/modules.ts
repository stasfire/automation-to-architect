import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export interface Resource {
  title: string;
  url: string;
  description: string;
  type: 'course' | 'docs' | 'practice' | 'tool' | 'community';
}

export interface ModuleConfig {
  slug: string;
  number: string;
  title: string;
  exerciseCount: number;
  estimatedTime: string;
  cost: string;
  month: string;
  resources: Resource[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const MODULE_CONFIGS: ModuleConfig[] = [
  {
    slug: '01-docker', number: '01', title: 'Docker Fundamentals', exerciseCount: 5, estimatedTime: '~1 week', cost: 'Free', month: 'Month 1',
    resources: [
      { title: 'KodeKloud Free Docker Course', url: 'https://kodekloud.com/courses/docker-for-the-absolute-beginner/', description: 'Beginner-friendly course with hands-on labs', type: 'course' },
      { title: 'Docker Official Get Started', url: 'https://docs.docker.com/get-started/', description: 'Official tutorial with interactive examples', type: 'docs' },
      { title: 'Docker Hub', url: 'https://hub.docker.com/', description: 'Public registry for finding and sharing images', type: 'tool' },
    ],
  },
  {
    slug: '02-aws-foundations', number: '02', title: 'AWS Cloud Foundations', exerciseCount: 5, estimatedTime: '~2 weeks', cost: 'Free', month: 'Month 1',
    resources: [
      { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/learn-about/architect/', description: 'Official free self-paced AWS training', type: 'course' },
      { title: 'AWS Free Tier', url: 'https://aws.amazon.com/free/', description: 'Practice hands-on without costs', type: 'tool' },
      { title: 'AWS Management Console', url: 'https://aws.amazon.com/console/', description: 'Web interface for all AWS services', type: 'tool' },
      { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', description: 'Comprehensive reference for every service', type: 'docs' },
    ],
  },
  {
    slug: '03-aws-sa-associate', number: '03', title: 'AWS Solutions Architect Associate', exerciseCount: 8, estimatedTime: '~6 weeks', cost: '~$179', month: 'Month 2-3',
    resources: [
      { title: 'Stephane Maarek Udemy Course', url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', description: 'Comprehensive video course, all exam domains (~$14)', type: 'course' },
      { title: 'Tutorials Dojo Practice Exams', url: 'https://portal.tutorialsdojo.com/courses/aws-certified-solutions-architect-associate-practice-exams/', description: 'High-quality practice exams with explanations (~$15)', type: 'practice' },
      { title: 'Adrian Cantrill Course', url: 'https://learn.cantrill.io/p/aws-certified-solutions-architect-associate-saa-c03', description: 'In-depth architectural training with real-world scenarios', type: 'course' },
      { title: 'AWS Exam Page', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', description: 'Official exam details, sample questions, registration', type: 'docs' },
      { title: 'Free Practice Questions', url: 'https://easy-prep.org/aws-solutions-architect-associate-exam-questions', description: 'Free practice questions to assess readiness', type: 'practice' },
    ],
  },
  {
    slug: '04-terraform', number: '04', title: 'Terraform & Infrastructure as Code', exerciseCount: 6, estimatedTime: '~3 weeks', cost: '~$84', month: 'Month 3-4',
    resources: [
      { title: 'HashiCorp Certification Tutorials', url: 'https://developer.hashicorp.com/terraform/tutorials/certification-004', description: 'Official learning path for the Associate cert', type: 'course' },
      { title: 'Terraform Associate Certification', url: 'https://developer.hashicorp.com/certifications/infrastructure-automation', description: 'Certification overview, requirements, exam details', type: 'docs' },
      { title: 'Associate Study Guide', url: 'https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004', description: 'Comprehensive study guide with learning objectives', type: 'docs' },
      { title: 'Terraform Beginner to Advanced (Udemy)', url: 'https://www.udemy.com/course/terraform-beginner-to-advanced/', description: 'Hands-on video course (~$14 with sales)', type: 'course' },
    ],
  },
  {
    slug: '05-kubernetes', number: '05', title: 'Kubernetes & Container Orchestration', exerciseCount: 6, estimatedTime: '~3 weeks', cost: 'Free', month: 'Month 4-5',
    resources: [
      { title: 'Intro to Kubernetes (edX)', url: 'https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes', description: 'Free Linux Foundation course on fundamentals', type: 'course' },
      { title: 'Kubernetes Official Tutorials', url: 'https://kubernetes.io/docs/tutorials/', description: 'Official interactive tutorials and docs', type: 'docs' },
      { title: 'KodeKloud CKA Learning Path', url: 'https://kodekloud.com/learning-path/cka', description: 'Comprehensive hands-on labs for CKA', type: 'course' },
      { title: 'CKAD Certification', url: 'https://www.cncf.io/training/certification/ckad/', description: 'CNCF exam info and resources', type: 'docs' },
    ],
  },
  {
    slug: '06-ci-cd-pipelines', number: '06', title: 'CI/CD Pipelines & GitOps', exerciseCount: 5, estimatedTime: '~2 weeks', cost: 'Free', month: 'Month 4-5',
    resources: [
      { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', description: 'Official workflow syntax and best practices', type: 'docs' },
      { title: 'GitLab CI Documentation', url: 'https://docs.gitlab.com/ee/ci/', description: 'Comprehensive pipeline configuration guide', type: 'docs' },
      { title: 'GitHub Marketplace Actions', url: 'https://github.com/marketplace?type=actions', description: 'Community actions for tests, deploys, notifications', type: 'tool' },
      { title: 'ArgoCD Documentation', url: 'https://argo-cd.readthedocs.io/', description: 'Kubernetes-native GitOps continuous delivery', type: 'docs' },
      { title: 'GitHub Actions Free Course', url: 'https://dometrain.com/course/from-zero-to-hero-github-actions/', description: 'Free course from basics to advanced workflows', type: 'course' },
    ],
  },
  {
    slug: '07-monitoring-observability', number: '07', title: 'Monitoring & Observability', exerciseCount: 5, estimatedTime: '~2 weeks', cost: 'Free', month: 'Month 5-6',
    resources: [
      { title: 'Prometheus Official Docs', url: 'https://prometheus.io/docs/introduction/overview/', description: 'Getting started with Prometheus monitoring', type: 'docs' },
      { title: 'Grafana Tutorials', url: 'https://grafana.com/tutorials/', description: 'Video walkthroughs and hands-on labs', type: 'course' },
      { title: 'OpenTelemetry (LFS148)', url: 'https://training.linuxfoundation.org/training/getting-started-with-opentelemetry-lfs148/', description: 'Free Linux Foundation OTel course', type: 'course' },
      { title: 'OpenTelemetry Docs', url: 'https://opentelemetry.io/docs/', description: 'Official OTel reference for all languages', type: 'docs' },
      { title: 'Grafana Playground', url: 'https://play.grafana.org/', description: 'Free sandbox to explore Grafana', type: 'tool' },
    ],
  },
  {
    slug: '08-system-design', number: '08', title: 'System Design for Interviews', exerciseCount: 8, estimatedTime: '~4 weeks', cost: 'Free', month: 'Month 5-6',
    resources: [
      { title: 'ByteByteGo (Alex Xu)', url: 'https://bytebytego.com/', description: 'Top structured system design resource with visuals', type: 'course' },
      { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', description: 'Free comprehensive guide with scalability concepts', type: 'community' },
      { title: 'AsyncAPI Specification', url: 'https://www.asyncapi.com/', description: 'OpenAPI for event-driven APIs', type: 'docs' },
      { title: 'Awesome System Design Resources', url: 'https://github.com/ashishps1/awesome-system-design-resources', description: 'Curated links and papers', type: 'community' },
      { title: 'Grokking System Design Interview', url: 'https://www.designgurus.io/course/grokking-the-system-design-interview', description: 'Structured course with 20+ case studies', type: 'course' },
      { title: 'Pramp', url: 'https://www.pramp.com', description: 'Free mock interviews with real engineers', type: 'practice' },
    ],
  },
  {
    slug: '09-interview-prep', number: '09', title: 'Interview Preparation & Portfolio', exerciseCount: 5, estimatedTime: '~2 weeks', cost: 'Free', month: 'Month 5-6',
    resources: [
      { title: 'Pramp', url: 'https://www.pramp.com', description: 'Free mock interviews (system design focus)', type: 'practice' },
      { title: 'Interview Kickstart SA Skills', url: 'https://interviewkickstart.com/skills/solutions-architect', description: 'Structured Solutions Architect learning', type: 'course' },
      { title: 'MentorCruise SA Questions', url: 'https://mentorcruise.com/questions/solutions-architect/', description: 'Real interview Q&A', type: 'practice' },
    ],
  },
  {
    slug: '10-ai-for-cloud-devops', number: '10', title: 'AI for Cloud & DevOps Engineers', exerciseCount: 5, estimatedTime: '~3 weeks', cost: 'Free', month: 'Month 6-7',
    resources: [
      { title: 'GitHub Copilot Docs', url: 'https://docs.github.com/en/copilot', description: 'Official Copilot docs including Agent Mode', type: 'docs' },
      { title: 'Amazon Q Developer', url: 'https://aws.amazon.com/q/developer/', description: 'AWS AI coding assistant with free tier', type: 'tool' },
      { title: 'AWS GenAI Skill Builder', url: 'https://skillbuilder.aws/generative-ai', description: 'Free courses + Cloud Quest GenAI Practitioner', type: 'course' },
      { title: 'Amazon Bedrock Course', url: 'https://skillbuilder.aws/learn/TM4ZAXTGEZ/building-generative-ai-applications-using-amazon-bedrock/WM6Z6ZHU7K', description: 'Free self-paced Bedrock course', type: 'course' },
      { title: 'MCP Documentation', url: 'https://modelcontextprotocol.io/', description: 'Model Context Protocol spec and SDKs', type: 'docs' },
    ],
  },
];

// Resolve modules directory - works both locally and on Vercel
function getModulesDir(): string {
  const candidates = [
    path.resolve(process.cwd(), 'modules-content'),          // Vercel build (copied by prebuild script)
    path.resolve(process.cwd(), '..', 'modules'),            // local dev (cwd = app/)
    path.resolve(process.cwd(), 'modules'),                  // if cwd is repo root
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // Fallback
  return candidates[0];
}

const MODULES_DIR = getModulesDir();

// Pre-load all content at module initialization so it's bundled
const _contentCache = new Map<string, string>();
const _quizCache = new Map<string, QuizQuestion[]>();

function preloadAll() {
  for (const mod of MODULE_CONFIGS) {
    try {
      const readmePath = path.join(MODULES_DIR, mod.slug, 'README.md');
      if (fs.existsSync(readmePath)) {
        _contentCache.set(mod.slug, fs.readFileSync(readmePath, 'utf-8'));
      }
    } catch { /* skip if not found */ }

    try {
      const quizPath = path.join(MODULES_DIR, mod.slug, 'tests', 'quiz.json');
      if (fs.existsSync(quizPath)) {
        _quizCache.set(mod.slug, JSON.parse(fs.readFileSync(quizPath, 'utf-8')));
      }
    } catch { /* skip if not found */ }
  }
}

preloadAll();

export function getModuleConfig(slug: string): ModuleConfig | undefined {
  return MODULE_CONFIGS.find(m => m.slug === slug);
}

export async function getModuleContent(slug: string): Promise<string> {
  const markdown = _contentCache.get(slug);
  if (!markdown) {
    return '<p>Module content not available.</p>';
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}

export function getQuizQuestions(slug: string): QuizQuestion[] {
  return _quizCache.get(slug) || [];
}
