import { ResumeData } from './resumeTypes';

export const SAMPLE_RESUME_DATA: ResumeData = {
  id: 'resume-sample-1',
  name: 'Distributed Systems & Cloud Architecture Resume',
  template: 'executive',
  targetRole: 'Senior Staff Distributed Systems Engineer',
  targetCompany: 'Cloud Infrastructure & High-Frequency FinTech',
  lastUpdated: '2026-10-04T18:30:00.000Z',
  atsScore: 92,
  jobMatchScore: 88,
  personalInfo: {
    fullName: 'Alex Vance Chen',
    professionalTitle: 'Senior Distributed Systems Engineer',
    email: 'alex.chen.engineering@gmail.com',
    phone: '+1 (415) 890-4321',
    location: 'San Francisco, CA (Open to Hybrid / Remote)',
    linkedin: 'https://linkedin.com/in/alex-vance-chen-systems',
    github: 'https://github.com/alexvchen-distrib',
    portfolio: 'https://alexchen.dev',
    summary:
      'Staff-level distributed systems engineer with 7+ years architecting fault-tolerant microservices, high-throughput message brokers, and sub-10ms P99 transaction engines. Proven track record leading multi-region migrations processing 4.2M QPS with 99.999% uptime. Expertise in Go, Rust, Kubernetes, Raft consensus protocols, and real-time Kafka event streaming.',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science (B.S.)',
      fieldOfStudy: 'Electrical Engineering & Computer Sciences (EECS)',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      current: false,
      gpa: '3.88 / 4.0',
      highlights: [
        'Dean’s Honor List (4 semesters)',
        'Coursework: Distributed Systems (CS162), Database Architecture (CS186), Algorithms (CS170)',
      ],
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Apex Cloud Platforms',
      position: 'Senior Infrastructure & Platform Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      bullets: [
        'Architected a distributed edge routing layer in Go that reduced P99 latency from 145ms to 18ms across 18 worldwide points-of-presence.',
        'Engineered an automated partition healing service for consensus state machines, eliminating manual cluster rebalancing and saving 120+ engineering on-call hours per quarter.',
        'Spearheaded the migration of 85 legacy microservices into Kubernetes clusters with Istio service mesh, cutting annual cloud compute expenditure by $420,000.',
        'Mentored 6 junior and mid-level engineers in concurrency models, distributed tracing (OpenTelemetry), and production incident command.',
      ],
    },
    {
      id: 'exp-2',
      company: 'ScaleMetric Systems',
      position: 'Distributed Backend Engineer',
      location: 'Palo Alto, CA',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Developed high-throughput streaming pipelines processing 180GB/hour of live financial telemetry utilizing Kafka, gRPC, and PostgreSQL replicas.',
        'Optimized database connection pooling and query execution plans, increasing transactional throughput by 34% under peak holiday surges.',
        'Designed idempotent webhook delivery mechanisms with exponential backoff and dead-letter queues, achieving 99.998% delivery reliability.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Chronos-Raft: Open-Source Lightweight Consensus Engine',
      role: 'Lead Maintainer',
      technologies: ['Rust', 'Tokio', 'Raft Consensus', 'gRPC', 'Protobuf'],
      link: 'https://github.com/alexvchen-distrib/chronos-raft',
      startDate: '2023-01',
      endDate: '2024-06',
      bullets: [
        'Implemented Raft leader election, log replication, and dynamic membership changes in 4,500 lines of safe Rust with zero unsafe blocks.',
        'Benchmarked linearizable read throughput reaching 82,000 ops/second on commodity hardware with formal verification via Jepsen test suites.',
      ],
    },
    {
      id: 'proj-2',
      name: 'TracePulse: Distributed Latency Profiler',
      role: 'Creator & Architect',
      technologies: ['Go', 'eBPF', 'OpenTelemetry', 'Prometheus', 'Grafana'],
      link: 'https://tracepulse.dev',
      startDate: '2021-08',
      endDate: '2022-11',
      bullets: [
        'Built an in-kernel eBPF network probe to capture cross-service TCP socket bottlenecks without modifying application code.',
        'Used by over 14 production engineering teams to diagnose microsecond socket backpressure spikes.',
      ],
    },
  ],
  skills: [
    {
      id: 'skill-1',
      categoryName: 'Core Languages',
      skills: ['Go (Golang)', 'Rust', 'TypeScript', 'Python', 'C++', 'SQL'],
    },
    {
      id: 'skill-2',
      categoryName: 'Distributed Systems & Cloud',
      skills: ['Kubernetes', 'Docker', 'AWS (EKS, RDS, S3)', 'GCP', 'Kafka', 'RabbitMQ', 'Terraform'],
    },
    {
      id: 'skill-3',
      categoryName: 'Databases & Storage',
      skills: ['PostgreSQL', 'Redis', 'Cassandra', 'DynamoDB', 'CockroachDB', 'gRPC', 'REST APIs'],
    },
    {
      id: 'skill-4',
      categoryName: 'Methodologies & Observability',
      skills: ['OpenTelemetry', 'Prometheus', 'Datadog', 'CI/CD (GitHub Actions)', 'System Design', 'Chaos Engineering'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2023-04',
      link: 'https://cncf.io/certification/cka',
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      date: '2022-09',
      link: 'https://aws.amazon.com/certification',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Top Contributor Award (Infrastructure Division)',
      organization: 'Apex Cloud Platforms',
      date: '2023',
      description: 'Recognized for single-handedly resolving a P0 critical split-brain partition incident without customer data loss.',
    },
  ],
};

export const createBlankResume = (): ResumeData => ({
  id: `resume-${Date.now()}`,
  name: 'New Untitled Resume',
  template: 'executive',
  targetRole: '',
  targetCompany: '',
  lastUpdated: new Date().toISOString(),
  personalInfo: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [
    {
      id: `skill-cat-1`,
      categoryName: 'Technical Skills',
      skills: [],
    },
  ],
  certifications: [],
  achievements: [],
});

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Senior Distributed Systems Infrastructure Engineer',
    company: 'Stripe',
    industry: 'FinTech / Payments Infrastructure',
    description: `About the Role:
We are looking for a Senior Distributed Systems Engineer to scale our core payment processing and transactional settlement infrastructure. You will architect high-availability services operating with five-nines reliability, handling tens of billions of dollars in volume annually.

Responsibilities:
- Design, build, and maintain mission-critical distributed consensus and ledger storage systems.
- Optimize P99 tail latency and transaction throughput for high-concurrency distributed databases.
- Drive reliability initiatives, disaster recovery runbooks, and zero-downtime database migrations.
- Collaborate with security, platform, and data teams to enforce zero-trust network boundaries.

Requirements & Qualifications:
- 5+ years building and running large-scale distributed systems in production with Go, Rust, or Java.
- Deep expertise in distributed consensus algorithms (Raft, Paxos), eventual consistency, and transaction isolation.
- Hands-on experience with Kubernetes, gRPC, Kafka event streaming, and cloud architectures (AWS/GCP).
- Strong track record of diagnosing complex concurrency deadlocks, network partitions, and socket memory leaks.
- B.S. or M.S. in Computer Science or equivalent practical experience.`,
  },
  {
    title: 'Senior Full Stack AI Platform Engineer',
    company: 'Anthropic',
    industry: 'Frontier AI Research & Systems',
    description: `Role Overview:
Join our platform infrastructure team to build high-concurrency developer interfaces, prompt evaluation pipelines, and streaming inference endpoints for millions of enterprise users.

Key Responsibilities:
- Build low-latency streaming WebSocket and gRPC gateways connecting UI applications to frontier model clusters.
- Design responsive TypeScript, React, and Node.js microservices with strict telemetry and rate limiting.
- Implement automated evaluation benchmarking for model safety, accuracy, and latency regression.
- Manage cloud infrastructure via Terraform, Docker, and Kubernetes.

Requirements:
- 4+ years of professional full-stack development experience with modern TypeScript, React, and backend services.
- Experience with real-time streaming architectures (WebSockets, SSE, Kafka, Redis Pub/Sub).
- Demonstrated capability profiling client-side performance, browser memory leaks, and server response times.
- Strong communication and product empathy.`,
  },
  {
    title: 'Lead Product Manager - Developer Infrastructure',
    company: 'Linear',
    industry: 'Productivity & Developer Tools',
    description: `We are hiring a Lead Technical Product Manager to oversee our core sync engine, offline-first client architecture, and enterprise integration ecosystem.

What you will do:
- Define product roadmaps for real-time synchronization, team workflows, and enterprise administrative controls.
- Partner with systems engineers to balance performance, latency budgets, and end-user ergonomics.
- Conduct customer interviews with engineering executives at high-growth scale-ups to inform feature priorities.
- Measure feature adoption using quantitative event analytics and qualitative design feedback loops.

Requirements:
- 5+ years of product management experience at high-craft developer tool or SaaS companies.
- High technical literacy: ability to read API schemas, understand local SQLite caching, and discuss distributed syncing tradeoffs.
- Exceptional written communication and specification writing.`,
  },
];
