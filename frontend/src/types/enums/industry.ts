export enum IndustryType {
  CA_FIRM = "CA_FIRM",
  ACCOUNTING_TAX = "ACCOUNTING_TAX",
  LAW_FIRM = "LAW_FIRM",
  CONSULTING_FIRM = "CONSULTING_FIRM",
  FINANCIAL_ADVISORY = "FINANCIAL_ADVISORY",
  OTHER = "OTHER",
}

export type IndustryTypeKey = keyof typeof IndustryType;

export const INDUSTRY_TYPE_LABELS: Record<IndustryType, string> = {
  [IndustryType.CA_FIRM]: "Chartered Accountant / CA Firm",
  [IndustryType.ACCOUNTING_TAX]: "Accounting & Tax Firm",
  [IndustryType.LAW_FIRM]: "Law Firm",
  [IndustryType.CONSULTING_FIRM]: "Consulting Firm",
  [IndustryType.FINANCIAL_ADVISORY]: "Financial Advisory",
  [IndustryType.OTHER]: "Other",
};
