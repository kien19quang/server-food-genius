import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CategoryDto } from '../dtos/category.dto';
import { JwtGuard } from 'src/core/guards/jwt.guard';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getListCategory() {
    return await this.categoryService.getListCategory();
  }

  @Post('')
  @UseGuards(JwtGuard)
  async createCategory(@Body() data: CategoryDto) {
    return await this.categoryService.createCategory(data);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async updateCategory(@Param('id') id: string, @Body() data: CategoryDto) {
    return await this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteCategory(@Param('id') id) {
    return await this.categoryService.deleteCategory(id);
  }
}
