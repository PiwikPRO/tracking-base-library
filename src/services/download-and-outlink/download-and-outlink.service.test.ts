import { DOWNLOAD_AND_OUTLINK_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as DownloadAndOutlink from './download-and-outlink.service'

beforeEach(() => {
  resetPaq()
})

const LIST_SETTERS: Array<{
  method: string
  event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT
}> = [
  {
    method: 'setLinkClasses',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_LINK_CLASSES,
  },
  {
    method: 'setIgnoreClasses',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_IGNORE_CLASSES,
  },
  {
    method: 'setDownloadClasses',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_DOWNLOAD_CLASSES,
  },
  {
    method: 'addDownloadClasses',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ADD_DOWNLOAD_CLASSES,
  },
  {
    method: 'removeDownloadClasses',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.REMOVE_DOWNLOAD_CLASSES,
  },
  {
    method: 'setDownloadExtensions',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_DOWNLOAD_EXTENSIONS,
  },
  {
    method: 'addDownloadExtensions',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ADD_DOWNLOAD_EXTENSIONS,
  },
  {
    method: 'removeDownloadExtensions',
    event: DOWNLOAD_AND_OUTLINK_TRACK_EVENT.REMOVE_DOWNLOAD_EXTENSIONS,
  },
]

describe('DownloadAndOutlink setters', () => {
  it.each(LIST_SETTERS)(
    '$method pushes the class/extension list',
    ({ method, event }) => {
      const list = ['value']
      const fn = (
        DownloadAndOutlink as Record<string, (...a: unknown[]) => void>
      )[method]
      fn(list)

      expectPaqEvent([event, list])
    }
  )

  it('enables link tracking including middle/right clicks by default', () => {
    DownloadAndOutlink.enableLinkTracking()

    expectPaqEvent([
      DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ENABLE_LINK_TRACKING,
      true,
    ])
  })

  it('enables link tracking with the provided flag', () => {
    DownloadAndOutlink.enableLinkTracking(false)

    expectPaqEvent([
      DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ENABLE_LINK_TRACKING,
      false,
    ])
  })

  it('sets the link tracking timer', () => {
    DownloadAndOutlink.setLinkTrackingTimer(500)

    expectPaqEvent([
      DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_LINK_TRACKING_TIMER,
      500,
    ])
  })

  it('tracks a link with all arguments', () => {
    const dimensions = { dimension1: 'value' }
    const callback = jest.fn()
    DownloadAndOutlink.trackLink(
      'https://example.com/file.pdf',
      'download',
      dimensions,
      callback
    )

    expectPaqEvent([
      DOWNLOAD_AND_OUTLINK_TRACK_EVENT.LINK,
      'https://example.com/file.pdf',
      'download',
      dimensions,
      callback,
    ])
  })
})
