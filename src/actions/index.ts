import { TabDetails } from '../messaging/message_systems/get_active_tab_details/types';
import { ActionSet, AutoActionSet } from './types';
import { actionSet as videoActionSet } from './video';
import { readActionSet } from './read';
import { youtubeAutoActionSet } from './youtube';

export const fullActionSet: ActionSet = {
  ...videoActionSet,
  ...readActionSet,
};

const fullAutoActionSet: AutoActionSet = {
  ...youtubeAutoActionSet,
};

function getAnyActionSet<T extends ActionSet | AutoActionSet>(
  fullActionSet: T,
  tabDetails: TabDetails
): T {
  const tabActions: T = {} as T;
  for (const actionName in fullActionSet) {
    const action = fullActionSet[actionName];
    if (action.filter(tabDetails)) {
      tabActions[actionName] = fullActionSet[actionName];
    }
  }

  return tabActions;
}

export function getActionSet(tabDetails: TabDetails): ActionSet {
  return getAnyActionSet(fullActionSet, tabDetails);
}

export function getAutoActionSet(tabDetails: TabDetails): AutoActionSet {
  return getAnyActionSet(fullAutoActionSet, tabDetails);
}
