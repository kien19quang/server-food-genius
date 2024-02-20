import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schema/order.schema';
import { OrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async getListOrder(restaurantId: string) {
    return await this.orderModel.find({ restaurant: restaurantId }).sort({ createdAt: 'asc' }).populate(['restaurant', 'customer']);
  }

  async createOrder(data: OrderDto, customer: any) {
    return await this.orderModel.create({
      price: data.price,
      isPaid: data.isPaid,
      isShipped: data.isShipped,
      restaurant: data.restaurantId,
      customer: customer._id,
    });
  }

  async updateCategory(id: string, data: OrderDto, customer: any) {
    return await this.orderModel.findOneAndUpdate(
      { _id: id },
      {
        price: data.price,
        isPaid: data.isPaid,
        isShipped: data.isShipped,
        restaurant: data.restaurantId,
        customer: customer._id,
      },
      {
        new: true,
      },
    );
  }

  async deleteCategory(id: string) {
    return await this.orderModel.deleteOne({ _id: id });
  }
}
