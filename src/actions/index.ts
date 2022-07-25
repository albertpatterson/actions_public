import { TabDetails } from '../messaging/message_systems/get_active_tab_details/types';
import { ManualActionSet, AutoActionSet } from './types';
import { actionSet as videoActionSet } from './video';
import { readActionSet } from './read';
import { youtubeAutoActionSet } from './youtube';

const fullManualActionSet: ManualActionSet = {
  ...videoActionSet,
  ...readActionSet,
};

const fullAutoActionSet: AutoActionSet = {
  ...youtubeAutoActionSet,
};

function getActionSet<T extends ManualActionSet | AutoActionSet>(
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

export function getManualActionSet(tabDetails: TabDetails): ManualActionSet {
  return getActionSet(fullManualActionSet, tabDetails);
}

export function getAutoActionSet(tabDetails: TabDetails): AutoActionSet {
  return getActionSet(fullAutoActionSet, tabDetails);
}
