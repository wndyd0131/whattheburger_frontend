import { QuantityDetail } from "./quantityDetail"
import { TraitDetail } from "./traitDetail"

export interface OptionDetail {
  id: number,
  name: string
  quantity: number,
  isSelected: boolean,
  countType: string,
  measureType: string,
  orderIndex: number,
  traitDetails: TraitDetail[]
  quantityDetail: QuantityDetail
}