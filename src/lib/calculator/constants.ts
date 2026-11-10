export const PAYROLL_2026 = {
  socialAssessmentCap: 16_764,
  employee: { sickness: 0.014, oldAge: 0.04, disability: 0.03, unemployment: 0.01, health: 0.04, healthDisability: 0.02 },
  employer: { sickness: 0.014, oldAge: 0.14, disability: 0.03, unemployment: 0.01, guarantee: 0.0025, accident: 0.008, reserve: 0.0475, health: 0.11, healthDisability: 0.055 },
  nczdMonthly: 497.23,
  nczdFullThroughTaxBase: 2_100,
  taxFirstBandLimit: 3_665.28,
  taxFirstRate: 0.19,
  taxSecondRate: 0.25,
} as const
