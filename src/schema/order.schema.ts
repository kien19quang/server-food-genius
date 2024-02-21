import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Restaurant } from './restaurant.schema';
import { Customer } from './customer.schema';

@Schema({
  timestamps: true,
  collection: 'Order',
})
export class Order {
  @Prop()
  price: number

  @Prop({ type: Boolean, default: false })
  isPaid: boolean

  @Prop({ type: Boolean, default: false })
  isShipped: boolean

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant' })
  restaurant: Restaurant

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer' })
  customer: Customer
}

export const OrderSchema = SchemaFactory.createForClass(Order);
