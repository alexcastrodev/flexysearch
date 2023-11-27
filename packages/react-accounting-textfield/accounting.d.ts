declare module "accounting" {
  interface AccountingStatic {
    unformat(value: string, ...args: any[]): number;
    formatMoney(value: unknown, ...args: any[]): string;
  }

  const accounting: AccountingStatic;
  export = accounting;
}
