import {
  ECOMMERCE_TRACK_EVENT,
  ECOMMERCE_V2_TRACK_EVENT,
} from '../../constants/track-event.constant'
import { EcommerceOptions } from '../../interfaces'

import { PaymentInformation } from '../../interfaces/payment'
import { Product } from '../../interfaces/product'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

/**
 * @deprecated Please use the ecommerceAddToCart instead.
 */
export function addEcommerceItem(
  productSKU: string,
  productName: string,
  productCategory: string | string[],
  productPrice: number,
  productQuantity: number
) {
  push([
    ECOMMERCE_TRACK_EVENT.ADD_ECOMMERCE_ITEM,
    productSKU,
    productName,
    productCategory,
    productPrice,
    productQuantity,
  ])
}

/**
 * Tracks action of adding products to a cart
 */
export function ecommerceAddToCart(
  products: Product[],
  options?: EcommerceOptions
) {
  push([ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_ADD_TO_CART, products, options])
}

/**
 * @deprecated Please use the ecommerceRemoveFromCart instead.
 */
export function removeEcommerceItem(productSKU: string) {
  push([ECOMMERCE_TRACK_EVENT.REMOVE_ECOMMERCE_ITEM, productSKU])
}

/**
 * Tracks action of removing a products from a cart
 */
export function ecommerceRemoveFromCart(
  products: Product[],
  options?: EcommerceOptions
) {
  push([ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_REMOVE_FROM_CART, products, options])
}

/**
 * @deprecated
 */
export function getEcommerceItems(): Promise<object> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker): void {
          resolve(this.getEcommerceItems())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

/**
 * @deprecated Please use the ecommerceOrder instead.
 */
export function trackEcommerceOrder(
  orderId: string,
  orderGrandTotal: number,
  orderSubTotal?: number,
  orderTax?: number,
  orderShipping?: number,
  orderDiscount?: number
) {
  push([
    ECOMMERCE_TRACK_EVENT.TRACK_ECOMMERCE_ORDER,
    orderId,
    orderGrandTotal,
    orderSubTotal,
    orderTax,
    orderShipping,
    orderDiscount,
  ])
}

/**
 * Tracks conversion, including products and payment details
 */
export function ecommerceOrder(
  products: Product[],
  paymentInformation: PaymentInformation,
  options?: EcommerceOptions
) {
  push([
    ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_ORDER,
    products,
    paymentInformation,
    options,
  ])
}

/**
 * @deprecated Please use the ecommerceCartUpdate instead.
 */
export function trackEcommerceCartUpdate(cartAmount: number) {
  push([ECOMMERCE_TRACK_EVENT.TRACK_ECOMMERCE_CART_UPDATE, cartAmount])
}

/**
 * Tracks current state of a cart
 */
export function ecommerceCartUpdate(
  products: Product[],
  grandTotal: PaymentInformation['grandTotal'],
  options?: EcommerceOptions
) {
  push([
    ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_CART_UPDATE,
    products,
    grandTotal,
    options,
  ])
}

/**
 * Tracks action of viewing product page
 */
export function ecommerceProductDetailView(
  products: Product[],
  options?: EcommerceOptions
) {
  push([
    ECOMMERCE_V2_TRACK_EVENT.ECOMMERCE_PRODUCT_DETAIL_VIEW,
    products,
    options,
  ])
}

/**
 * @deprecated
 */
export function clearEcommerceCart() {
  push([ECOMMERCE_TRACK_EVENT.CLEAR_ECOMMERCE_CART])
}

/**
 * @deprecated
 */
export function setEcommerceView(
  productSKU: string,
  productName?: string,
  productCategory?: string[],
  productPrice?: string
) {
  push([
    ECOMMERCE_TRACK_EVENT.SET_ECOMMERCE_VIEW,
    productSKU,
    productName,
    productCategory,
    productPrice,
  ])
}
