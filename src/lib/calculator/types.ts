export interface PayrollInput {
  grossMonthly: number
  claimNczd: boolean
  disability: boolean
  childrenUnder15: number
  children15To17: number
}

export interface PayrollResult {
  gross: number
  employeeSocial: number
  employeeHealth: number
  taxBase: number
  nczd: number
  taxableBase: number
  incomeTax: number
  childBonus: number
  net: number
  employerSocial: number
  employerHealth: number
  employerCost: number
  employeeContributions: number
}
