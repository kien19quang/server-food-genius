import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RestaurantService } from "../services/restaurant.service";
import { DishDto, FeaturedDto, RestaurantDto } from "../dtos/restaurant.dto";
import { JwtGuard } from "src/core/guards/jwt.guard";
import { FeaturedFilter } from "../filters/restaurant.filter";


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

  @Get('featured')
  async getListFeatured(@Query() query: FeaturedFilter) {
    return await this.restaurantService.getListFeatured(query)
  }

  @Get(':id')
  async getDetailRestaurant(
    @Param('id') id: string
  ) {
    return await this.restaurantService.getDetailRestaurant(id)
  }

  @Post('')
  @UseGuards(JwtGuard)
  async createCategory(@Body() data: RestaurantDto) {
    return await this.restaurantService.createRestaurant(data);
  }

  @Post('dish')
  @UseGuards(JwtGuard)
  async createDish(@Body() data: DishDto) {
    return await this.restaurantService.createDish(data)
  }

  @Post('featured')
  @UseGuards(JwtGuard)
  async createFeatured(@Body() data: FeaturedDto) {
    return await this.restaurantService.createFeatured(data)
  }

  @Put('dish/:id')
  @UseGuards(JwtGuard)
  async updateDish(@Param('id') id: string, @Body() data: DishDto) {
    return await this.restaurantService.updateDish(id, data);
  }

  @Put('featured/:id')
  @UseGuards(JwtGuard)
  async updateFeatured(@Param('id') id: string, @Body() data: FeaturedDto) {
    return await this.restaurantService.updateFeatured(id, data);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async updateCategory(@Param('id') id: string, @Body() data: RestaurantDto) {
    return await this.restaurantService.updateRestaurant(id, data);
  }

  @Delete('dish/:id')
  @UseGuards(JwtGuard)
  async deleteDish(@Param('id') id: string) {
    return await this.restaurantService.deleteDish(id);
  }

  @Delete('featured/:id')
  @UseGuards(JwtGuard)
  async deleteFeatured(@Param('id') id: string) {
    return await this.restaurantService.deleteFeatured(id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteCategory(@Param('id') id: string) {
    return await this.restaurantService.deleteRestaurant(id);
  }
}
