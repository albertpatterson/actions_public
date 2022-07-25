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

import { handleRequestInServiceWorker } from '../messaging/framework/message';
import {
  messageSystem as autoActionsMessageSystem,
  createRequest as createDoAutoActionsRequest,
} from '../messaging/message_systems/do_auto_action/message_system';

/**
 * handle requests sent via the message system
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  return handleRequestInServiceWorker(request, sender, sendResponse);
});

chrome.tabs.onUpdated.addListener(
  (tabId: number, changeInfo: { status?: string }, tab: chrome.tabs.Tab) => {
    if (changeInfo.status === 'complete') {
      autoActionsMessageSystem.sendInServiceWorker(
        tabId,
        createDoAutoActionsRequest({})
      );
    }
  }
);
