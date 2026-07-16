import { CLIENT_CONFIG_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
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
})
