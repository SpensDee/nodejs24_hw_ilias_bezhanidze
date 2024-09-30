// user.data.ts
import { IUser } from './interfaces/user.interface';

export const USERS: IUser[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    age: 30,
    isStudent: true,
  },
  {
    id: 2,
    firstName: 'Golovach',
    lastName: 'Lena',
    age: 60,
    isStudent: true,
  },
  {
    id: 3,
    firstName: 'James',
    lastName: 'Bond',
    age: 20,
    isStudent: false,
  },
];
