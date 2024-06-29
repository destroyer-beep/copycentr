import { SalesOneDayRepository } from '../repositories/SalesOneDay.repository.js';
import { SalesOneDayService } from '../services/SalesOneDay.service.js';

class SalesOneDayController {
  #checkRequiredFields(fields, res) {
    if (!fields) res.status(400).send({ error: 'Field is required' });

    const undefinedFields = [];
    for (const [key, value] of Object.entries(fields)) {
      if (!value) undefinedFields.push(key);
    }
    if (undefinedFields.length)
      res.status(400).send({ error: `Required fields ${undefinedFields.map(el => el)}` });
  }

  async getSalesOneDayList(req, res) {
    try {
      const salesOneDayRepository = new SalesOneDayRepository();
      const salesOneDayService = new SalesOneDayService(salesOneDayRepository);

      const salesOneDayList = await salesOneDayService.getSalesOneDayList();

      res.status(200).send(salesOneDayList);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async deleteSaleOneDay(req, res) {
    try {
      const id = req.query.id;
      const salesOneDayRepository = new SalesOneDayRepository();
      const salesOneDayService = new SalesOneDayService(salesOneDayRepository);

      const deleteCount = await salesOneDayService.deleteSaleOneDay(id);

      res.status(200).send({ deleteCount });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async updateSaleOneDay(req, res) {
    try {
      this.#checkRequiredFields(req.body, res);

      const { id, title, price, count, sum } = req.body;
      const salesOneDayRepository = new SalesOneDayRepository();
      const salesOneDayService = new SalesOneDayService(salesOneDayRepository);
      const updateCount = await salesOneDayService.updateSaleOneDay(id, title, price, count, sum);

      res.status(200).send({ updateCount });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async createSaleOneDay(req, res) {
    try {
      this.#checkRequiredFields(req.body, res);
      const { id, title, price, count, sum } = req.body;
      const salesOneDayRepository = new SalesOneDayRepository();
      const salesOneDayService = new SalesOneDayService(salesOneDayRepository);
      const sale = await salesOneDayService.createSaleOneDay(id, title, price, count, sum);

      res.status(200).send(sale);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
}

export default new SalesOneDayController();
