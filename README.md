# Nara Chain Documentation

Official documentation site for [Nara Chain](https://docs.nara.build) — a next-generation Layer 1 blockchain built on Solana with PoMI (Proof of Machine Intelligence).

Built with [Docusaurus 3](https://docusaurus.io/).

## Structure

```text
docs/                  # English documentation (default locale)
blog/                  # English blog/announcements
i18n/zh-Hans/          # Chinese translations
src/pages/             # Homepage
src/css/               # Global styles
```

## Development

```bash
npm install
npm run start
```

Starts a local dev server at `http://localhost:3000`. Only the default locale (English) is served in dev mode.

To preview the Chinese locale:

```bash
npm run start -- --locale zh-Hans
```

## Build

```bash
npm run build
```

Generates static files for all locales into `build/`. Preview locally with:

```bash
npm run serve
```

## Localization

- Default locale: **English** (`en`)
- Secondary locale: **Chinese** (`zh-Hans`)

Translations live under `i18n/zh-Hans/`. Run `npm run write-translations -- --locale zh-Hans` to generate translation JSON files.

## License

Copyright 2026 Nara Chain.
