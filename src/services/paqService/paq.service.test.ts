import {
  PAGE_VIEWS_TRACK_EVENT,
  PAQ_SERVICE_TRACK_EVENT,
} from '../../constants/track-event.constant'
import { getPaq, resetPaq } from '../../test-utils/paq.mock'
import { push } from './paq.service'

beforeEach(() => {
  resetPaq()
})

describe('paq.service push', () => {
  it('lazily initialises window._paq on first push', () => {
    expect(window._paq).toBeUndefined()

    push([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW])

    expect(Array.isArray(window._paq)).toBe(true)
  })

  it('prepends setCustomUrl and setDocumentTitle before the command', () => {
    push([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW])

    const paq = getPaq()
    expect(paq[0]).toEqual([
      PAQ_SERVICE_TRACK_EVENT.SET_CUSTOM_URL,
      window.location.href,
    ])
    expect(paq[1]).toEqual([
      PAQ_SERVICE_TRACK_EVENT.SET_DOCUMENT_TITLE,
      document.title,
    ])
    expect(paq[2]).toEqual([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW])
  })

  it('skips the page-data prefix when skipSettingPageData is set', () => {
    push([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW], { skipSettingPageData: true })

    expect(getPaq()).toEqual([[PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW]])
  })

  it('appends to an existing queue and returns the new length', () => {
    push([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW], { skipSettingPageData: true })
    const result = push([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW], {
      skipSettingPageData: true,
    })

    expect(result).toBe(2)
  })

  it('logs the pushed command when IS_DEBUG is enabled', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation()
    window.IS_DEBUG = true
    jest.resetModules()

    const { push: debugPush } = await import('./paq.service')
    debugPush([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW], { skipSettingPageData: true })

    expect(logSpy).toHaveBeenCalledWith('Push', [
      PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW,
    ])

    delete window.IS_DEBUG
    logSpy.mockRestore()
  })
})
