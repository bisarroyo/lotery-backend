const Order = require('../models/order.model');

class OrderController {
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async getOrderById(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);
      return res.status(200).json(order);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async createOrder(req, res, next) {
    try {
      //Id recovered from token validation at verify middleware
      const user_id = req.user._id;
      const { body } = req;
      const order = await Order.create({ ...body, user_id, status: 'Pending' });
      return res.status(201).json(order);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async updateOrder(req, res, next) {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json(order);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      return res.status(200).json(order);
    } catch (err) {
      return next(Boom.badImplementation(err));
    }
  }
}

module.exports = OrderController;
