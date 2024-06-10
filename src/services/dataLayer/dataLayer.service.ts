import { IS_DEBUG } from '../../core'
import { DEFAULT_DATA_LAYER_NAME } from '../../constants/data-layer.constant'
import { AnyData } from '../../interfaces'

let dataLayerName = DEFAULT_DATA_LAYER_NAME

export function setDataLayerName(name: string) {
  dataLayerName = name
}

export type DataLayerEntry = Record<string, AnyData>
/**
 * Adds entry to a data layer
 */
export function push(data: DataLayerEntry) {
  if (typeof window[dataLayerName] !== 'object') {
    window[dataLayerName] = []
  }

  IS_DEBUG && console.log('DataLayer push', data)
  return (window[dataLayerName] as DataLayerEntry[]).push(data)
}
