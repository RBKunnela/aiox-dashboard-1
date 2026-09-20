/**
 * API utility — handles basePath for all fetch calls.
 *
 * Next.js basePath is NOT automatically prepended to fetch() calls,
 * so we need to do it manually for all API requests.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/aiox-dashboard';

/**
 * Prepend the basePath to an API route path.
 * Optionally append `?project=` so multi-project routes resolve the active repo.
 * @example apiUrl('/api/stories') => '/aiox-dashboard/api/stories'
 * @example apiUrl('/api/stories', 'alpha') => '/aiox-dashboard/api/stories?project=alpha'
 */
export function apiUrl(path: string, project?: string | null): string {
  const url = `${BASE_PATH}${path}`;
  if (!project) {
    return url;
  }
  const joiner = path.includes('?') ? '&' : '?';
  return `${url}${joiner}project=${encodeURIComponent(project)}`;
}
