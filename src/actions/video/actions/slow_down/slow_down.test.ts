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

import { getVideos, setSpeeds } from '../../util/utils';
import { slowDown } from './slow_down';
import { context } from '../../context';

jest.mock('../../util/utils');
const getVideosMock = getVideos as jest.MockedFunction<typeof getVideos>;

it('reduces playback rate by .5', () => {
  let playbackRate = 2;

  const mockVideo = {
    set playbackRate(playbackRate) {},
    get playbackRate() {
      return playbackRate;
    },
  } as HTMLVideoElement;

  getVideosMock.mockImplementation(() => [mockVideo]);

  slowDown(context);
  expect(setSpeeds).toBeCalledWith(context, 1.5, [mockVideo]);
  playbackRate = 1.5;

  slowDown(context);
  expect(setSpeeds).toBeCalledWith(context, 1, [mockVideo]);
});
