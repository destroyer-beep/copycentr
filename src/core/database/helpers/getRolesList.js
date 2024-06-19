import {fileURLToPath} from "url";
import path, { dirname } from 'path';
import fs from 'fs';

export function getRolesList() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const rolesDir = path.join(__dirname, '../dataTables');
    const rolesJSON = fs.readFileSync(path.join(rolesDir, 'roles.json'), 'utf-8');
    const rolesList = JSON.parse(rolesJSON);
    return rolesList;
}