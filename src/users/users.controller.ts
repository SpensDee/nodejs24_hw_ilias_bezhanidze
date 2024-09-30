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
import { ICreateUser } from './interfaces/user-create.interface';
import { IPatchUser } from './interfaces/user-patch.interface';
import { IUpdateUser } from './interfaces/user-update.interface';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  listUsers(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() ICreateUser: ICreateUser): Promise<IUser> {
    return this.usersService.createUser(ICreateUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }

  @Patch(':id')
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() IPatchUser: IPatchUser,
  ): Promise<IUser> {
    return this.usersService.patchUser(id, IPatchUser);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() IUpdateUser: IUpdateUser,
  ): Promise<IUser> {
    return this.usersService.updateUser(id, IUpdateUser);
  }
}
