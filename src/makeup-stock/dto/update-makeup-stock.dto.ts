import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateMakeupStockDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  storageLocation?: string;

  @IsOptional()
  @IsInt()
  durability?: number;

  @IsOptional()
  @IsBoolean()
  isIllegal?: boolean;
}
