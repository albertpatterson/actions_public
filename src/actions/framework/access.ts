import { ManualAction, AutoAction, ActionSet } from './types';
import { TabDetails } from '../../shared/active_tab_details/types';
import { autoActionsManager, manualActionsManager } from './registry';
import '../main/index';

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
