import { USER_MANAGEMENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
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
