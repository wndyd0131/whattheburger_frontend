import { Option } from "./option"

export interface CustomRule {
  id: number,
  name: string,
  customRuleType: string, //
  orderIndex: number,
  minSelection: number,
  maxSelection: number
  options: Option[]
}