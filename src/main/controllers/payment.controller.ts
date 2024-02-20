import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StripeService } from "../services/stripe.service";
import { JwtGuard } from "src/core/guards/jwt.guard";
import { PaymentIntentDto } from "../dtos/payment.dto";

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('intents')
  // @UseGuards(JwtGuard)
  async createPaymentIntents(
    @Body() data: PaymentIntentDto
  ) {
    return await this.stripeService.createPaymentIntents(data.amount)
  }
}