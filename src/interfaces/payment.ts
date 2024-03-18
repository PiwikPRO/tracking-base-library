export type PaymentInformation = {
  orderId: string
  grandTotal: number | string
  subTotal?: number | string
  tax?: number | string
  shipping?: number | string
  discount?: number | string
}
