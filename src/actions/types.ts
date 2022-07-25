import { TabDetails } from '../messaging/message_systems/get_active_tab_details/types';

interface Action {
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

type ActionSet<T> = { [name: string]: T };

export type AutoActionSet = ActionSet<AutoAction>;
export type ManualActionSet = ActionSet<ManualAction>;
