import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { SchemaTypes } from 'mongoose';
import { Dish } from './dish.schema';

@Schema({
  timestamps: true,
  collection: 'Restaurant',
})
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  lng: string;

  @Prop()
  lat: string;

  @Prop()
  address: string;

  @Prop()
  stars: number;

  @Prop()
  reviews: number;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Category' }] })
  categories: Category[]

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Dish' }] })
  dishes: Dish[]
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
