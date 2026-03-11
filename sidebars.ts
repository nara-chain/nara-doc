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
        'earn-nara/other',
      ],
    },
    {
      type: 'category',
      label: 'Ecosystem',
      collapsed: false,
      items: [
        'ecosystem/migrated-programs',
        'ecosystem/nara-programs',
        'ecosystem/run-validator',
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
      label: 'Nara SDK',
      collapsed: false,
      items: [
        'developer/sdk',
        'developer/quest-sdk',
        'developer/zkid-sdk',
        'developer/agent-registry-sdk',
        'developer/skills-hub-sdk',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      collapsed: false,
      items: [
        'developer/cli-reference',
      ],
    },
  ],
};

export default sidebars;
