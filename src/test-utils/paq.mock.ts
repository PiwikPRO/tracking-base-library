import { PAQ_SERVICE_TRACK_EVENT } from '../constants/track-event.constant'
import { QueueItem } from '../interfaces/utils'

export const PAGE_DATA_PREFIX_LENGTH = 2

export function resetPaq(): void {
  delete window._paq
}

export function getPaq(): QueueItem[] {
  return window._paq ?? []
}

export function lastPaqEvent(): QueueItem {
  const paq = getPaq()
  return paq[paq.length - 1]
}

export function expectPageDataPrefix(): void {
  const paq = getPaq()
  expect(paq[0]).toEqual([
    PAQ_SERVICE_TRACK_EVENT.SET_CUSTOM_URL,
    window.location.href,
  ])
  expect(paq[1]).toEqual([
    PAQ_SERVICE_TRACK_EVENT.SET_DOCUMENT_TITLE,
    document.title,
  ])
}

export function expectPaqEvent(expected: unknown[]): void {
  expectPageDataPrefix()
  const paq = getPaq()
  expect(paq).toHaveLength(PAGE_DATA_PREFIX_LENGTH + 1)
  expect(lastPaqEvent()).toEqual(expected)
}
