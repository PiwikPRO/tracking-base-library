import {
  ECOMMERCE_TRACK_EVENT,
  ECOMMERCE_V2_TRACK_EVENT,
} from '../../constants/track-event.constant'
import { PaymentInformation } from '../../interfaces/payment'
import { Product } from '../../interfaces/product'
import { EcommerceOptions } from '../../interfaces/utils'
import {
  createTrackerMock,
  expectPaqEvent,
  resetPaq,
  resolveLastTrackerCallback,
} from '../../test-utils/paq.mock'
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

describe('eCommerce V1 (deprecated)', () => {
  it('tracks adding a single ecommerce item', () => {
    eCommerce.addEcommerceItem('SKU-1', 'Product 1', 'Category', 9.99, 2)

    expectPaqEvent([
      ECOMMERCE_TRACK_EVENT.ADD_ECOMMERCE_ITEM,
      'SKU-1',
      'Product 1',
      'Category',
      9.99,
      2,
    ])
  })

  it('tracks removing a single ecommerce item by SKU', () => {
    eCommerce.removeEcommerceItem('SKU-1')

    expectPaqEvent([ECOMMERCE_TRACK_EVENT.REMOVE_ECOMMERCE_ITEM, 'SKU-1'])
  })

  it('tracks an ecommerce order with all totals', () => {
    eCommerce.trackEcommerceOrder('order-1', 100, 80, 10, 5, 5)

    expectPaqEvent([
      ECOMMERCE_TRACK_EVENT.TRACK_ECOMMERCE_ORDER,
      'order-1',
      100,
      80,
      10,
      5,
      5,
    ])
  })

  it('tracks an ecommerce order with only the required totals', () => {
    eCommerce.trackEcommerceOrder('order-1', 100)

    expectPaqEvent([
      ECOMMERCE_TRACK_EVENT.TRACK_ECOMMERCE_ORDER,
      'order-1',
      100,
      undefined,
      undefined,
      undefined,
      undefined,
    ])
  })

  it('tracks an ecommerce cart update', () => {
    eCommerce.trackEcommerceCartUpdate(19.98)

    expectPaqEvent([ECOMMERCE_TRACK_EVENT.TRACK_ECOMMERCE_CART_UPDATE, 19.98])
  })

  it('clears the ecommerce cart', () => {
    eCommerce.clearEcommerceCart()

    expectPaqEvent([ECOMMERCE_TRACK_EVENT.CLEAR_ECOMMERCE_CART])
  })

  it('tracks an ecommerce product view with all details', () => {
    eCommerce.setEcommerceView('SKU-1', 'Product 1', ['Category'], '9.99')

    expectPaqEvent([
      ECOMMERCE_TRACK_EVENT.SET_ECOMMERCE_VIEW,
      'SKU-1',
      'Product 1',
      ['Category'],
      '9.99',
    ])
  })

  it('tracks an ecommerce product view with only a SKU', () => {
    eCommerce.setEcommerceView('SKU-1')

    expectPaqEvent([
      ECOMMERCE_TRACK_EVENT.SET_ECOMMERCE_VIEW,
      'SKU-1',
      undefined,
      undefined,
      undefined,
    ])
  })
})

describe('eCommerce async getters', () => {
  it('resolves the ecommerce items from the tracker', async () => {
    const items = { 'SKU-1': { name: 'Product 1', quantity: 2 } }
    const promise = eCommerce.getEcommerceItems()
    resolveLastTrackerCallback(
      createTrackerMock({ getEcommerceItems: () => items })
    )

    await expect(promise).resolves.toEqual(items)
  })
})
