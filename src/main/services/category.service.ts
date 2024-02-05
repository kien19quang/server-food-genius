import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { CategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getListCategory() {
    return await this.categoryModel.find().sort({ createdAt: 'asc' });
  }

  async createCategory(data: CategoryDto) {
    return await this.categoryModel.create(data);
  }

  async updateCategory(id: string, data: CategoryDto) {
    return await this.categoryModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async deleteCategory(id: string) {
    return await this.categoryModel.deleteOne({ _id: id });
  }
}
