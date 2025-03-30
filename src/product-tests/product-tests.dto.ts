import { IsUUID, IsString, IsNumber, Min, Max, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductTestDto {
  @IsUUID()
  productId: string;

  @IsString()
  reaction: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @IsOptional()
  @IsBoolean()
  survivalStatus?: boolean;
}
