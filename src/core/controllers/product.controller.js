import {ProductRepository} from "../repositories/Product.repository.js";
import {ProductService} from "../services/Product.service.js";

class ProductController {
    async getProductList(req, res) {
        try {
            const productRepository = new ProductRepository();
            const productService = new ProductService(productRepository);

            const productList = await productService.getProductList();

            res.status(200).send(productList);
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.query.id;
            const productRepository = new ProductRepository();
            const productService = new ProductService(productRepository);

            const result = await productService.deleteProduct(id);

            res.status(200).send({result});
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async updateProduct(req, res) {
        try {
            const {id, title, price} = req.body;
            const productRepository = new ProductRepository();
            const productService = new ProductService(productRepository);

            const result = await productService.updateProduct(id, title, price);

            res.status(200).send({result});
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async createProduct(req, res) {
        try {
            const {title, price} = req.body;
            const productRepository = new ProductRepository();
            const productService = new ProductService(productRepository);

            const product = await productService.createProduct(title, price);

            res.status(200).send(product);
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }
}

export default new ProductController();