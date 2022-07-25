import { ManualAction, AutoAction } from './types';

export function createManualAction(
  part: Pick<ManualAction, 'label' | 'tooltip' | 'tabFcn'> &
    Partial<ManualAction>
): ManualAction {
  return {
    filter: () => true,
    handleResult: async () => null,
    initMessage: null,
    ...part,
  };
}

export function createAutoAction(
  part: Pick<AutoAction, 'tabFcn'> & Partial<AutoAction>
): AutoAction {
  return {
    filter: () => true,
    handleResult: async () => null,
    ...part,
  };
}
