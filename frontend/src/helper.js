export function htmlEncode(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function trim (str) {
  return str.length > 100
    ? str.slice(0, 100) + '...'
    : str
}