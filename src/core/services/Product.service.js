export class ProductService {
    constructor(productRepository) {
        this.productRepo = productRepository;
    }

    async getProductList() {
        const productList = await this.productRepo.getProductList();
        return productList;
    }

    async deleteProduct(id) {
        const product = await this.productRepo.deleteProduct(id);
        return product;
    }

    async updateProduct(id, title, price) {
        const product = await this.productRepo.updateProduct(id, title, price);
        return product;
    }

    async createProduct(title, price) {
        const product = await this.productRepo.createProduct(title, price);
        return product;
    }
}