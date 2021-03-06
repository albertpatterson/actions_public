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
 * Register message systems here
 */

import { BaseMessageSystem } from '../framework/base_message_system';
import { messageSystem as getActiveTabDetailsMessageSystem } from './get_active_tab_details/message_system';
import { messageSystem as doActionMessageSystem } from './do_action/message_system';
import { messageSystem as doAutoActionsMessageSystem } from './do_auto_action/message_system';

export const messageSystems: Array<BaseMessageSystem<{}, {}>> = [
  getActiveTabDetailsMessageSystem,
  doActionMessageSystem,
  doAutoActionsMessageSystem,
  // Add new message systems here
];
