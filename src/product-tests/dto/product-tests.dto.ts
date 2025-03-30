import { IsNotEmpty, IsUUID, IsArray, IsNumber, IsEnum, IsString, IsBoolean } from 'class-validator';

export class ProductTestDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string; 
  
    @IsUUID()
    @IsNotEmpty()
    testerId: string;
  
    @IsString()
    @IsNotEmpty()
    reaction: string;
  
    @IsNumber()
    @IsNotEmpty()
    rating: number;
  
    @IsBoolean()
    survivalStatus?: boolean;
  }