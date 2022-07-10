import { ActionSet } from '../types';
import { action as sizeAndScrollAction } from './size_and_scroll';

export const readActionSet: ActionSet = {
  readSizeAndScroll: sizeAndScrollAction,
};
