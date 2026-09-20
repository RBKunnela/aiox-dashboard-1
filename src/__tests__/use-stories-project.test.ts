import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProjectsStore } from '@/stores/projects-store';
import { useSettingsStore } from '@/stores/settings-store';

const swrMock = vi.fn<(key: string | null, ...rest: unknown[]) => {
  data: undefined;
  error: undefined;
  isLoading: boolean;
  mutate: ReturnType<typeof vi.fn>;
}>(() => ({
  data: undefined,
  error: undefined,
  isLoading: false,
  mutate: vi.fn(),
}));

vi.mock('swr', () => ({
  default: (key: string | null, ...rest: unknown[]) => swrMock(key, ...rest),
}));

describe('useStories project scoping', () => {
  beforeEach(() => {
    swrMock.mockClear();
    useSettingsStore.setState({
      settings: {
        ...useSettingsStore.getState().settings,
        useMockData: false,
      },
    });
    useProjectsStore.setState({ activeProjectId: 'alpha-project' });
  });

  it('includes the active project in the SWR key', async () => {
    const { useStories } = await import('@/hooks/use-stories');
    renderHook(() => useStories());

    expect(swrMock).toHaveBeenCalled();
    const key = swrMock.mock.calls[0]?.[0];
    expect(key).toBe('/aiox-dashboard/api/stories?project=alpha-project');
  });
});
