export type VisitorInfo = [
  isNew: '0' | '1',
  visitorId: string,
  firstVisitTS: number,
  previousVisitCount: string | number,
  currentVisitTS: number,
  lastVisitTS: number | '',
  lastEcommerceOrderTS: number | '',
]
