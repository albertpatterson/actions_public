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

export const youtubeWatchLaterAlertAutoAction: AutoAction = createAutoAction({
  tabFcn: async () => {
    makePlaylistItemsRed();
  },
  filter: (tabDetails: TabDetails) =>
    tabDetails.href.startsWith('https://www.youtube.com/playlist?list=WL'),
});

const DELETE_BUTTON_CLASS = 'delete-element-button';

function makePlaylistItemsRed() {
  setInterval(() => {
    Array.from(
      document.querySelectorAll('ytd-playlist-video-renderer')
    ).forEach((item: HTMLElement) => {
      const menu = item.querySelector('#menu') as HTMLButtonElement | null;
      const parent = menu?.parentElement;
      if (parent && !parent.querySelector('.' + DELETE_BUTTON_CLASS)) {
        const button = document.createElement('button');
        button.innerText = 'd';
        button.classList.add(DELETE_BUTTON_CLASS);
        button.onclick = async () => {
          console.log('delete');
          menu.querySelector('button')?.click();
          await removeVideo();
        };
        parent.appendChild(button);
      }
    });
  }, 1e3);
}

async function removeVideo() {
  await new Promise((res, rej) => {
    const int = setInterval(() => {
      const popupItems = document
        .querySelector('ytd-menu-popup-renderer')
        ?.querySelectorAll('ytd-menu-service-item-renderer');

      if (popupItems) {
        const removeButton = Array.from(popupItems).find(
          (item: HTMLElement) => {
            return item.innerText === 'Remove from Watch later';
          }
        );

        if (removeButton) {
          (removeButton as HTMLButtonElement).click();
          clearTimeout(timeout);
          res(null);
        }
      }
    }, 250);

    const timeout = setTimeout(() => {
      clearInterval(int);
      rej('timed out');
    }, 3e3);
  });
}
