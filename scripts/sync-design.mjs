/**
 * Copies the design tokens and the logo from the screeenly-3 app repo into the docs theme.
 *
 * Usage: npm run sync:design
 * The app repo is read from $SCREEENLY_APP_PATH, default ../screeenly-3.
 */
import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appRoot = resolve(docsRoot, process.env.SCREEENLY_APP_PATH ?? '../screeenly-3');

const tokensSource = resolve(appRoot, 'resources/css/design/tokens.css');
const tokensTarget = resolve(docsRoot, '.vitepress/theme/tokens.css');
const logoSource = resolve(appRoot, 'public/img/screeenly-3-logo.svg');
const logoTarget = resolve(docsRoot, 'public/screeenly-3-logo.svg');

/** Variables from the earlier "sticker" design. The docs don't use them. */
const legacyNames = [
    '--color-tint',
    '--color-sun',
    '--color-bubblegum',
    '--color-tangerine',
    '--color-night',
    '--shadow-sticker',
];

if (!existsSync(tokensSource)) {
    console.error(`Cannot find ${tokensSource}. Set SCREEENLY_APP_PATH to the screeenly-3 repo.`);
    process.exit(1);
}

let css = readFileSync(tokensSource, 'utf8');

// The docblock at the top describes how the app loads the file. Drop it.
css = css.replace(/^\s*\/\*\*[\s\S]*?\*\/\s*/, '');

// Remove @utility blocks. They are Tailwind-only and can contain nested braces.
css = removeBlocks(css, '@utility');

// Remove comments that mention the legacy names, then the legacy declarations.
css = css.replace(/[ \t]*\/\*[\s\S]*?\*\/\n/g, (comment) => (/sticker/i.test(comment) ? '' : comment));
css = css
    .split('\n')
    .filter((line) => !legacyNames.some((name) => line.trim().startsWith(name)))
    .join('\n');

css = css.replace('@theme {', ':root {').replace(/\n{3,}/g, '\n\n').trim();

if (!css.startsWith(':root {')) {
    console.error('Unexpected tokens.css format: no @theme block found.');
    process.exit(1);
}

const commit = gitCommit(appRoot);
const header = `/**
 * Synced from screeenly-3 (resources/css/design/tokens.css @ ${commit}). Do not edit.
 * Run \`npm run sync:design\` to update.
 */`;

writeFileSync(tokensTarget, `${header}\n${css}\n`);
console.log(`Wrote ${tokensTarget}`);

if (existsSync(logoSource) && readFileSync(logoSource, 'utf8') !== readFileSync(logoTarget, 'utf8')) {
    copyFileSync(logoSource, logoTarget);
    console.log(`Updated ${logoTarget}`);
}

/**
 * Removes every `<keyword> ... { ... }` block, counting braces so nested blocks are removed too.
 */
function removeBlocks(source, keyword) {
    let output = source;
    let start = output.indexOf(keyword);

    while (start !== -1) {
        let depth = 0;
        let end = output.indexOf('{', start);

        for (; end < output.length; end++) {
            if (output[end] === '{') {
                depth++;
            } else if (output[end] === '}') {
                depth--;
                if (depth === 0) {
                    break;
                }
            }
        }

        output = output.slice(0, start) + output.slice(end + 1).replace(/^\s*\n/, '');
        start = output.indexOf(keyword);
    }

    return output;
}

function gitCommit(repo) {
    try {
        return execSync(`git -C "${repo}" rev-parse --short HEAD`, { encoding: 'utf8' }).trim();
    } catch {
        return 'unknown';
    }
}
