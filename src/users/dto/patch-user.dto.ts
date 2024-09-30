// patch-user.dto.ts
import {
  IsString,
  IsNumber,
  IsBoolean,
  Length,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class PatchUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 1478)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 102)
  lastName?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(140)
  age?: number;

  @IsOptional()
  @IsBoolean()
  isStudent?: boolean;
}
