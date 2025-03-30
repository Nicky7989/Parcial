import { IsString, IsInt, IsUUID, IsEnum, IsOptional, Min } from 'class-validator';

export enum ProductCategory {
  FOUNDATION = 'foundation',
  LIPSTICK = 'lipstick',
  MASCARA = 'mascara',
  BLUSH = 'blush',
  OTHER = 'other',
}

export class MakeupStockDto {
  @IsString()
  name: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsInt()
  @Min(0)
  stock: number;

  @IsString()
  storageLocation: string;

  @IsInt()
  @Min(0)
  durability: number;
}