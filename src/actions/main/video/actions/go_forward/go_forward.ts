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

import { incrementTime } from '../../util/utils';
import { context } from '../../context';
import { ManualAction } from '../../../../framework/types';
import { TabDetails } from '../../../../../shared/active_tab_details/types';
import { createAndRegisterManualAction } from '../../../../framework/creation_registration';

export const action: ManualAction = createAndRegisterManualAction({
  id: 'video-go-forward',
  label: '➡️',
  tooltip: 'Go Forwrd 10s',
  tabFcn: async () => {
    incrementTime(context, 10);
  },
  filter: (tabDetails: TabDetails) => tabDetails.hasVideo,
});
