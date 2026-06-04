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
  username: string;
  sub: string;
  roles: string[];
}

export interface AuthUser {
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

  login(user: AuthUser): { access_token: string } {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      roles: [],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
