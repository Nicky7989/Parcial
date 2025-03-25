import { v4 as uuidv4 } from 'uuid';

export enum MakeupCategory {
  LIPSTICK = 'Lipstick',
  EYESHADOW = 'Eyeshadow',
  FOUNDATION = 'Foundation',
  BLUSH = 'Blush',
  MASCARA = 'Mascara'
}

export interface MakeupProduct {
  id: string;
  name: string;
  category: MakeupCategory;
  price: number;
  stock: number;
  storageLocation: string;
  durability: number;
  isIllegal: boolean;
  stolenQuantity: number;
}
