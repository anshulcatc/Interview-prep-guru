import { RolePreset } from '../types';

export const ROLE_PRESETS: RolePreset[] = [
  {
    id: 'swe-distributed',
    title: 'Senior Distributed Systems Engineer',
    category: 'Engineering & Architecture',
    level: 'Senior (L5/L6)',
    companyContext: 'High-Throughput Fintech Platform ($10B+ daily volume)',
    defaultJD: `We are seeking a Senior Distributed Systems Engineer to design, scale, and harden our mission-critical transactional ledger and real-time settlement engine.
Responsibilities:
- Architect distributed consensus, replication, and partitioning pipelines handling >500k TPS with sub-10ms p99 latency.
- Lead post-mortems, failure-mode analysis, and chaos engineering across multi-region Kubernetes clusters.
- Resolve contention bottlenecks, database replication lag, and distributed transaction rollbacks under partition events.
Qualifications:
- 5+ years building distributed backend services (Go, Rust, Java, or C++).
- Deep expertise in Raft/Paxos, event sourcing (Kafka), and zero-loss financial persistence.`,
    sampleQuestion: 'Walk me through a production outage where a network partition or replication lag led to inconsistent state. How did you diagnose the root cause, and how did you redesign the topology to prevent recurrence?',
    evalCriteria: {
      technicalPillars: ['Consensus & Split-brain prevention', 'Idempotency & Replay semantics', 'P99 Latency SLA maintenance'],
      behavioralFocus: 'Ownership of catastrophic failure, decisive communication under incident pressure, systemic mitigation rather than band-aids.',
      expectedKeyPhrases: ['CAP theorem tradeoff', 'idempotency token', 'quorum write', 'chaos testing', 'read replica lag']
    },
    sampleSimulatedAnswer: {
      opening: 'During a cross-region failover in our payment settlement cluster, our primary ledger database incurred an asymmetric network partition.',
      action: 'I immediately took command of the war room, isolated the stale partition via fencing tokens, and activated our quorum-validated fallback. Following incident stabilization, I redesigned our state-machine replication to enforce strict serializability.',
      result: 'Recovery completed in under 4 minutes with zero data corruption. The new topology was verified using Jepsen chaos suites, cutting failover recovery time by 76%.',
      metrics: {
        wpm: 142,
        score: 94,
        fillers: 0.8,
        starAccuracy: '98% (Situation, Task, Action, Result clearly delineated)'
      }
    }
  },
  {
    id: 'pm-ai-platform',
    title: 'Lead AI Platform Product Manager',
    category: 'Product & Strategy',
    level: 'Lead / Principal',
    companyContext: 'Enterprise B2B SaaS (15,000+ Enterprise Accounts)',
    defaultJD: `We are looking for a Lead AI Product Manager to steer the core enterprise intelligence suite.
Responsibilities:
- Define the product roadmap for enterprise LLM agents, RAG indexing pipelines, and real-time multimodal evaluation APIs.
- Establish trust, explainability, and latency guardrails for high-risk enterprise workflows.
- Partner with research engineers and enterprise design partners to transform complex model capabilities into intuitive SaaS value.
Qualifications:
- 6+ years in product management with at least 2+ years leading developer-facing AI/ML platform products.
- Proven track record balancing experimental model accuracy with enterprise SLAs and gross margin economics.`,
    sampleQuestion: 'How would you prioritize between shipping a high-visibility, generative AI feature requested by sales versus investing 3 sprints into model latency and hallucination guardrails?',
    evalCriteria: {
      technicalPillars: ['Unit economics of inference', 'Hallucination rate vs user trust threshold', 'Enterprise buyer requirements'],
      behavioralFocus: 'Cross-functional stakeholder negotiation, customer-centric value prioritization, quantitative revenue impact framing.',
      expectedKeyPhrases: ['confidence scoring', 'margin impact', 'churn risk', 'canary rollouts', 'guardrail latency']
    },
    sampleSimulatedAnswer: {
      opening: 'When our enterprise sales team pressured us to immediately launch an unconstrained generative assistant for a $3M deal, I analyzed our customer retention data.',
      action: 'I mapped out that a single hallucinated contract term created unacceptable churn liability. I structured a compromise: an accelerated 10-day pilot with strict deterministic fallback guardrails, while simultaneously ring-fencing 2 sprints for foundational reliability.',
      result: 'The prospect signed a pilot agreement with full transparency on our reliability roadmap, and we maintained our enterprise retention SLA of 99.4% with zero compliance incidents.',
      metrics: {
        wpm: 136,
        score: 91,
        fillers: 1.1,
        starAccuracy: '95% (Strategic framing & trade-off clarity)'
      }
    }
  },
  {
    id: 'quant-analyst',
    title: 'Quantitative Research Analyst',
    category: 'Finance & Quantitative Research',
    level: 'Mid-Senior',
    companyContext: 'Systematic Hedge Fund / Proprietary Trading Group',
    defaultJD: `Seeking a Quantitative Research Analyst to develop statistical arbitrage signals and automated execution algorithms.
Responsibilities:
- Formulate, backtest, and deploy predictive alphas using tick-level order book and alternative data.
- Optimize risk models, transaction cost models (TCA), and portfolio factor exposures across global equities and futures.
- Collaborate with algorithmic execution engineers to minimize slippage and adverse selection in volatile markets.
Qualifications:
- Degree in Mathematics, Statistics, Computer Science, or Physics.
- Proficient in Python, C++, NumPy, Polars, and stochastic calculus.`,
    sampleQuestion: 'Describe a quantitative model you developed that performed exceptionally in backtesting but decayed in live paper trading. What was the false assumption, and how did you resolve it?',
    evalCriteria: {
      technicalPillars: ['Lookahead bias & overfitting detection', 'Market microstructure & slippage dynamics', 'Out-of-sample statistical rigor'],
      behavioralFocus: 'Intellectual honesty, systematic scientific inquiry, refusal to curve-fit data to look good.',
      expectedKeyPhrases: ['adverse selection', 'information coefficient', 'bid-ask spread crossing', 'overfitting', 'cross-validation']
    },
    sampleSimulatedAnswer: {
      opening: 'While evaluating a high-frequency momentum signal on US equity futures, backtests showed an annualized Sharpe ratio of 3.2, but live paper simulation degraded to 0.7.',
      action: 'I hypothesized that the backtest assumed instantaneous limit order queue fills without accounting for adverse selection. I rebuilt the simulation simulator to model queue dynamics and tick latency at the microsecond level.',
      result: 'Once the market microstructure drag was penalized, I recalibrated the signal entry threshold, resulting in a sustainable live Sharpe of 2.1 with stable drawdown characteristics.',
      metrics: {
        wpm: 140,
        score: 93,
        fillers: 0.9,
        starAccuracy: '96% (Rigorous empirical causality)'
      }
    }
  },
  {
    id: 'consultant-strategy',
    title: 'Management Consultant - Operations & Tech',
    category: 'Strategy & Management Consulting',
    level: 'Associate / Engagement Manager',
    companyContext: 'Top-Tier Global Strategy Advisory (MBB)',
    defaultJD: `We are hiring Strategy Consultants to advise Fortune 100 executives through digital transformations, operating model redesigns, and cost optimization programs.
Responsibilities:
- Lead workstreams structuring complex client problems into rigorous hypotheses and synthesized executive narratives.
- Build financial and operational models uncovering $50M+ in cost reductions or efficiency improvements.
- Present strategic recommendations directly to C-suite and board members under demanding scrutiny.
Qualifications:
- 3+ years in consulting, corporate strategy, or high-growth operations.
- Exceptional executive presence, top-down MECE structuring, and stakeholder management skills.`,
    sampleQuestion: 'A client CEO states: "Our cloud costs have doubled in 18 months, yet product delivery speed has decreased. Fix this in 6 months." How do you structure your diagnostic approach?',
    evalCriteria: {
      technicalPillars: ['MECE decomposition', 'Root cause diagnostic framework', 'C-suite executive synthesis'],
      behavioralFocus: 'Poise and structured thinking under executive pressure, consultative diplomacy, actionable phased milestones.',
      expectedKeyPhrases: ['unit economics per active user', 'organizational bottlenecks', 'quick wins vs structural shifts', 'MECE']
    },
    sampleSimulatedAnswer: {
      opening: 'I would break this dilemma down using a MECE hypothesis-driven framework across two pillars: Technical Infrastructure Efficiency and Organizational Delivery Throughput.',
      action: 'In the first 3 weeks, I would benchmark cost per compute workload to isolate zombie cloud instances for immediate 20% savings. Concurrently, I would map engineering value streams to diagnose where code sits idle awaiting approvals.',
      result: 'This gives the CEO immediate financial breathing room within 30 days, while establishing an operating cadence that restored engineering release frequency by 45% within the 6-month mandate.',
      metrics: {
        wpm: 134,
        score: 95,
        fillers: 0.6,
        starAccuracy: '99% (Crisp executive cadence & structure)'
      }
    }
  }
];
