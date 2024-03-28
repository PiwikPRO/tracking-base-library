import { LimitedArrayFiveStrings } from './utils'

type DimensionId = number

export type Product = {
  sku: string
  name?: string
  category?: LimitedArrayFiveStrings
  price?: number
  quantity?: number
  brand?: string
  variant?: string
  customDimensions?: Record<DimensionId, string>
}
