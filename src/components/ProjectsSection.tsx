import { TiltCard } from './TiltCard';

const projects = [
  {
    title: 'RepoLens AI',
    type: 'Personal Project',
    status: '✓ Completed',
    statusClass: 's-done',
    description:
      'AI-powered platform that analyzes GitHub repositories and explains complex codebases in simple language through intelligent repository insights and interactive AI assistance.',
    features: [
      'Built a full-stack AI-powered repository analysis platform that helps developers quickly understand unfamiliar GitHub projects, reducing onboarding time significantly.',
      'Designed an intelligent analysis engine that examines project architecture, folder structure, technology stack, workflows, and code organization automatically.',
      'Engineered a conversational AI assistant capable of answering repository-specific questions and explaining complex codebases in simple, human-readable language.',
      'Implemented secure server-side AI processing with protected API architecture, eliminating client-side key exposure and improving production security.',
      'Developed detailed repository insights including project purpose, features, architecture, learning path, difficulty assessment, and improvement recommendations.',
      'Created a responsive developer-focused dashboard with real-time repository processing, analysis visualization, and interactive exploration features.',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'OpenRouter API', 'Vercel'],
    links: [
      { label: 'Live Demo', href: 'https://reposai.vercel.app/', external: true },
      { label: 'View Code', href: 'https://github.com/vishal-163/RepoLens-AI.git', external: true },
    ],
    revealClass: 'reveal-proj-left',
  },
  {
    title: 'AI Trip Planner',
    status: '✓ Completed',
    statusClass: 's-done',
    description:
      'AI-powered mobile app that generates personalized travel itineraries based on user preferences, budget, and duration.',
    features: [
      'Built a cross-platform mobile application generating personalized AI-based travel itineraries based on user preferences, budget, and duration, reducing manual planning effort significantly.',
      'Designed a modular three-tier architecture with Flutter frontend, Supabase backend, and a dedicated AI service layer for scalable integration.',
      'Engineered structured data flow ensuring deterministic JSON outputs for seamless UI rendering and improved reliability.',
      'Implemented secure authentication (email + OAuth), row-level security, and normalized database schema for efficient data handling.',
      'Developed full CRUD operations with real-time synchronization using Supabase subscriptions for dynamic updates.',
    ],
    tags: ['Flutter', 'Supabase', 'OpenAI API', 'Gemini API', 'PostgreSQL'],
    links: [
      { label: 'View Code', href: 'https://github.com/vishal-163/AI-TRIP-PLANNER.git', external: true },
    ],
    revealClass: 'reveal-proj-right',
    style: { transitionDelay: '.15s' },
  },
  {
    title: 'Smart Military Vest',
    status: '⏳ In Progress',
    statusClass: 's-wip',
    description:
      'Defence-grade IoT system for real-time soldier health monitoring and automated emergency alerts.',
    features: [
      'Designing a defence-grade wearable system for real-time soldier health monitoring including heart rate, SpO2, temperature, and motion tracking.',
      'Built multi-sensor integration using I2C and SPI protocols with on-device preprocessing for efficient data aggregation.',
      'Architecting dual-channel communication using LoRa and GSM/4G with AES-256 encryption for secure and reliable transmission.',
      'Developing an intelligent alert system for automated distress signal generation based on health thresholds.',
      'Planning scalable backend architecture using MQTT, time-series database, and analytics dashboard for command centre monitoring.',
    ],
    tags: ['ESP32', 'Sensors', 'LoRa', 'GSM', 'GPS'],
    links: [],
    revealClass: 'reveal-proj-right',
    style: { transitionDelay: '.15s' },
  },
];

export function ProjectsSection() {
  return (
    <>
      <section id="projects" className="grid-bg">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-num">03</div>
            <h2 className="sec-title">&lt;Featured Projects /&gt;</h2>
          </div>
          <div className="proj-grid">
            {projects.map((project) => (
              <TiltCard
                key={project.title}
                className={`proj-card reveal ${project.revealClass}`}
                style={project.style}
              >
                <div className="proj-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <div className="tdot" style={{ background: '#ff5f57' }} />
                      <div className="tdot" style={{ background: '#febc2e' }} />
                      <div className="tdot" style={{ background: '#28c840' }} />
                    </div>
                    <span className="proj-title">{project.title}</span>
                    {project.type ? (
                      <span className="proj-type">({project.type})</span>
                    ) : null}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span className={`proj-status ${project.statusClass}`}>{project.status}</span>
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        className="proj-link proj-link-active"
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        ⎋ {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="proj-body">
                  <p className="proj-desc">{project.description}</p>
                  <details className="proj-details">
                    <summary>&gt; key_features.map() <span className="click-hint">(Click to expand)</span></summary>
                    <div className="proj-features">
                      {project.features.map((feature) => (
                        <div key={feature} className="proj-feat">{feature}</div>
                      ))}
                    </div>
                  </details>
                </div>
                <div className="proj-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="proj-tag">{tag}</span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
