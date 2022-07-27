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

import { AutoAction } from '../../../types';
import { TabDetails } from '../../../../messaging/message_systems/get_active_tab_details/types';
import { createAutoAction } from '../../../shared';
import { addAutoMenuButton } from '../util';

const urlPropsMap = new Map([
  [
    'https://www.youtube.com/',
    { selector: 'ytd-rich-item-renderer', marginTop: 50 },
  ],
  [
    'https://www.youtube.com/feed/subscriptions',
    { selector: 'ytd-grid-video-renderer', marginTop: 0 },
  ],
]);

export const youtubeWatchLaterAutoAction: AutoAction = createAutoAction({
  tabFcn: async (tabDetails: TabDetails) => {
    addWatchLaterButton(tabDetails);
  },
  filter: (tabDetails: TabDetails) =>
    Array.from(urlPropsMap.keys()).includes(tabDetails.href),
});

function addWatchLaterButton(tabDetails: TabDetails) {
  const props = urlPropsMap.get(tabDetails.href);
  if (!props) {
    throw new Error('no container selector for url ' + tabDetails.href);
  }

  const { selector: containerSelector, marginTop } = props;

  setInterval(() => {
    Array.from(document.querySelectorAll(containerSelector)).forEach(
      (item: HTMLElement) => {
        const button = addAutoMenuButton(item, 'L', 'Save to Watch later');
        if (button) {
          button.style.height = 'min-content';
          button.style.marginTop = marginTop + 'px';
        }
      }
    );
  }, 1e3);
}
