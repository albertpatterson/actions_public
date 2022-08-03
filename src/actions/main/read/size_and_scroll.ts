import { ManualAction } from '../../framework/types';

import { createAndRegisterManualAction } from '../../framework/creation_registration';

export const action: ManualAction = createAndRegisterManualAction({
  id: 'read-set-size-and-scroll',
  label: '🔽',
  tooltip: 'Register listerns for easy reading by scrolling',
  tabFcn: async () => {
    if (cleanup !== null) {
      cleanup();
      return;
    }

    setup();
  },
});

let cleanup: (() => void) | null = null;

function setup() {
  let scrollInterval: number | null = null;
  let prevKeyUpMillis: number | null = null;

  function handleDownArrowDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown') {
      return;
    }

    if (scrollInterval === null) {
      scrollInterval = window.setInterval(() => {
        window.scrollBy(0, 1);
      }, 10);
    }

    event.stopPropagation();
    event.preventDefault();
  }

  function handleDownArrowUp(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown') {
      return;
    }

    if (scrollInterval !== null) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }

    const now = Date.now();
    if (prevKeyUpMillis !== null) {
      const millisSinceKeyUp = Date.now() - prevKeyUpMillis;
      if (millisSinceKeyUp < 500) {
        window.scrollBy(0, 100);
      }
    }

    prevKeyUpMillis = now;
  }

  document.body.addEventListener('keydown', handleDownArrowDown);
  document.body.addEventListener('keyup', handleDownArrowUp);

  cleanup = () => {
    document.body.removeEventListener('keydown', handleDownArrowDown);
    document.body.removeEventListener('keyup', handleDownArrowUp);

    if (scrollInterval !== null) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  };
}
