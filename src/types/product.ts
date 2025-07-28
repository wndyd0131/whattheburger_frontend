import { CustomRule } from "./customRule";

export interface Product {
  id: number,
  name: string,
  price: bigint, //?
  briefInfo: string,
  imageSource: string,
  productType: string
  customRules: CustomRule[]
}