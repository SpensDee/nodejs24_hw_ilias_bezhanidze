import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { ICreateUser } from './interfaces/user-create.interface';
import { IUpdateUser } from './interfaces/user-update.interface';
import { IPatchUser } from './interfaces/user-patch.interface';
import { USERS } from './user.data';

@Injectable()
export class UsersService {
  private users: IUser[] = USERS;

  async getUser(id: number): Promise<IUser> {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  async createUser(ICreateUser: ICreateUser): Promise<IUser> {
    const newUser: IUser = {
      ...ICreateUser,
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

  async updateUser(id: number, IUpdateUser: IUpdateUser): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      id,
      ...IUpdateUser,
    };

    return this.users[userIndex];
  }

  async patchUser(id: number, IPatchUser: IPatchUser): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...IPatchUser,
    };

    return this.users[userIndex];
  }
}
