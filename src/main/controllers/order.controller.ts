import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { OrderService } from "../services/order.service"
import { JwtGuard } from "src/core/guards/jwt.guard"
import { OrderDto } from "../dtos/order.dto"

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getOrder(@Query('restaurantId') restaurantId: string) {
    return await this.orderService.getListOrder(restaurantId)
  }

  @Post('')
  @UseGuards(JwtGuard)
  async createOrder(
    @Body() data: OrderDto,
    @Request() req: Record<string, any>
  ) {
    return await this.orderService.createOrder(data, req.user)
  }
}