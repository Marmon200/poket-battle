// Profile photos identify trainers in the introduction and victory podium.
window.battlePresentation = {
  active: false,
  end: 0,
  trainers: [],
  counter: null,
  raf: 0,
  safetyTimer: 0,
  cancel() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    clearTimeout(this.safetyTimer);
    document.getElementById('battleIntro')?.remove();
    document.body.classList.remove('introducing');
    const game = document.getElementById('game');
    if (game) {
      game.hidden = false;
      game.style.visibility = 'visible';
      game.style.pointerEvents = 'auto';
    }
  },
  finish() {
    if (!this.active) return false;
    this.cancel();
    cv?.focus();
    log('VIA! La battaglia comincia.');
    return false;
  },
  begin(st = null, side = 0) {
    this.cancel();
    const cpu = { photo: null, cpu: true };
    this.trainers = st
      ? [0, 1].map(i => ({ name: st.names[i], avatar: normAvatar(st.avatars?.[i]) }))
      : [
          { name: account?.name || 'Tu', avatar: normAvatar(account?.avatar || window.previewTrainer) },
          { name: 'Ace', avatar: cpu }
        ];
    this.side = side;
    const lists = st ? st.teams : [team, foes];
    const order = st ? [side, 1 - side] : [0, 1];
    const scheduled = st?.startsAt ? Math.max(0, st.startsAt - (room.serverTime || Date.now())) : 5200;
    const remaining = Math.min(3400, scheduled);
    if (remaining <= 0) return;
    this.end = Date.now() + remaining;
    this.active = true;
    this.counter = null;
    keys = {};
    joystick = { x: 0, y: 0 };
    const el = document.createElement('div');
    el.id = 'battleIntro';
    el.className = 'battleIntro';
    el.setAttribute('role', 'status');
    el.innerHTML = `<div class="introTopline">${esc(typeof stadiumInfo === 'function' ? stadiumInfo(st?.stadium || window.activeStadium).name.toUpperCase() : 'PALESTRA CLASSICA')} <span>${lists[order[0]].length} vs ${lists[order[1]].length}</span></div><div class="introArenaBonus">${(st?.stadium || window.activeStadium) === 'coast' ? '+10% danni Pokémon Acqua · Per entrambi' : typeof stadiumInfo === 'function' && stadiumInfo(st?.stadium || window.activeStadium).types.length ? '+10% mosse ' + stadiumInfo(st?.stadium || window.activeStadium).types.join(' / ') + ' · Per entrambi' : 'Campo neutrale · Nessun bonus'}</div><div class="vsStage">${order.map((i, j) => `<div class="vsTrainer ${j ? 'gold' : 'red'}"><div class="vsName"><small>${j ? 'IL TUO AVVERSARIO' : 'IL TUO ALLENATORE'}</small><strong>${esc(this.trainers[i].name)}</strong></div><div class="vsPortrait"><canvas id="introTrainer${i}" width="512" height="512" aria-label="${esc(this.trainers[i].name)}"></canvas></div><div class="vsLead"><img src="assets/${lists[i][0].id}.png" alt="${esc(lists[i][0].name)}"><span>${esc(lists[i][0].name)}<small>Lv. ${lists[i][0].level}</small></span></div></div>`).join('')}<span class="bigVS">VS</span></div><div class="introCountdown"><span id="introCount">PRONTI?</span><small id="introHint">Due allenatori. Una sola vittoria.</small></div>`;
    document.body.append(el);
    document.body.classList.add('introducing');
    for (const i of order) drawTrainer(document.getElementById('introTrainer' + i), this.trainers[i].avatar);
    this.safetyTimer = setTimeout(() => this.finish(), 3500);
    const frame = () => {
      if (!this.active) return;
      this.tick();
      if (this.active) this.raf = requestAnimationFrame(frame);
    };
    frame();
  },
  tick() {
    if (!this.active) return false;
    const left = this.end - Date.now();
    if (left <= 0) return this.finish();
    const count = left > 2400 ? 'PRONTI?' : left > 1600 ? '3' : left > 800 ? '2' : '1';
    if (count !== this.counter) {
      this.counter = count;
      const el = document.getElementById('introCount');
      const hint = document.getElementById('introHint');
      if (!el || !hint) return this.finish();
      el.textContent = count;
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
      hint.textContent = count === 'PRONTI?' ? 'Due allenatori. Una sola vittoria.' : 'Preparati a scendere in campo';
      beep(count === '1' ? 800 : 450, .12);
    }
    return true;
  },
  result(winner, lists, duration, st = null) {
    this.cancel();
    const trainers = st ? [0, 1].map(i => ({ name: st.names[i], avatar: normAvatar(st.avatars?.[i]) })) : this.trainers;
    const trainer = trainers[winner] || { name: winner ? 'Ace' : 'Tu', avatar: avatarDefaults };
    const mvp = lists[winner].reduce((a, b) => (b.damageDealt || 0) > (a.damageDealt || 0) ? b : a, lists[winner][0]);
    const win = st ? winner === room.side : winner === 0;
    $('resultEyebrow').textContent = win ? 'VITTORIA!' : 'SFIDA COMPLETATA';
    $('resultTitle').textContent = !st && winner === 0 && trainer.name === 'Tu' ? 'Hai vinto!' : trainer.name + ' vince!';
    $('resultCopy').textContent = 'Tempo di battaglia: ' + fmt(duration) + '.';
    document.getElementById('xpAwards')?.remove();
    if (st?.xpAwards?.length) {
      const awards = document.createElement('div');
      awards.id = 'xpAwards';
      awards.className = 'xpAwards';
      awards.innerHTML = `<strong>Esperienza guadagnata</strong>${st.xpAwards.map(a => `<span>${esc(a.name)} <b>+${a.xp} XP</b>${a.level > a.beforeLevel ? ` · Livello ${a.level}` : ''}</span>`).join('')}`;
      $('resultCopy').after(awards);
    }
    document.getElementById('victoryPodium')?.remove();
    const el = document.createElement('div');
    el.id = 'victoryPodium';
    el.className = 'victoryPodium';
    el.innerHTML = `<div class="winnerTrainer"><span class="winnerRibbon">ALLENATORE VINCITORE</span><canvas id="winnerPortrait" width="512" height="512" aria-label="Allenatore vincitore ${esc(trainer.name)}"></canvas><strong>${esc(trainer.name)}</strong></div><div class="mvpSpot"><span class="mvpBadge">✦ MVP DELLA SQUADRA</span><div class="mvpAura"><img src="${artAsset(mvp.id)}" alt="${esc(mvp.name)}"></div><h2>${esc(mvp.name)}</h2><span class="mvpLevel">Lv. ${mvp.level}</span><div class="mvpDamage"><strong>${Math.round(mvp.damageDealt || 0)}</strong><span>danni inflitti</span></div><p>Il Pokémon del vincitore che ha inflitto più danni.</p></div>`;
    $('resultCopy').after(el);
    drawTrainer(document.getElementById('winnerPortrait'), trainer.avatar);
  }
};
