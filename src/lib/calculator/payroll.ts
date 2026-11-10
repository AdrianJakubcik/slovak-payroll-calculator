import { PAYROLL_2026 as C } from './constants'
import type { PayrollInput, PayrollResult } from './types'

const cents = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100
const contribution = (base: number, rate: number) => cents(base * rate)

export function calculatePayroll(input: PayrollInput): PayrollResult {
  const gross = Math.max(0, Number.isFinite(input.grossMonthly) ? input.grossMonthly : 0)
  const socialBase = Math.min(gross, C.socialAssessmentCap)
  const employeeSocial = cents(
    contribution(socialBase, C.employee.sickness) + contribution(socialBase, C.employee.oldAge) +
    contribution(socialBase, C.employee.disability) + contribution(socialBase, C.employee.unemployment),
  )
  const employeeHealth = contribution(gross, input.disability ? C.employee.healthDisability : C.employee.health)
  const taxBase = Math.max(0, cents(gross - employeeSocial - employeeHealth))
  const nczd = input.claimNczd ? Math.max(0, Math.min(C.nczdMonthly, C.nczdMonthly * (C.nczdFullThroughTaxBase / Math.max(taxBase, C.nczdFullThroughTaxBase)))) : 0
  const taxableBase = Math.max(0, cents(taxBase - nczd))
  const incomeTax = cents(Math.min(taxableBase, C.taxFirstBandLimit) * C.taxFirstRate + Math.max(0, taxableBase - C.taxFirstBandLimit) * C.taxSecondRate)
  const childCount = Math.max(0, Math.floor(input.childrenUnder15)) + Math.max(0, Math.floor(input.children15To17))
  // Child-bonus values are intentionally not assumed because eligibility and 2026 limits need explicit validation.
  const childBonus = 0
  const employerHealth = contribution(gross, input.disability ? C.employer.healthDisability : C.employer.health)
  const employerSocial = cents(
    contribution(socialBase, C.employer.sickness) + contribution(socialBase, C.employer.oldAge) +
    contribution(socialBase, C.employer.disability) + contribution(socialBase, C.employer.unemployment) +
    contribution(socialBase, C.employer.guarantee) + contribution(gross, C.employer.accident) +
    contribution(socialBase, C.employer.reserve),
  )
  void childCount
  const employeeContributions = cents(employeeSocial + employeeHealth)
  return {
    gross, employeeSocial, employeeHealth, taxBase, nczd, taxableBase, incomeTax, childBonus,
    net: cents(gross - employeeContributions - incomeTax + childBonus),
    employerSocial, employerHealth, employerCost: cents(gross + employerSocial + employerHealth), employeeContributions,
  }
}
