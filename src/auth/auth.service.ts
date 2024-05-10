import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AuthDTO } from 'src/schemas/authschema';
import { DataDTO } from './dto/data.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(data: AuthDTO): Promise<DataDTO> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        return { ok: false, status: 401, message: 'User does not exist' };
      }

      const isPassword = await bcrypt.compare(data.password, user.password);

      if (!isPassword) {
        return { ok: false, status: 401, message: 'Invalid email or password' };
      }

      return {
        ok: true,
        status: 201,
        message: 'Is logged',
      };
    } catch (error) {
      return { ok: false, status: 500, message: error.message };
    }
  }
}
