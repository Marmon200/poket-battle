// Loaded before game.js: selectionUI runs while that script initializes.
const missingArtwork=new Set(['wartortle','weedle','vulpix','wigglytuff','zubat','weepinbell','voltorb','weezing','zapdos']);
function artAsset(id){return 'assets/'+id+(missingArtwork.has(id)?'.png':'-art.jpg')}
document.addEventListener('error',event=>{const img=event.target;if(!(img instanceof HTMLImageElement)||img.dataset.fallbackApplied)return;const match=img.getAttribute('src')?.match(/(?:^|\/)assets\/([a-z0-9-]+)-art\.jpg/);if(match){img.dataset.fallbackApplied='true';img.src='assets/'+match[1]+'.png'}},true);
