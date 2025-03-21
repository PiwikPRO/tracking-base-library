/**
 * Removes trailing slashes from the URL parameter.
 */
export const sanitizeUrl = (url: string): string => url.replace(/\/+$/, '')
