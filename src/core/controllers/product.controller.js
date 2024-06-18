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
}

export default new ProductController();