export interface Params {
  text: string;
  page: number;
  userAgent: string;
}

export interface CoupangData {
  name: string;
  price: string;
  unitPrice: string;
  link: string;
  shortLink?: string;
}
