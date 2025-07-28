import { Trait } from "./trait";

export interface Option {
  id: number,
  name: string,
  isDefault: boolean,
  defaultQuantity: number,
  maxQuantity: number,
  price: bigint, //?
  calories: number,
  countType: string, //
  measureType: string, //
  imageSource: string,
  traits: Trait[]
}