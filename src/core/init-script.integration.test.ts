/**
 * @jest-environment jsdom
 * @jest-environment-options {"runScripts": "dangerously"}
 *
 */
import { getInitScript } from './index'

type PpmsApi = (...args: unknown[]) => void
type Ppms = Record<string, { api: PpmsApi }>
type DataLayerEntry = { event: string; start?: number; parameters?: unknown[] }

const CONTAINER_ID = 'my-container'
const CONTAINER_URL = 'https://example.com'

function dataLayer(name = 'dataLayer'): DataLayerEntry[] {
  return (window as Record<string, unknown>)[name] as DataLayerEntry[]
}

function ppms(): Ppms {
  return (window as Record<string, unknown>).ppms as Ppms
}

function loaderScript(): HTMLScriptElement | undefined {
  return Array.from(document.querySelectorAll('script')).find((s) =>
    s.getAttribute('src')
  )
}

/**
 * Runs the generated snippet by appending it as an inline <script>, exactly as
 * `init()` ships it to the DOM.
 */
function run(params: Parameters<typeof getInitScript>[0]): void {
  document.head.appendChild(document.createElement('script'))
  const el = document.createElement('script')
  el.textContent = getInitScript(params)
  document.head.appendChild(el)
}

beforeEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  delete (window as Record<string, unknown>).dataLayer
  delete (window as Record<string, unknown>)['my-data-layer']
  delete (window as Record<string, unknown>).ppms
})

describe('init script', () => {
  it('bootstraps the data layer with the stg.start event', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })

    expect(dataLayer()[0]).toMatchObject({ event: 'stg.start' })
    expect(typeof dataLayer()[0].start).toBe('number')
  })

  it('inserts the container loader script with the right src', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })

    expect(loaderScript()?.getAttribute('src')).toBe(
      `${CONTAINER_URL}/${CONTAINER_ID}.js`
    )
    expect(loaderScript()?.async).toBe(true)
  })

  it('exposes the ppms.tm and ppms.cm command APIs', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })

    expect(typeof ppms().tm.api).toBe('function')
    expect(typeof ppms().cm.api).toBe('function')
  })

  it('queues a string command through ppms.tm.api onto the data layer', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })

    ppms().tm.api('trackEvent', 'category', 'action')

    expect(dataLayer()[dataLayer().length - 1]).toEqual({
      event: 'ppms.tm:trackEvent',
      parameters: ['category', 'action'],
    })
  })

  it('ignores a non-string command through ppms.tm.api', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })
    const before = dataLayer().length

    ppms().tm.api({ not: 'a string' })

    expect(dataLayer()).toHaveLength(before)
  })

  it('routes bootstrap and loader to a custom data layer name', () => {
    run({
      containerId: CONTAINER_ID,
      containerUrl: CONTAINER_URL,
      dataLayerName: 'my-data-layer',
    })

    expect(dataLayer('my-data-layer')[0]).toMatchObject({ event: 'stg.start' })
    expect(loaderScript()?.getAttribute('src')).toContain(
      'data_layer_name=my-data-layer'
    )
  })
})
