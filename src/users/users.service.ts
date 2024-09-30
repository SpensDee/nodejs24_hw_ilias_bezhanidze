import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-input.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { USERS } from './user.data';

@Injectable()
export class UsersService {
  private users: IUser[] = USERS;

  async getUser(id: number): Promise<IUser> {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser: IUser = {
      ...createUserDto,
      id: this.generateNewId(),
      firstName: '',
      lastName: '',
      age: 0,
      isStudent: false,
    };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(id: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  private generateNewId(): number {
    return Math.max(...this.users.map((user) => user.id)) + 1;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      id,
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  async patchUser(id: number, patchUserDto: PatchUserDto): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...patchUserDto,
    };

    return this.users[userIndex];
  }
}
