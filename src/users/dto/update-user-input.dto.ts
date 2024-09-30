// update-user.dto.ts
import {
  IsString,
  IsNumber,
  IsBoolean,
  Length,
  Min,
  Max,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 1478)
  firstName: string;

  @IsString()
  @Length(2, 102)
  lastName: string;

  @IsNumber()
  @Min(0)
  @Max(140)
  age: number;

  @IsBoolean()
  isStudent: boolean;
}
