import { USER_MANAGEMENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { VisitorInfo } from '../../interfaces/visitorInfo'
import {
  createTrackerMock,
  expectPaqEvent,
  resetPaq,
  resolveLastTrackerCallback,
} from '../../test-utils/paq.mock'
import * as UserManagement from './userManagement.service'

beforeEach(() => {
  resetPaq()
})

describe('UserManagement setters', () => {
  it('sets the user id', () => {
    UserManagement.setUserId('user-123')

    expectPaqEvent([USER_MANAGEMENT_TRACK_EVENT.SET_USER_ID, 'user-123'])
  })

  it('resets the user id', () => {
    UserManagement.resetUserId()

    expectPaqEvent([USER_MANAGEMENT_TRACK_EVENT.RESET_USER_ID])
  })

  it('sets the anonymous flag', () => {
    UserManagement.setUserIsAnonymous(true)

    expectPaqEvent([USER_MANAGEMENT_TRACK_EVENT.SET_USER_IS_ANONYMOUS, true])
  })

  it('deanonymizes the user', () => {
    UserManagement.deanonymizeUser()

    expectPaqEvent([USER_MANAGEMENT_TRACK_EVENT.DEANONYMIZE_USER])
  })
})

describe('UserManagement async getters', () => {
  it('resolves the user id from the tracker', async () => {
    const promise = UserManagement.getUserId()
    resolveLastTrackerCallback(
      createTrackerMock({ getUserId: () => 'user-42' })
    )

    await expect(promise).resolves.toBe('user-42')
  })

  it('resolves the visitor id from the tracker', async () => {
    const promise = UserManagement.getVisitorId()
    resolveLastTrackerCallback(
      createTrackerMock({ getVisitorId: () => 'abcdef0123456789' })
    )

    await expect(promise).resolves.toBe('abcdef0123456789')
  })

  it('resolves the visitor info from the tracker', async () => {
    const visitorInfo: VisitorInfo = [
      '1',
      'abcdef0123456789',
      1_700_000_000,
      3,
      1_700_100_000,
      1_700_050_000,
      '',
    ]
    const promise = UserManagement.getVisitorInfo()
    resolveLastTrackerCallback(
      createTrackerMock({ getVisitorInfo: () => visitorInfo })
    )

    await expect(promise).resolves.toEqual(visitorInfo)
  })
})
