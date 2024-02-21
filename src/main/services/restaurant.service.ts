import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from 'src/schema/restaurant.schema';
import { DishDto, FeaturedDto, RestaurantDto } from '../dtos/restaurant.dto';
import { Dish } from 'src/schema/dish.schema';
import { Featured } from 'src/schema/featured.schema';
import { FeaturedFilter } from '../filters/restaurant.filter';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    @InjectModel(Dish.name) private readonly dishModel: Model<Dish>,
    @InjectModel(Featured.name) private readonly featuredModel: Model<Featured>,
  ) {}

  async getListRestaurant() {
    return await this.restaurantModel
      .find()
      .sort({ createdAt: 'asc' })
      .populate('categories')
      .exec();
  }

  async getDetailRestaurant(id: string) {
    return await this.restaurantModel
      .findById(id)
      .populate(['dishes', 'categories'])
      .exec();
  }

  async createRestaurant(data: RestaurantDto) {
    return await this.restaurantModel.create({
      name: data.name,
      description: data.description,
      address: data.address,
      image: data.image,
      lng: data.lng,
      lat: data.lat,
      categories: data.categoriesIds,
      reviews: 3000,
      stars: 5
    });
  }

  async updateRestaurant(id: string, data: RestaurantDto) {
    return await this.restaurantModel
      .findOneAndUpdate(
        { _id: id },
        {
          name: data.name,
          description: data.description,
          address: data.address,
          image: data.image,
          lng: data.lng,
          lat: data.lat,
          categories: data.categoriesIds,
          reviews: 3000,
          stars: 5
        },
        {
          new: true,
        },
      )
      .populate('categories')
      .exec();
  }

  async deleteRestaurant(id: string) {
    return await this.restaurantModel.deleteOne({ _id: id });
  }

  async createDish(data: DishDto) {
    const restaurant = await this.restaurantModel.findById(data.restaurantId);

    if (!restaurant) {
      throw new BadRequestException('Không tồn tại nhà hàng này trên hệ thống');
    }

    const dish = await this.dishModel.create({
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
    });

    restaurant.dishes.push(dish.id);

    await restaurant.save();

    return dish;
  }

  async updateDish(id: string, data: DishDto) {
    const restaurant = await this.restaurantModel.findById(data.restaurantId);

    if (!restaurant) {
      throw new BadRequestException('Không tồn tại nhà hàng này trên hệ thống');
    }

    delete data.restaurantId;

    return await this.dishModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async deleteDish(id: string) {
    return await this.dishModel.deleteOne({ _id: id });
  }

  async getListFeatured(query: FeaturedFilter = {}) {
    const { categoryId } = query

    const sql = this.featuredModel.find().sort({ order: 'asc' })

    if (categoryId) {
      sql.populate({
        path: 'restaurants',
        match: {
          categories: {
            $elemMatch: {
              $eq: categoryId
            }
          }
        },
        populate: {
          path: 'categories',
        },
      })
    }
    else {
      sql.populate({
        path: 'restaurants',
        populate: {
          path: 'categories',
        },
      })
    }

    return await sql.exec().then(featureds => {
      // Lọc các featured có ít nhất một nhà hàng
      return featureds.filter(featured => featured.restaurants.length > 0);
    })
  }

  async createFeatured(data: FeaturedDto) {
    const countFeatured = await this.featuredModel.countDocuments();
    const featured = await this.featuredModel.create({
      title: data.title,
      description: data.description,
      isVisible: data.isVisible,
      restaurants: data.restaurantIds,
      order: countFeatured + 1,
    });

    await featured.populate('restaurants');

    return featured;
  }

  async updateFeatured(id: string, data: FeaturedDto) {
    return await this.featuredModel
      .findOneAndUpdate(
        { _id: id },
        {
          title: data.title,
          description: data.description,
          isVisible: data.isVisible,
          restaurants: data.restaurantIds,
        },
        {
          new: true,
        },
      )
      .populate('restaurants')
      .exec();
  }

  async deleteFeatured(id: string) {
    return await this.featuredModel.deleteOne({ _id: id });
  }
}
