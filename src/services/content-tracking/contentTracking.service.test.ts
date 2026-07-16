import { CONTENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as ContentTracking from './contentTracking.service'

beforeEach(() => {
  resetPaq()
})

describe('ContentTracking', () => {
  it('tracks all content impressions', () => {
    ContentTracking.trackAllContentImpressions()

    expectPaqEvent([CONTENT_TRACK_EVENT.ALL_CONTENT_IMPRESSIONS])
  })

  it('tracks visible content impressions with defaults', () => {
    ContentTracking.trackVisibleContentImpressions()

    expectPaqEvent([CONTENT_TRACK_EVENT.VISIBLE_CONTENT_IMPRESSIONS, true, 750])
  })

  it('tracks visible content impressions with custom arguments', () => {
    ContentTracking.trackVisibleContentImpressions(false, 100)

    expectPaqEvent([
      CONTENT_TRACK_EVENT.VISIBLE_CONTENT_IMPRESSIONS,
      false,
      100,
    ])
  })

  it('tracks content impressions within a node', () => {
    const node = document.createElement('div')
    ContentTracking.trackContentImpressionsWithinNode(node)

    expectPaqEvent([CONTENT_TRACK_EVENT.CONTENT_IMPRESSIONS_WITH_NODE, node])
  })

  it('tracks a single content impression', () => {
    ContentTracking.trackContentImpression('name', 'piece', 'target')

    expectPaqEvent([
      CONTENT_TRACK_EVENT.CONTENT_IMPRESSION,
      'name',
      'piece',
      'target',
    ])
  })

  it('logs all content blocks on the page', () => {
    ContentTracking.logAllContentBlocksOnPage()

    expectPaqEvent([CONTENT_TRACK_EVENT.LOG_ALL_CONTENT_BLOCKS_ON_PAGE])
  })

  it('tracks a content interaction node with the default interaction', () => {
    const node = document.createElement('div')
    ContentTracking.trackContentInteractionNode(node)

    expectPaqEvent([
      CONTENT_TRACK_EVENT.CONTENT_INTERACTION_NODE,
      node,
      'Unknown',
    ])
  })

  it('tracks a content interaction node with a custom interaction', () => {
    const node = document.createElement('div')
    ContentTracking.trackContentInteractionNode(node, 'click')

    expectPaqEvent([
      CONTENT_TRACK_EVENT.CONTENT_INTERACTION_NODE,
      node,
      'click',
    ])
  })

  it('tracks a manual content interaction', () => {
    ContentTracking.trackContentInteraction('click', 'name', 'piece', 'target')

    expectPaqEvent([
      CONTENT_TRACK_EVENT.CONTENT_INTERACTION,
      'click',
      'name',
      'piece',
      'target',
    ])
  })
})
