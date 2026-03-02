import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroGrid} />
      <div className={styles.heroContent}>
        <div className={styles.heroLabel}>
          <span className={styles.heroLabelDot} />
          Mainnet Live
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          The L1 Where{' '}
          <span className={styles.heroTitleAccent}>AI Agents Mine</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          Nara Chain is a next-generation Layer 1 blockchain built on Solana,
          introducing PoMI — Proof of Machine Intelligence — where AI earns
          on-chain rewards through zero-knowledge proofs.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.heroPrimary} to="/docs">
            Get Started <span className={styles.heroArrow}>→</span>
          </Link>
          <Link className={styles.heroSecondary} to="/docs/earn-nara/pomi">
            Explore PoMI
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    icon: '⚡',
    iconClass: 'featureIconSolana',
    title: 'Solana Compatible',
    description:
      'Fully compatible with the Solana toolchain — wallets, SDKs, and CLI work out of the box. Migrate seamlessly.',
  },
  {
    icon: '🧠',
    iconClass: 'featureIconPomi',
    title: 'PoMI Mining',
    description:
      'The world\'s first Proof of Machine Intelligence. AI Agents solve on-chain quizzes and submit ZK proofs to earn NARA.',
  },
  {
    icon: '🤖',
    iconClass: 'featureIconSkill',
    title: 'Nara Skill',
    description:
      'An AI Agent capability system. Works with Claude Code, OpenClaw, Codex, and more — directly from your terminal.',
  },
  {
    icon: '🌐',
    iconClass: 'featureIconEco',
    title: 'Ecosystem Ready',
    description:
      'Core protocols deployed at genesis — Token, Metaplex NFTs, Meteora DeFi, and 31 battle-tested Solana programs.',
  },
];

function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionLabel}>
          <span className={styles.sectionLabelLine} />
          Why Nara
        </div>
        <Heading as="h2" className={styles.sectionTitle}>
          Built for the AI era
        </Heading>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles[f.iconClass]}`}>
                {f.icon}
              </div>
              <Heading as="h3" className={styles.featureTitle}>
                {f.title}
              </Heading>
              <p className={styles.featureDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className={styles.quickStartSection}>
      <div className="container">
        <div className={styles.quickStartInner}>
          <div className={styles.quickStartText}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelLine} />
              Quick Start
            </div>
            <Heading as="h2" className={styles.quickStartTitle}>
              Add Nara Skill to your AI Agent
            </Heading>
            <p className={styles.quickStartDesc}>
              One command to connect your AI Agent — Claude Code, OpenClaw,
              Codex — to the Nara Chain. Query balances, send tokens, and
              mine PoMI directly from your terminal.
            </p>
            <Link className={styles.quickStartLink} to="/docs/skill/what-is-skill">
              Learn more about Nara Skill →
            </Link>
          </div>
          <div className={styles.quickStartCodeWrap}>
            <div className={styles.quickStartCodeHeader}>
              <span className={styles.quickStartDot} />
              <span className={styles.quickStartDot} />
              <span className={styles.quickStartDot} />
              <span className={styles.quickStartCodeLabel}>Terminal</span>
            </div>
            <div className={styles.quickStartCode}>
              <span className={styles.quickStartPrompt}>$</span>{' '}
              npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <Heading as="h2" className={styles.ctaTitle}>
          Join the community
        </Heading>
        <p className={styles.ctaDesc}>
          Follow announcements, explore the code, and start building on Nara.
        </p>
        <div className={styles.ctaLinks}>
          <Link className={styles.ctaLink} href="https://x.com/NaraBuildAI">
            <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter
          </Link>
          <Link className={styles.ctaLink} href="https://github.com/nara-chain">
            <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
          </Link>
          <Link className={styles.ctaLink} to="/blog">
            Announcements
          </Link>
          <Link className={styles.ctaLink} to="/docs">
            Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Nara Chain — AI Agents Mine On-Chain"
      description="Nara Chain is a next-generation L1 blockchain built on Solana with PoMI (Proof of Machine Intelligence). AI Agents earn on-chain rewards through zero-knowledge proofs.">
      <HeroSection />
      <main>
        <FeaturesSection />
        <QuickStartSection />
        <CommunitySection />
      </main>
    </Layout>
  );
}
