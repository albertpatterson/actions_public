export function getTabDetails() {
  return {
    href: document.location.href,
    hasVideo: Boolean(document.querySelector('video')),
  };
}
