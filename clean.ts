import { existsSync } from 'fs';
import { execSync } from 'child_process';

const paths = ['.next', 'css-obfuscator', 'node_modules', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'deno.lock', 'turbo.lock', 'bun.lock', 'bun.lockb'];

paths.forEach((path) => {
	if (existsSync(path)) {
		console.log(`Removing ${path}...`);
		execSync(`rimraf ${path}`, { stdio: 'inherit' });
	} else {
		console.log(`${path} does not exist, skipping...`);
	}
});

console.log('Clean up complete.');
