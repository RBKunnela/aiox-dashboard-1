import { describe, expect, it } from 'vitest';
import { GH_CLI_TIMEOUT_MS, ghExecOpts } from '@/lib/gh-exec';

describe('gh CLI exec options', () => {
  it('applies a timeout to every gh subprocess call', () => {
    const opts = ghExecOpts('/tmp/project');
    expect(opts.cwd).toBe('/tmp/project');
    expect(opts.timeout).toBe(GH_CLI_TIMEOUT_MS);
    expect(GH_CLI_TIMEOUT_MS).toBeGreaterThan(0);
  });
});
