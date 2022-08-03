import { autoActionsManager, manualActionsManager } from './registry';
import { ManualAction, AutoAction, ActionSet } from './types';
import { TabDetails } from '../../shared/active_tab_details/types';

export function createManualAction(
  part: Pick<ManualAction, 'label' | 'tooltip' | 'tabFcn' | 'id'> &
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
  part: Pick<AutoAction, 'tabFcn' | 'id'> & Partial<AutoAction>
): AutoAction {
  return {
    filter: () => true,
    handleResult: async () => null,
    ...part,
  };
}

export function registerManualAction(action: ManualAction) {
  manualActionsManager.addAction(action);
}

export function registerAutoAction(action: ManualAction) {
  manualActionsManager.addAction(action);
}

export function createAndRegisterManualAction(
  part: Pick<ManualAction, 'label' | 'tooltip' | 'tabFcn' | 'id'> &
    Partial<ManualAction>
): ManualAction {
  const action = createManualAction(part);
  manualActionsManager.addAction(action);
  return action;
}

export function createAndRegisterAutoAction(
  part: Pick<AutoAction, 'tabFcn' | 'id'> & Partial<AutoAction>
): AutoAction {
  const action = createAutoAction(part);
  autoActionsManager.addAction(action);
  return action;
}

export function getManualActionsForTab(
  tabDetails: TabDetails
): ActionSet<ManualAction> {
  return manualActionsManager.getActionSetForTab(tabDetails);
}

export function getAutoActionsForTab(
  tabDetails: TabDetails
): ActionSet<AutoAction> {
  return autoActionsManager.getActionSetForTab(tabDetails);
}
