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

import { getVideos, setSpeeds as setSpeedsUtil } from '../../util/utils';
import { Context } from '../../context';
import { TabDetails } from '../../../../../shared/active_tab_details/types';
import { createAndRegisterManualAction } from '../../../../framework/creation_registration';

export function setSpeeds(context: Context, speed: number) {
  const videos = getVideos();
  setSpeedsUtil(context, speed, videos);
}

export function createAndRegisterVideoSetSpeedsActions(context: Context) {
  return {
    setSpeed1: createAndRegisterManualAction({
      id: 'video-set-speed-1',
      label: '1️⃣',
      tooltip: 'Set speed to 1',
      tabFcn: async () => {
        setSpeeds(context, 1);
      },
      filter: (tabDetails: TabDetails) => tabDetails.hasVideo,
    }),
    setSpeed3: createAndRegisterManualAction({
      id: 'video-set-speed-3',
      label: '3️⃣',
      tooltip: 'Set speed to 3',
      tabFcn: async () => {
        setSpeeds(context, 3);
      },
      filter: (tabDetails: TabDetails) => tabDetails.hasVideo,
    }),
    setSpeed4: createAndRegisterManualAction({
      id: 'video-set-speed-4',
      label: '4️⃣',
      tooltip: 'Set speed to 4',
      tabFcn: async () => {
        setSpeeds(context, 4);
      },
      filter: (tabDetails: TabDetails) => tabDetails.hasVideo,
    }),
  };
}
