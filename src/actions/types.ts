import { TabDetails } from '../messaging/message_systems/get_active_tab_details/types';

interface BaseAction {
  tabFcn: (tabDetails: TabDetails) => Promise<string | void>;
  filter: (tabDetails: TabDetails) => boolean;
  handleResult: (
    result?: string
  ) => Promise<{ message: string; isError: boolean } | null>;
}

export interface AutoAction extends BaseAction {}

export interface Action extends BaseAction {
  label: string;
  tooltip: string;
  initMessage: string | null;
}

type AnyActionSet<T> = { [name: string]: T };

export type AutoActionSet = AnyActionSet<AutoAction>;
export type ActionSet = AnyActionSet<Action>;
