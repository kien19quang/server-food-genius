import { BadRequestException, Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe("sk_test_51OkqHLDWHooJD0vhNDK9ZS14s9C0cu68WGiWliHrLsXL8ZalmV5lXTtutvHVHnkl1hgsEJVoYD8RKJBfD2Rk5QTR00OKwauMym", {
      apiVersion: '2023-10-16',
    })
  }

  async createPaymentIntents(amount: number) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'USD',
        automatic_payment_methods: {
          enabled: true
        }
      })
  
      return {
        paymentIntent: paymentIntent.client_secret
      }
    } catch (e) {
      throw new BadRequestException(e?.message || 'Lỗi không tạo được thanh toán')
    }
  }
}