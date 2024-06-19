export class SalesOneDayService {
    constructor(salesOneDayRepository) {
        this.salesOneDayRepo = salesOneDayRepository;
    }

    async getSalesOneDayList() {
        const salesList = await this.salesOneDayRepo.getSalesList();
        return salesList;
    }

    async deleteSaleOneDay(id) {
        const deleteCount = await this.salesOneDayRepo.deleteSales(id);
        return deleteCount;
    }

    async updateSaleOneDay(id, title, count, sum, price) {
        const updateCount = await this.salesOneDayRepo.updateSales(id, title, count, sum, price);
        return updateCount;
    }

    async createSaleOneDay(title, count, sum, price) {
        const product = await this.salesOneDayRepo.createSales(title, count, sum, price);
        return product;
    }
}