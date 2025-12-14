export function isError(err: unknown): err is Error {
  return !!err && typeof err === 'object' && 'message' in err;
}
