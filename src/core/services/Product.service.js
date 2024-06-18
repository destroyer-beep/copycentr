export class ProductService {
    constructor(productRepository) {
        this.productRepo = productRepository;
    }

    async getProductList() {
        const productList = await this.productRepo.getProductList();
        return productList;
    }
}