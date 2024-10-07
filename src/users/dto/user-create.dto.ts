import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(36)
  firstName;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(36)
  lastName;

  @IsNotEmpty()
  @IsNumber()
  @Min(18)
  @Max(120)
  age;

  @IsBoolean()
  isStudent;
}
