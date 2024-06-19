export class ProductService {
    constructor(productRepository) {
        this.productRepo = productRepository;
    }

    async getProductList() {
        const productList = await this.productRepo.getProductList();
        return productList;
    }

    async deleteProduct(id) {
        const deleteCount = await this.productRepo.deleteProduct(id);
        return deleteCount;
    }

    async updateProduct(id, title, price) {
        const updateCount = await this.productRepo.updateProduct(id, title, price);
        return updateCount;
    }

    async createProduct(title, price) {
        const product = await this.productRepo.createProduct(title, price);
        return product;
    }
}