import { OptionDetail } from "./optionDetail";

export interface CustomRuleDetail {
  id: number,
  name: string,
  orderIndex: number,
  optionDetails: OptionDetail[]
}