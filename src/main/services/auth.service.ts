import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/auth.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from './customer.service';

const EXPRIRE_TIME = 60 * 60 * 24 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.validateUser(data);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET_KEY,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN,
      }),
    ]);

    return {
      user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + EXPRIRE_TIME),
    };
  }

  async customerLogin(data: LoginDto) {
    const customer = await this.validateCustomer(data)

    const payload = {
      username: customer.email,
      sub: {
        name: customer.name,
      },
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_TOKEN,
      }),
    ]);

    return {
      customer,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + EXPRIRE_TIME),
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Người dùng không tồn tại');

    if (user.password !== dto.password) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    return user;
  }

  async validateCustomer(dto: LoginDto) {
    const customer = await this.customerService.findByEmail(dto.email);

    if (!customer) throw new UnauthorizedException('Người dùng không tồn tại');

    if (customer.password !== dto.password) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    return customer;
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: {
        name: user.sub,
      },
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET_KEY,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN,
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + EXPRIRE_TIME),
    };
  }
}
