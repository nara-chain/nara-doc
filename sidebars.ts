import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/install-cli',
        'getting-started/create-wallet',
        'getting-started/network-info',
      ],
    },
    {
      type: 'category',
      label: 'Earn NARA',
      collapsed: false,
      items: [
        'earn-nara/pomi',
        'earn-nara/airdrop',
        'earn-nara/skill-twitter',
        'earn-nara/red-packet',
        'earn-nara/daily-checkin',
      ],
    },
    {
      type: 'category',
      label: 'Ecosystem',
      collapsed: false,
      items: [
        'ecosystem/migrated-programs',
        'ecosystem/nara-programs',
      ],
    },
    {
      type: 'category',
      label: 'Nara Skill',
      collapsed: false,
      items: [
        'skill/what-is-skill',
        'skill/use-in-agent',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      collapsed: false,
      items: [
        'developer/sdk',
        'developer/quest-sdk',
        'developer/zkid-sdk',
        'developer/agent-registry-sdk',
        'developer/skills-hub-sdk',
        'developer/cli-reference',
      ],
    },
  ],
};

export default sidebars;
