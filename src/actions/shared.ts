import { Action, AutoAction } from './types';

export function createAction(
  part: Pick<Action, 'label' | 'tooltip' | 'tabFcn'> & Partial<Action>
): Action {
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
