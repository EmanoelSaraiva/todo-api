import { Injectable } from '@nestjs/common';
import * as brcrypt from 'bcrypt';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './dto/user.dto';
import { DataDTO } from './dto/data.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO): Promise<DataDTO> {
    try {
      const salt = await brcrypt.genSalt(15);
      const hashedPassword = await brcrypt.hash(data.password, salt);

      const userExist = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (userExist) {
        return { ok: false, status: 404, message: 'Users already exist' };
      }

      await this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });

      return { ok: true, status: 201 };
    } catch (error) {
      return { ok: false, status: 500, data: error.message };
    }
  }
}
