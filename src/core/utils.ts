/**
 * Removes trailing slashes from the URL parameter
 */
export const sanitizeUrl = (url: string): string => {
  let end = url.length
  while (end > 0 && url[end - 1] === '/') end--
  return end === url.length ? url : url.slice(0, end)
}
