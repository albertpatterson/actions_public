import { ManualAction, AutoAction, ActionSet } from './types';
import { TabDetails } from '../../shared/active_tab_details/types';

class ActionsManager<T extends ManualAction | AutoAction> {
  private actionSet: ActionSet<T> = {};

  addAction(action: T) {
    const id = action.id;
    if (id in this.actionSet) {
      throw new Error(`Action with id="${id}" already exists`);
    }

    this.actionSet[id] = action;
  }

  getActionSetForTab(tabDetails: TabDetails): ActionSet<T> {
    const tabActions = {} as ActionSet<T>;
    for (const actionName in this.actionSet) {
      const action = this.actionSet[actionName];
      if (action.filter(tabDetails)) {
        tabActions[actionName] = this.actionSet[actionName];
      }
    }

    return tabActions;
  }

  getAction(id: string): T | undefined {
    return this.actionSet[id];
  }
}

export const manualActionsManager = new ActionsManager<ManualAction>();
export const autoActionsManager = new ActionsManager<AutoAction>();
