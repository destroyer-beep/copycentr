export class SalesService {
    constructor(salesRepository) {
        this.salesRepo = salesRepository;
    }

    async getSalesList() {
        const salesList = await this.salesRepo.getSalesList();
        return salesList;
    }

    async deleteSale(id) {
        const deleteCount = await this.salesRepo.deleteSales(id);
        return deleteCount;
    }

    async updateSale(id, title, count, sum, price) {
        const updateCount = await this.salesRepo.updateSales(id, title, count, sum, price);
        return updateCount;
    }

    async createSale(title, count, sum, price) {
        const product = await this.salesRepo.createSales(title, count, sum, price);
        return product;
    }
}