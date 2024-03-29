/**
 * @file
 * @author Albert Patterson <albert.patterson.code@gmail.com>
 * @see [Linkedin]{@link https://www.linkedin.com/in/apattersoncmu/}
 * @see [Github]{@link https://github.com/albertpatterson}
 * @see [npm]{@link https://www.npmjs.com/~apatterson189}
 * @see [Youtube]{@link https://www.youtube.com/channel/UCrECEffgWKBMCvn5tar9bYw}
 * @see [Medium]{@link https://medium.com/@albert.patterson.code}
 *
 * Free software under the GPLv3 licence. Permissions of this strong copyleft
 * license are conditioned on making available complete source code of
 * licensed works and modifications, which include larger works using a
 * licensed work, under the same license. Copyright and license notices must
 * be preserved. Contributors provide an express grant of patent rights.
 */

import '../scss/styles.scss';
import { drawActionsButtons, showMessage, showToast } from './view';
import {
  messageSystem as getActiveTabDetailsMessageSystem,
  createRequest as createGetActiveTabDetailsRequest,
} from '../../../messaging/message_systems/actions_framework/get_active_tab_details/message_system';
import {
  messageSystem as doActionMessageSystem,
  createRequest as createdoActionRequest,
} from '../../../messaging/message_systems/actions_framework/do_action/message_system';
import { getManualActionsForTab } from '../../../actions/framework/access';
import { TabDetails } from '../../../shared/active_tab_details/types';
import { ManualActionSet } from '../../../actions/framework/types';

(async () => {
  console.log('loading');
  const getActiveTabDetailsResponse =
    await getActiveTabDetailsMessageSystem.sendInTab(
      createGetActiveTabDetailsRequest({})
    );

  console.log(getActiveTabDetailsResponse);

  if (getActiveTabDetailsResponse) {
    const activeTabDetails = getActiveTabDetailsResponse.data.tabDetails;
    if (activeTabDetails) {
      const filteredActionSet = getManualActionsForTab(activeTabDetails);
      const doAction = createActionDoer(activeTabDetails);

      const labeledActions = getActionLabels(filteredActionSet);
      drawActionsButtons(labeledActions, doAction);
    } else {
      showMessage('no active tab details data', true);
    }
  } else {
    showMessage('no active tab details response', true);
  }
})();

function createActionDoer(tabDetails: TabDetails) {
  const manualActionSet = getManualActionsForTab(tabDetails);
  return async (actionName: string) => {
    const request = createdoActionRequest({
      tabDetails,
      actionName,
    });

    const action = manualActionSet[actionName];

    let removeInitMessage = () => {};
    if (action.initMessage) {
      removeInitMessage = showMessage(action.initMessage);
    }

    const result = await doActionMessageSystem.sendInTab(request);

    if (result) {
      const reportData = await action.handleResult(result.data.result);
      removeInitMessage();

      if (reportData) {
        const { message, isError } = reportData;
        showToast(message, isError);
      }

      if (result.data.error) {
        showToast(result.data.error, true);
      }
    } else {
      removeInitMessage();
      const error = `no response returned for action ${actionName}`;
      showToast(error, true);
    }
  };
}

export function getActionLabels(actionSet: ManualActionSet) {
  const actionLabels = [];
  for (const actionName in actionSet) {
    const action = actionSet[actionName];
    actionLabels.push({
      actionName,
      label: action.label,
      tooltip: action.tooltip,
    });
  }

  return actionLabels;
}
