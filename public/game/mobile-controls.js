(function () {
  const coarsePointer = matchMedia('(pointer: coarse)').matches;

  function updateOrientationState() {
    const portrait = coarsePointer && matchMedia('(orientation: portrait)').matches;
    document.body.classList.toggle('portrait-device', portrait);
  }

  async function enterLandscape() {
    if (!coarsePointer) return;
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
      }
    } catch {}
    try {
      await screen.orientation?.lock?.('landscape');
    } catch {}
    updateOrientationState();
  }

  window.enterLandscape = enterLandscape;
  window.addEventListener('orientationchange', updateOrientationState);
  window.addEventListener('resize', updateOrientationState);
  document.addEventListener('DOMContentLoaded', () => {
    updateOrientationState();
    document.getElementById('rotateNow')?.addEventListener('click', enterLandscape);
    document.getElementById('launch')?.addEventListener('click', enterLandscape, { once: true });
    document.getElementById('titlePlay')?.addEventListener('click', enterLandscape, { once: true });
    document.getElementById('titleDemo')?.addEventListener('click', enterLandscape, { once: true });
  });
})();
