import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "src/schema/customer.schema";
import { CreateCustomerDto, UpdateCustomerDto } from "../dtos/customer.dto";


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async createCustomer(data: CreateCustomerDto) {
    const user = await this.customerModel.findOne({
      email: data.email,
    });

    if (user) throw new ConflictException('Email đã tồn tại');

    const newUser = await this.customerModel.create(data);

    return newUser;
  }

  async updateUser(id: string, data: UpdateCustomerDto) {
    const user = await this.customerModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return user;
  }

  async deleteCustomer(id: string) {
    return await this.customerModel.deleteOne({ _id: id });
  }

  async findByEmail(email: string) {
    return await this.customerModel.findOne({ email: email });
  }

  async getCustomerProfile(id: string) {
    return await this.customerModel.findOne({
      _id: id,
    });
  }
}
