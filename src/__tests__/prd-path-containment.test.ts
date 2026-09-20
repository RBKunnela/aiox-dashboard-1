import { describe, expect, it } from 'vitest';
import path from 'path';
import { resolvePathWithin } from '@/lib/squad-api-utils';

describe('PRD slug path containment', () => {
  const projectRoot = path.resolve('/tmp/aiox-project');
  const docsRoot = path.resolve(projectRoot, 'docs');

  function resolvePrdSlug(slugPath: string): string | null {
    const resolved = resolvePathWithin(docsRoot, `${slugPath}.md`);
    if (!resolved || !(resolved === docsRoot || resolved.startsWith(docsRoot + path.sep))) {
      return null;
    }
    return resolved;
  }

  it('accepts nested docs under the canonical docs root', () => {
    const resolved = resolvePrdSlug('architecture/core');
    expect(resolved).toBe(path.join(docsRoot, 'architecture', 'core.md'));
  });

  it('rejects sibling docs-backup traversal that prefix-startsWith would allow', () => {
    const naiveJoin = path.resolve(path.join(docsRoot, '../docs-backup/secrets.md'));
    expect(naiveJoin.startsWith(docsRoot)).toBe(true);
    expect(resolvePrdSlug('../docs-backup/secrets')).toBeNull();
  });

  it('rejects parent-directory slugs and keeps leading-slash slugs inside docs', () => {
    expect(resolvePrdSlug('../../etc/passwd')).toBeNull();
    // Leading slash is stripped to a relative path, still under docsRoot.
    expect(resolvePrdSlug('/architecture/core')).toBe(
      path.join(docsRoot, 'architecture', 'core.md')
    );
  });
});
