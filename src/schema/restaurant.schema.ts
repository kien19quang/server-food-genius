import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { SchemaTypes } from 'mongoose';

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
  lng: number;

  @Prop()
  lat: number;

  @Prop()
  address: string;

  @Prop()
  stars: number;

  @Prop()
  reviews: number;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Category' }] })
  categories: Category[]
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
