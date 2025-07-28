import { CustomRuleDetail } from "./customRuleDetail";

export interface ProductDetail {
  id: number,
  name: string,
  productType: string,
  price: bigint,
  imageSource: string,
  customRuleDetails: CustomRuleDetail[],
  quantity: number
}