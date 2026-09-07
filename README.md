# Pairs Game

#### Technologies: TypeScript, Vite

A remake of the classic game Pairs

## Index

- [Installation and Run](#Install)
- [Development](#Development)
- [Releases](#Releases)
- [Screen Shots](#Shots)
- [Play Pairs](#Play)

## <a name="Install">Installation and Run</a>

Node 26 or newer is required (see `.nvmrc`).

```shell
$ git clone https://github.com/adrianeyre/pairs
$ cd pairs
$ npm ci
$ npm start
```

`npm start` runs the Vite dev server and prints a local URL to open — the old
step of opening `public/index.html` by hand is gone, along with the browserify
bundle it used to load.

## <a name="Development">Development</a>

| Command                     | What it does                                        |
| --------------------------- | --------------------------------------------------- |
| `npm start` / `npm run dev` | Dev server with hot reload                          |
| `npm run build`             | Typecheck, then build the production site to `dist` |
| `npm run preview`           | Serve the built site from `dist`                    |
| `npm run typecheck`         | `tsc --noEmit`                                      |
| `npm run lint`              | ESLint (`--fix` variant: `npm run lint:fix`)        |
| `npm run format`            | Prettier write (`format:check` to verify only)      |
| `npm run test`              | Vitest, once (`test:watch`, `test:coverage`)        |

CI runs formatting, lint, typecheck, tests and the build on every pull request
against `master`.

## <a name="Releases">Releases</a>

Commits follow [Conventional Commits](https://www.conventionalcommits.org).
On a push to `master`, semantic-release works out the next version from the
commit messages, bumps `package.json`, writes `CHANGELOG.md`, tags the commit
and publishes a GitHub release. The site is then built from the bumped tree and
deployed to GitHub Pages, so the published site is always the released version
rather than the commit that triggered the run.

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/pairs/master/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/pairs/master/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/pairs/master/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/pairs/master/images/screenshot2.png 'Game View')

## <a name="Play">Play Pairs</a>

- [Play Pairs](https://adrianeyre.github.io/pairs/)
