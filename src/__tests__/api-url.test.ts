import { describe, expect, it } from 'vitest';
import { apiUrl } from '@/lib/api';

describe('apiUrl', () => {
  it('prepends the dashboard base path', () => {
    expect(apiUrl('/api/stories')).toBe('/aiox-dashboard/api/stories');
  });

  it('appends the active project as a query param', () => {
    expect(apiUrl('/api/stories', 'alpha')).toBe(
      '/aiox-dashboard/api/stories?project=alpha'
    );
  });

  it('encodes project ids and joins existing query strings', () => {
    expect(apiUrl('/api/logs?agent=dev', 'team a')).toBe(
      '/aiox-dashboard/api/logs?agent=dev&project=team%20a'
    );
  });

  it('omits project when null or empty', () => {
    expect(apiUrl('/api/github', null)).toBe('/aiox-dashboard/api/github');
    expect(apiUrl('/api/github', '')).toBe('/aiox-dashboard/api/github');
  });
});
