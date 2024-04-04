import { CONTENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

/**
 * Scans the entire DOM for content blocks and tracks impressions after all page
 * elements load. It does not send duplicates on repeated calls unless
 * trackPageView was called in between trackAllContentImpressions invocations
 */
export function trackAllContentImpressions() {
  push([CONTENT_TRACK_EVENT.ALL_CONTENT_IMPRESSIONS])
}

/**
 * Scans DOM for all visible content blocks and tracks impressions
 * @param checkOnScroll Whether to scan for visible content on scroll event
 * @param watchInterval Delay, in milliseconds, between scans for new visible content. Periodic checks can be disabled by passing 0
 */
export function trackVisibleContentImpressions(
  checkOnScroll = true,
  watchInterval = 750
) {
  push([
    CONTENT_TRACK_EVENT.VISIBLE_CONTENT_IMPRESSIONS,
    checkOnScroll,
    watchInterval,
  ])
}

export function trackContentImpressionsWithinNode(domNode: Node) {
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

/**
 * Print all content blocks to the console for debugging purposes
 */
export function logAllContentBlocksOnPage(): void {
  push([CONTENT_TRACK_EVENT.LOG_ALL_CONTENT_BLOCKS_ON_PAGE])
}

/**
 * Tracks interaction with a block in domNode. Can be called from code placed in onclick attribute
 * @param domNode Node marked as content block or containing content blocks. If content block can’t be found, nothing will tracked.
 * @param contentInteraction Name of interaction (e.g. "click")
 */
export function trackContentInteractionNode(
  domNode: Node,
  contentInteraction = "Unknown"
) {
  push([
    CONTENT_TRACK_EVENT.CONTENT_INTERACTION_NODE,
    domNode,
    contentInteraction,
  ])
}

/**
 * Tracks manual content interaction event
 * @param contentInteraction Type of interaction (e.g. "click")
 * @param contentName Name of a content block
 * @param contentPiece Name of the content that was displayed (e.g. link to an image)
 * @param contentTarget Where the content leads to (e.g. URL of some external website)
 */
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
