(function () {
  const featurePages = new Set(['events', 'pass']);
  const featureNames = { events: 'Eventi', pass: 'Battle Pass' };
  const languageOptions = [
    ['it', 'Italiano'], ['en', 'English'],
    ['fr', 'Français'], ['es', 'Español'], ['pt-BR', 'Português'], ['de','Deutsch']
  ];

  const baseHome = renderHome;
  renderHome = function () {
    baseHome();
    const dashboard = portal.querySelector('.dashboard');
    if (!dashboard || portal.querySelector('.featureLinks')) return;
    dashboard.insertAdjacentHTML('beforeend', `<div class="clubcard featureLinks"><span class="cardIcon">⚡</span><span class="eyebrow">ATTIVITÀ DEL CLUB</span><h3>Eventi e Battle Pass</h3><p>Completa lotte online, accumula vittorie e sblocca ricompense.</p><button class="smallbtn" onclick="page('events')">Eventi →</button><button class="smallbtn" onclick="page('pass')">Battle Pass →</button></div>`);
  };

  const baseFight = renderFight;
  renderFight = function () {
    baseFight();
    document.querySelectorAll('[onclick="startCpuProgress()"]').forEach(button => button.remove());
    document.querySelectorAll('.quickMatchCard p').forEach(p => {
      p.textContent = 'Cerca un allenatore online. Se non trovi nessuno in pochi secondi, il sistema avvierà automaticamente una sfida contro un bot.';
    });
  };

  function teamManager() {
    const grid = document.getElementById('boxgrid');
    if (!grid || boxTab !== 'pokemon' || document.getElementById('teamManager')) return;
    const panel = document.createElement('section');
    panel.id = 'teamManager';
    panel.className = 'clubcard teamManager';
    panel.innerHTML = `<span class="eyebrow">SQUADRA · ${account.party.length}/6</span><h2>Ordina i tuoi Pokémon</h2><p class="muted">Sposta i compagni dal primo al sesto posto. L’ordine viene usato nelle lotte.</p><div class="teamSlots">${account.party.map((uid, i) => {
      const m = account.monsters.find(mon => mon.uid === uid);
      return m ? `<div class="teamSlot"><span>${i + 1}</span>${imageTag(m.num)}<strong>${esc(dex[m.num - 1].name)}</strong><button class="textbtn" onclick="moveTeamSlot(${i},-1)" ${i ? '' : 'disabled'}>↑</button><button class="textbtn" onclick="moveTeamSlot(${i},1)" ${i === account.party.length - 1 ? 'disabled' : ''}>↓</button></div>` : '';
    }).join('') || '<span class="muted">Aggiungi Pokémon alla squadra dal Box.</span>'}</div><div class="teamAdd">${account.monsters.filter(m => !account.party.includes(m.uid)).slice(0, 12).map(m => `<button class="smallbtn" onclick="addTeamSlot('${m.uid}')">+ ${esc(dex[m.num - 1].name)}</button>`).join('')}</div>`;
    grid.before(panel);
  }
  window.moveTeamSlot = async function (index, direction) {
    const next = [...account.party], target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    await action('party', { party: next });
  };
  window.addTeamSlot = async function (uid) {
    if (account.party.length >= 6) return toast('La squadra è completa.');
    await action('party', { party: [...account.party, uid] });
  };
  const baseBox = renderBox;
  renderBox = function () {
    baseBox();
    teamManager();
    if (boxTab === 'items') document.querySelectorAll('.inventoryGrid .clubcard').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim();
      const item = typeof EQUIPMENT !== 'undefined' ? EQUIPMENT.find(i => i.name === title || itemName(i.name) === title) : null;
      if (item && !card.querySelector('.itemEffect')) card.insertAdjacentHTML('beforeend', `<p class="itemEffect"><b>Effetto:</b> ${esc(item.effect || item.description || 'Oggetto utilizzabile durante la tua avventura.')}</p>`);
    });
  };

  const baseShop = renderShop;
  renderShop = function () {
    baseShop();
    if (portal.querySelector('.statBoostShop')) return;
    portal.querySelector('.shopgrid')?.insertAdjacentHTML('beforeend', `<section class="clubcard statBoostShop"><span class="eyebrow">POTENZIAMENTI DA BATTAGLIA</span><h3>Speed · Difesa · Attacco</h3><p>Acquista una carica per 100 P-coin e usala nelle battaglie online.</p><div class="boostShopButtons">${['Speed', 'Difesa', 'Attacco'].map(item => `<button class="smallbtn" onclick="buyBoost('${item}')" ${account.coins < 100 ? 'disabled' : ''}>${item} · ◈ 100</button>`).join('')}</div></section>`);
  };
  window.buyBoost = async item => { const result = await action('buy-item', { item }); if (result) toast(item + ' acquistato.'); };

  const baseSettings = renderSettings;
  renderSettings = function () {
    baseSettings();
    const select = document.getElementById('accountLanguage');
    if (select) {
      select.innerHTML = languageOptions.map(([id, label]) => `<option value="${id}" ${getPreferences().language === id ? 'selected' : ''}>${label}</option>`).join('');
    }
    const form = document.getElementById('preferencesForm');
    if (form && !document.getElementById('settingsVibration')) {
      form.querySelector('#settingsMotion')?.closest('label')?.insertAdjacentHTML('afterend', '<label class="checkField"><input id="settingsVibration" type="checkbox"> Vibrazione su smartphone</label>');
      form.querySelector('#settingsEffects')?.closest('label')?.insertAdjacentHTML('afterend', '<label class="checkField"><input id="settingsMusic" type="checkbox" checked> Musica</label>');
      $('settingsVibration').checked = account.preferences?.vibration !== false;
      $('settingsMusic').checked = account.preferences?.musicEnabled !== false;
    }
  };
  savePreferences = async function () {
    const vibration = $('settingsVibration')?.checked !== false;
    const music = $('settingsMusic')?.checked !== false;
    const musicVolume = +$('settingsVolume').value;
    window.vibrationEnabled = vibration;
    return withSettingsForm('preferencesForm', 'preferencesStatus', async () => {
      const preferences = {
        language: $('accountLanguage').value,
        musicVolume,
        musicEnabled: music,
        soundEffects: $('settingsEffects').checked,
        reducedMotion: $('settingsMotion').checked,
        vibration
      };
      saveAccount(await api('action', { action: 'preferences', preferences }));
      $('preferencesStatus').textContent = 'Preferenze salvate.';
      applyMusicPreference();
    });
  };
  window.vibrationEnabled = account?.preferences?.vibration !== false;
  document.addEventListener('click', event => {
    if (window.vibrationEnabled && event.target.closest('button,.move')) navigator.vibrate?.(12);
  }, { passive: true });
})();
