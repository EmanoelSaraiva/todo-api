import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthDTO, schemaAuth } from 'src/schemas/authschema';
import { ZodValidationPipe } from 'src/validations/ZodValidationPipe';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(schemaAuth))
  async create(@Body() authDTO: AuthDTO) {
    this.authService.create(authDTO);
  }
}
