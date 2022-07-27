import { youtubeWatchLaterPlaylistAutoAction } from './auto_actions/watch_later_playlist';
import { AutoActionSet } from '../types';
import { youtubeWatchLaterAutoAction } from './auto_actions/watch_later';

export const youtubeAutoActionSet: AutoActionSet = {
  youtubeWatchLaterPlaylistAutoAction,
  youtubeWatchLaterAutoAction,
};
