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

/**
 * Update this function to contain the logic run in the tab when this request type is recieved.
 */

import {
  DoAutoActionsRequestData,
  DoAutoActionsRequestResponseData,
} from './types';
import { Request, ResponseResult } from '../../framework/types';
import { getTabDetails } from '../../../shared/active_tab_details';
import { getAutoActionsForTab } from '../../../actions/framework/access';

export async function handleAsyncInTab(
  request: Request<DoAutoActionsRequestData>,
  sender: chrome.runtime.MessageSender
): Promise<ResponseResult<DoAutoActionsRequestResponseData>> {
  const tabDetails = getTabDetails();

  const autoActionSet = getAutoActionsForTab(tabDetails);

  let errors: string[] = [];

  for (const autoActionName in autoActionSet) {
    try {
      const autoAction = autoActionSet[autoActionName];
      autoAction.tabFcn(tabDetails);
    } catch (caught: unknown) {
      const error = caught as Error;
      errors.push(error.message);
    }
  }

  if (errors.length === 0) {
    return {
      succeeded: false,
      data: { error: errors.join('\n\n') },
    };
  }

  return {
    succeeded: true,
    data: {},
  };
}
