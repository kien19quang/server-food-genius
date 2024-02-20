import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentIntentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
