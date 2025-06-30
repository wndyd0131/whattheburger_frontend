enum ProductType {Only="ONLY", Meal="MEAL"};

export interface Product {
  id: number;
  name: string;
  price: number;
  briefInfo: string;
  imageSource: string;
  productType: ProductType;
}

// export function normalizeCartItem(): Product {

// }