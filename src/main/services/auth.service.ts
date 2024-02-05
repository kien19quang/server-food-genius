import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/auth.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

const EXPRIRE_TIME = 60 * 60 * 24 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
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

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Người dùng không tồn tại');

    if (user.password !== dto.password) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    return user;
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
