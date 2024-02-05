import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Restaurant } from "src/schema/restaurant.schema";
import { RestaurantDto } from "../dtos/restaurant.dto";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>,
    private readonly mailService: MailerService
  ) {}

  async getListRestaurant() {
    return await this.restaurantModel.find().sort({ createdAt: 'asc' });
  }

  async createRestaurant(data: RestaurantDto) {
    return await this.restaurantModel.create(data);
  }

  async updateRestaurant(id: string, data: RestaurantDto) {
    return await this.restaurantModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async deleteRestaurant(id: string) {
    return await this.restaurantModel.deleteOne({ _id: id });
  }
}
