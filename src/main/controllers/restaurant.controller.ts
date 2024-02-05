import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RestaurantService } from "../services/restaurant.service";
import { RestaurantDto } from "../dtos/restaurant.dto";
import { JwtGuard } from "src/core/guards/jwt.guard";


@Controller('restaurant')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService
  ) {}

  @Get('')
  async getListRestaurant() {
    return await this.restaurantService.getListRestaurant();
  }

  @Post('')
  @UseGuards(JwtGuard)
  async createCategory(@Body() data: RestaurantDto) {
    return await this.restaurantService.createRestaurant(data);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async updateCategory(@Param('id') id: string, @Body() data: RestaurantDto) {
    return await this.restaurantService.updateRestaurant(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteCategory(@Param('id') id) {
    return await this.restaurantService.deleteRestaurant(id);
  }
}
