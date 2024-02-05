import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUser() {
    const response = await axios.get('https://m.facebook.com/login.php');
    console.log(response.data?.includes('m_login_email'));
    return await this.userModel.find().sort({ createdAt: 'desc' });
  }

  async createUser(data: CreateUserDto) {
    const user = await this.userModel.findOne({
      email: data.email,
    });

    if (user) throw new ConflictException('Email đã tồn tại');

    const newUser = await this.userModel.create(data);

    return newUser;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return user;
  }

  async deleteUser(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async getUserProfile(id: string) {
    return await this.userModel.findOne({
      _id: id,
    });
  }
}
