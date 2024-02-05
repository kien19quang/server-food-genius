import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { UpdateUserDto } from '../dtos/user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getUser() {
    return await this.userService.getUser();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.getUserProfile(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
