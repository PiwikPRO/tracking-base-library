import { ECOMMERCE_V2_TRACK_EVENT } from '../../constants/track-event.constant'
import { PaymentInformation } from '../../interfaces/payment'
import { Product } from '../../interfaces/product'
import { EcommerceOptions } from '../../interfaces/utils'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as eCommerce from './e-commerce.service'

const products: Product[] = [
  { sku: 'SKU-1', name: 'Product 1', price: 9.99, quantity: 2 },
]
const options: EcommerceOptions = { currencyCode: 'USD' }
const payment: PaymentInformation = { orderId: 'order-1', grandTotal: 19.98 }

beforeEach(() => {
  resetPaq()
})

describe('eCommerce V2', () => {
  it('tracks adding products to the cart with options', () => {
    eCommerce.ecommerceAddToCart(products, options)

    expectPaqEvent([
      ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_ADD_TO_CART,
      products,
      options,
    ])
  })

  it('tracks adding products to the cart without options', () => {
    eCommerce.ecommerceAddToCart(products)

    expectPaqEvent([
      ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_ADD_TO_CART,
      products,
      undefined,
    ])
  })

  it('tracks removing products from the cart', () => {
    eCommerce.ecommerceRemoveFromCart(products, options)

    expectPaqEvent([
      ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_REMOVE_FROM_CART,
      products,
      options,
    ])
  })

  it('tracks a product detail view', () => {
    eCommerce.ecommerceProductDetailView(products, options)

    expectPaqEvent([
      ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_PRODUCT_DETAIL_VIEW,
      products,
      options,
    ])
  })

  it('tracks a cart update', () => {
    eCommerce.ecommerceCartUpdate(products, 19.98, options)

    expectPaqEvent([
      ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_CART_UPDATE,
      products,
      19.98,
      options,
    ])
  })

  it('tracks an order with payment information', () => {
    eCommerce.ecommerceOrder(products, payment, options)

    expectPaqEvent([
      ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_ORDER,
      products,
      payment,
      options,
    ])
  })
})
