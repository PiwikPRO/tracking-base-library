/**
 * @jest-environment node
 */
import { init } from './index'

describe('init in node environment', () => {
  it('should log error if trying to run in server environment', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init('containerId', 'containerUrl')

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Was not possible to access window. Make sure this module is running in a browser'
    )

    consoleErrorMock.mockRestore()
  })
})
