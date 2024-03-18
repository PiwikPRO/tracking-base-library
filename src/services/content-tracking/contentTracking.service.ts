import { CONTENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

export function trackAllContentImpressions() {
  push([CONTENT_TRACK_EVENT.ALL_CONTENT_IMPRESSIONS])
}

export function trackVisibleContentImpressions(
  checkOnScroll?: boolean,
  watchIterval?: number
) {
  push([CONTENT_TRACK_EVENT.VISIBLE_CONTENT_IMPRESSIONS, checkOnScroll, watchIterval])
}

export function trackContentImpressionsWithinNode(domNode: any) {
  push([CONTENT_TRACK_EVENT.CONTENT_IMPRESSIONS_WITH_NODE, domNode])
}

export function trackContentImpression(
  contentName: string,
  contentPiece: string,
  contentTarget: string
) {
  push([
    CONTENT_TRACK_EVENT.CONTENT_IMPRESSION,
    contentName,
    contentPiece,
    contentTarget,
  ])
}

export function logAllContentBlocksOnPage(): void {
  push([CONTENT_TRACK_EVENT.LOG_ALL_CONTENT_BLOCKS_ON_PAGE])
}

export function trackContentInteractionNode(
  domNode: any,
  contentInteraction: string
) {
  push([CONTENT_TRACK_EVENT.CONTENT_INTERACTION_NODE, domNode, contentInteraction])
}

export function trackContentInteraction(
  contentInteraction: string,
  contentName: string,
  contentPiece: string,
  contentTarget: string
) {
  push([
    CONTENT_TRACK_EVENT.CONTENT_INTERACTION,
    contentInteraction,
    contentName,
    contentPiece,
    contentTarget,
  ])
}
