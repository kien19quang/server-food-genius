import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  isPaid: boolean;
  
  @ApiProperty()
  isShipped: boolean;

  @ApiProperty()
  @IsNotEmpty()
  restaurantId: string
}
