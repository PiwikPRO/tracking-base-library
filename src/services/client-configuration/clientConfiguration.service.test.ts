import { CLIENT_CONFIG_TRACK_EVENT } from '../../constants/track-event.constant'
import {
  createTrackerMock,
  expectPaqEvent,
  resetPaq,
  resolveLastTrackerCallback,
} from '../../test-utils/paq.mock'
import * as ClientConfiguration from './clientConfiguration.service'

beforeEach(() => {
  resetPaq()
})

describe('ClientConfiguration', () => {
  it('sets the internal domains', () => {
    ClientConfiguration.setDomains(['example.com', 'app.example.com'])

    expectPaqEvent([
      CLIENT_CONFIG_TRACK_EVENT.SET_DOMAINS,
      ['example.com', 'app.example.com'],
    ])
  })

  it('resolves the internal domains from the tracker', async () => {
    const domains = ['example.com', 'app.example.com']
    const promise = ClientConfiguration.getDomains()
    resolveLastTrackerCallback(createTrackerMock({ getDomains: () => domains }))

    await expect(promise).resolves.toEqual(domains)
  })
})
