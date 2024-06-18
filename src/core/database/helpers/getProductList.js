import {fileURLToPath} from "url";
import path, { dirname } from 'path';
import fs from 'fs';

export function getProductsList() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const productsDir = path.join(__dirname, '../products');
    const productsJSON = fs.readFileSync(path.join(productsDir, 'products.json'), 'utf-8');
    const productsList = JSON.parse(productsJSON);
    return productsList;
}