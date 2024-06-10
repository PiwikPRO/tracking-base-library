import { QueueItem } from './utils'

export interface PiwikProWindow {
  _paq?: QueueItem[]
  IS_DEBUG?: boolean
  // data layer can have different names
  [key: string]: unknown
}
