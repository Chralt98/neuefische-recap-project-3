import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import * as brypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  id: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await brypt.compare(password, user.passwordHash)) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  login(user: JwtPayload) {
    const payload: JwtPayload = { id: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
