/** Kill hung `gh` subprocesses so a stuck CLI cannot pin a route worker. */
export const GH_CLI_TIMEOUT_MS = 10_000;

export function ghExecOpts(cwd: string) {
  return { cwd, timeout: GH_CLI_TIMEOUT_MS };
}
