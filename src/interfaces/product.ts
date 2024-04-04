import { LimitedArrayFiveStrings } from './utils'

export type Product = {
  sku: string
  name?: string
  category?: LimitedArrayFiveStrings
  price?: number
  quantity?: number
  brand?: string
  variant?: string
  customDimensions?: Record<number, string>
}
