import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { PatchUserDto } from './dto/user-patch.dto';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  listUsers(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.createUser(CreateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }

  @Patch(':id')
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() PatchUserDto: PatchUserDto,
  ): Promise<IUser> {
    return this.usersService.patchUser(id, PatchUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersService.updateUser(id, UpdateUserDto);
  }
}
