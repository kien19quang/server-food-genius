import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Restaurant } from './restaurant.schema';

@Schema({
  timestamps: true,
  collection: 'Featured',
})
export class Featured {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Boolean, default: true })
  isVisible: boolean;

  @Prop({ type: Number, default: 0 })
  order: number;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Restaurant' }] })
  restaurants: Restaurant[]
}

export const FeaturedSchema = SchemaFactory.createForClass(Featured);
