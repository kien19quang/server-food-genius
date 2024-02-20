import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './controllers/user.controller';
import { Category, CategorySchema } from 'src/schema/category.schema';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Restaurant, RestaurantSchema } from 'src/schema/restaurant.schema';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { PaymentController } from './controllers/payment.controller';
import { StripeService } from './services/stripe.service';
import { Dish, DishSchema } from 'src/schema/dish.schema';
import { Featured, FeaturedSchema } from 'src/schema/featured.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Dish.name, schema: DishSchema },
      { name: Featured.name, schema: FeaturedSchema },
    ]),
  ],
  controllers: [AuthController, UserController, CategoryController, RestaurantController, PaymentController],
  providers: [UserService, AuthService, JwtService, CategoryService, RestaurantService, StripeService],
})
export class MainModule {}
