import { push } from '../paqService/paq.service'
import { ANONYMIZATION_TRACK_EVENT } from '../../constants/track-event.constant'

export function setUserIsAnonymous(isAnonymous: boolean): void {
  push([ANONYMIZATION_TRACK_EVENT.SET_USER_IS_ANONYMOUS, isAnonymous])
}

export function deanonymizeUser(): void {
  push([ANONYMIZATION_TRACK_EVENT.DEANONYMIZE_USER])
}
