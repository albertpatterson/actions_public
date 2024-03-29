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
  GetActiveTabDetailsRequestData,
  GetActiveTabDetailsRequestResponseData,
} from './types';
import { Request, ResponseResult } from '../../../framework/types';
import { getTabDetails } from '../../../../shared/active_tab_details';

export async function handleAsyncInTab(
  request: Request<GetActiveTabDetailsRequestData>,
  sender: chrome.runtime.MessageSender
): Promise<ResponseResult<GetActiveTabDetailsRequestResponseData>> {
  console.log(
    `Handled get active Page details Request with data "${request.data}"`
  );

  const tabDetails = getTabDetails();

  return {
    succeeded: true,
    data: {
      tabDetails,
    },
  };
}
