import { setTimeoutInterval } from '../../../util/timing/util';

export async function clickMenuButton(
  openMenuButton: HTMLButtonElement,
  menuItemText: string
) {
  openMenuButton.click();
  let popup = null as null | HTMLElement;

  const result = await setTimeoutInterval(
    () => {
      popup = document.querySelector('ytd-menu-popup-renderer');
      if (!popup) {
        return false;
      }

      popup.style.height = '0px';

      const popupItems = popup?.querySelectorAll(
        'ytd-menu-service-item-renderer'
      );

      if (popupItems) {
        const menuItemButton = Array.from(popupItems).find(
          (item: HTMLElement) => {
            return item.innerText === menuItemText;
          }
        );

        if (menuItemButton) {
          (menuItemButton as HTMLButtonElement).click();
          return true;
        }
      }

      return false;
    },
    100,
    1e3,
    true
  );

  if (popup) {
    // @ts-ignore: clear height setting
    popup.style.height = null;
  }

  return result;
}

export function addAutoMenuButton(
  container: HTMLElement,
  label: string,
  menuItemLabel: string,
  tooltip: string = '',
  buttonClass: string = ''
): HTMLButtonElement | null {
  buttonClass =
    buttonClass ||
    'auto-menu-button-' +
      menuItemLabel
        .split('')
        .filter((s) => !!s.match(/\w/))
        .join('');

  tooltip = tooltip || menuItemLabel;

  const menu = container.querySelector('#menu') as HTMLButtonElement | null;
  if (menu && !menu.querySelector('.' + buttonClass)) {
    const button = document.createElement('button');
    button.title = tooltip;
    button.innerText = label;
    button.classList.add(buttonClass);
    button.onclick = async () => {
      const openMenuButton = menu.querySelector('button');
      if (openMenuButton) {
        await clickMenuButton(openMenuButton, menuItemLabel);
      }
    };
    menu.appendChild(button);
    return button;
  }

  return null;
}
