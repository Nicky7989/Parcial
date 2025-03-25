import { v4 as uuidv4 } from 'uuid';

export interface ProductTest {
  id: string;
  testerId: string;
  productId: string;
  reaction: string;
  rating: number;
  survivalStatus: boolean;
}

  