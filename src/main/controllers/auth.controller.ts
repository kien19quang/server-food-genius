import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/user.dto';
import { LoginDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { RefreshJwtGuard } from '../../core/guards/refresh.guard';
import { CreateCustomerDto } from '../dtos/customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
  ) {}

  @Post('register')
  async registerUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtGuard)
  async refreshToken(@Request() req: Record<string, any>) {
    return await this.authService.refreshToken(req.user);
  }

  @Post('customer/register')
  async registerCustomer(@Body() data: CreateCustomerDto) {
    return await this.customerService.createCustomer(data)
  }

  @Post('customer/login')
  async customerLogin(@Body() data: LoginDto) {
    return await this.authService.customerLogin(data);
  }

}
