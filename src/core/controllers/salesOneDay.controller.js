import {SalesOneDayRepository} from "../repositories/SalesOneDay.repository.js";
import {SalesOneDayService} from "../services/SalesOneDay.service.js";

class SalesOneDayController {
    async getSalesOneDayList(req, res) {
        try {
            const salesOneDayRepository = new SalesOneDayRepository();
            const salesOneDayService = new SalesOneDayService(salesOneDayRepository);

            const salesOneDayList = await salesOneDayService.getSalesOneDayList();

            res.status(200).send(salesOneDayList);
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async deleteSaleOneDay(req, res) {
        try {
            const id = req.query.id;
            const salesOneDayRepository = new SalesOneDayRepository();
            const salesOneDayService = new SalesOneDayService(salesOneDayRepository);

            const deleteCount = await salesOneDayService.deleteSaleOneDay(id);

            res.status(200).send({deleteCount});
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async updateSaleOneDay(req, res) {
        try {
            const {id, title, price, count, sum} = req.body;
            if(!id || !title || !price || !count || !sum) {
                res.status(400).send({message: 'Title or price or id or sum or count is empty!'});
                return;
            }
            const salesOneDayRepository = new SalesOneDayRepository();
            const salesOneDayService = new SalesOneDayService(salesOneDayRepository);

            const updateCount = await salesOneDayService.updateSaleOneDay(id, title, price, count, sum);

            res.status(200).send({updateCount});
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async createSaleOneDay(req, res) {
        try {
            const {id, title, price, count, sum} = req.body;
            if(!title || !price || !count || !sum) {
                res.status(400).send({message: 'Title or price or count or sum is empty!'});
                return;
            }
            const salesOneDayRepository = new SalesOneDayRepository();
            const salesOneDayService = new SalesOneDayService(salesOneDayRepository);

            const sale = await salesOneDayService.createSaleOneDay(id, title, price, count, sum);

            res.status(200).send(sale);
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }
}

export default new SalesOneDayController();