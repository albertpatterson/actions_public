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

import { AutoAction } from '../../../../framework/types';
import { TabDetails } from '../../../../../shared/active_tab_details/types';
import { createAndRegisterAutoAction } from '../../../../framework/creation_registration';
import { addAutoMenuButton } from '../util';

export const youtubeWatchLaterPlaylistAutoAction: AutoAction =
  createAndRegisterAutoAction({
    id: 'youtube-auto-actions-watch-later-playlist',
    tabFcn: async () => {
      addDeleteItemButtons();
    },
    filter: (tabDetails: TabDetails) =>
      tabDetails.href.startsWith('https://www.youtube.com/playlist?list=WL'),
  });

function addDeleteItemButtons() {
  setInterval(() => {
    Array.from(
      document.querySelectorAll('ytd-playlist-video-renderer')
    ).forEach((item: HTMLElement) => {
      const button = addAutoMenuButton(item, 'd', 'Remove from Watch later');
    });
  }, 1e3);
}
