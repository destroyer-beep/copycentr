import {SalesRepository} from "../repositories/Sales.repository.js";
import {SalesService} from "../services/Sales.service.js";

class SalesController {
    async getSalesList(req, res) {
        try {
            const salesRepository = new SalesRepository();
            const salesService = new SalesService(salesRepository);

            const salesList = await salesService.getSalesList();

            res.status(200).send(salesList);
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async deleteSale(req, res) {
        try {
            const id = req.query.id;
            const salesRepository = new SalesRepository();
            const salesService = new SalesService(salesRepository);

            const deleteCount = await salesService.deleteSale(id);

            res.status(200).send({deleteCount});
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async updateSale(req, res) {
        try {
            const {id, title, price, count, sum} = req.body;
            if(!id || !title || !price || !count || !sum) {
                res.status(400).send({message: 'Title or price or id or sum or count is empty!'});
                return;
            }
            const salesRepository = new SalesRepository();
            const salesService = new SalesService(salesRepository);

            const updateCount = await salesService.updateSale(id, title, price, count, sum);

            res.status(200).send({updateCount});
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    async createSale(req, res) {
        try {
            const {title, price, count, sum} = req.body;
            if(!title || !price || !count || !sum) {
                res.status(400).send({message: 'Title or price or count or sum is empty!'});
                return;
            }
            const salesRepository = new SalesRepository();
            const salesService = new SalesService(salesRepository);

            const sale = await salesService.createSale(title, price, count, sum);

            res.status(200).send(sale);
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }
}

export default new SalesController();