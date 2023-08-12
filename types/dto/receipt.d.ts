export interface IReceiptDto {
  receiptId: string;
  day: Date;
  total: number;
  details: IReceiptDetailEntity[];
}
