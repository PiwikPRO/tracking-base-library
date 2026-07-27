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

  it('wires up the ppms.tm and ppms.cm command APIs against the data layer', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })

    expect(typeof ppms().tm.api).toBe('function')
    expect(typeof ppms().cm.api).toBe('function')

    ppms().tm.api('trackEvent', 'category', 'action')
    expect(dataLayer()[dataLayer().length - 1]).toEqual({
      event: 'ppms.tm:trackEvent',
      parameters: ['category', 'action'],
    })
  })

  it('inserts the container loader script with the right src', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })

    expect(loaderScript()?.getAttribute('src')).toBe(
      `${CONTAINER_URL}/${CONTAINER_ID}.js`
    )
    expect(loaderScript()?.async).toBe(true)
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

  it('does not append data_layer_name for the default data layer', () => {
    run({ containerId: CONTAINER_ID, containerUrl: CONTAINER_URL })

    expect(loaderScript()?.getAttribute('src')).not.toContain('data_layer_name')
  })

  it('applies the nonce to the injected loader script', () => {
    run({
      containerId: CONTAINER_ID,
      containerUrl: CONTAINER_URL,
      nonceValue: 'test-nonce',
    })

    expect(loaderScript()?.nonce).toBe('test-nonce')
  })

  it('strips a trailing slash from the container url in the loader src', () => {
    run({
      containerId: CONTAINER_ID,
      containerUrl: `${CONTAINER_URL}/`,
    })

    expect(loaderScript()?.getAttribute('src')).toBe(
      `${CONTAINER_URL}/${CONTAINER_ID}.js`
    )
  })
})
