import { TabDetails } from '../../shared/active_tab_details/types';

interface Action {
  id: string;
  tabFcn: (tabDetails: TabDetails) => Promise<string | void>;
  filter: (tabDetails: TabDetails) => boolean;
  handleResult: (
    result?: string
  ) => Promise<{ message: string; isError: boolean } | null>;
}

export interface AutoAction extends Action {}

export interface ManualAction extends Action {
  label: string;
  tooltip: string;
  initMessage: string | null;
}

export type ActionSet<T> = { [name: string]: T };

export type AutoActionSet = ActionSet<AutoAction>;
export type ManualActionSet = ActionSet<ManualAction>;
