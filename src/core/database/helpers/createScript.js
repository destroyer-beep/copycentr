import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';

async function createScript() {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const scriptDir = path.join(__dirname, '..', 'scripts');
        const scriptsName = process.argv.slice(2);
        const scripts = scriptsName
            .map(n => `${Date.now()}_${n}.sql`)
            .map(name => fs.writeFile(path.join(scriptDir, '..', 'scripts', name), '', 'utf-8'));
        await Promise.all(scripts);
        console.log(`Success created SQL files: ${scriptsName.map(n => n).join(' ')}`);
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

createScript();
