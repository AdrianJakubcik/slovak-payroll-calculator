import { describe, expect, it } from 'vitest'
import { calculatePayroll } from './payroll'

describe('calculatePayroll', () => {
  it('calculates an ordinary employee estimate', () => {
    const result = calculatePayroll({ grossMonthly: 2000, claimNczd: true, disability: false, childrenUnder15: 0, children15To17: 0 })
    expect(result.employeeSocial).toBeGreaterThan(0)
    expect(result.employeeHealth).toBe(80)
    expect(result.net).toBeGreaterThan(0)
    expect(result.employerCost).toBeGreaterThan(2000)
  })
  it('caps social insurance but not health insurance', () => {
    const result = calculatePayroll({ grossMonthly: 20000, claimNczd: false, disability: false, childrenUnder15: 0, children15To17: 0 })
    expect(result.employeeHealth).toBe(800)
    expect(result.employeeSocial).toBe(1575.82)
    expect(result.employerCost).toBeGreaterThan(20000)
  })
  it('applies ZŤP health rates', () => {
    const result = calculatePayroll({ grossMonthly: 1000, claimNczd: false, disability: true, childrenUnder15: 0, children15To17: 0 })
    expect(result.employeeHealth).toBe(20)
    expect(result.employerHealth).toBe(55)
  })
})
