/**
 * @jest-environment node
 */
import { init } from './index'

describe('init in node environment', () => {
  it('should log error if trying to run in server environment', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init(
      '1f74dda5-b598-41d6-a9e4-f501ef4379e1',
      'https://example.com'
    )

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Was not possible to access window. Make sure this module is running in a browser'
    )

    consoleErrorMock.mockRestore()
  })
})
