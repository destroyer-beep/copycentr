import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

export function getTables() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const tablesDir = path.join(__dirname, '../tables');
    const fileNames = fs.readdirSync(tablesDir, 'utf-8');
    const tables = fileNames.map(f => fs.readFileSync(path.join(tablesDir, f), 'utf-8'));
    return {
        fileNames,
        tables,
    };
}