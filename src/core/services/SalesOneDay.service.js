export class SalesOneDayService {
    constructor(salesOneDayRepository) {
        this.salesOneDayRepo = salesOneDayRepository;
    }

    async getSalesOneDayList() {
        const salesList = await this.salesOneDayRepo.getSalesOneDayList();
        return salesList;
    }

    async deleteSaleOneDay(id) {
        const deleteCount = await this.salesOneDayRepo.deleteSaleOneDay(id);
        return deleteCount;
    }

    async updateSaleOneDay(id, title, count, sum, price) {
        const updateCount = await this.salesOneDayRepo.updateSaleOneDay(id, title, count, sum, price);
        return updateCount;
    }

    async createSaleOneDay(id, title, count, sum, price) {
        const product = await this.salesOneDayRepo.createSaleOneDay(id, title, count, sum, price);
        return product;
    }
}