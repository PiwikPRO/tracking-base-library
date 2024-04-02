import { AnyData, QueueItem } from './utils'

export interface PiwikProWindow {
  _paq?: QueueItem[]
  dataLayer?: AnyData[]
  IS_DEBUG?: boolean
}
