(function () {
  const originalRenderAuth = window.renderAuth;
  const originalPage = window.page;

  function authShell(title, body) {
    portal.innerHTML = `<div class="authLayout"><div class="authCopy"><span class="eyebrow">SICUREZZA ACCOUNT</span><h1>${title}</h1></div><div class="formcard">${body}</div></div>`;
  }

  function renderVerification(email) {
    authShell('Controlla la tua email.', `<p class="muted">Abbiamo inviato un codice a <b>${esc(email)}</b>. Inseriscilo entro 15 minuti.</p><form id="verifyForm"><label class="field">Codice di verifica</label><input name="code" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" required placeholder="123456"><button class="primary" type="submit">Verifica email →</button><p class="formStatus" id="authStatus" role="status"></p></form><button class="textbtn" id="resendVerification">Invia un nuovo codice</button><button class="textbtn" id="backToAuth">Torna all’accesso</button>`);
    $('verifyForm').onsubmit = async e => {
      e.preventDefault();
      try {
        const code = new FormData(e.currentTarget).get('code');
        saveAccount(await api('verify-email', { email, code }));
        originalPage('home');
        toast('Email verificata. Benvenuto nel Club!');
      } catch (error) {
        $('authStatus').textContent = error.message;
      }
    };
    $('resendVerification').onclick = async () => {
      try { $('authStatus').textContent = (await api('resend-verification', { email })).message; } catch (error) { $('authStatus').textContent = error.message; }
    };
    $('backToAuth').onclick = () => originalPage('auth');
  }

  function renderResetRequest() {
    authShell('Recupera il tuo account.', `<p class="muted">Ti invieremo un codice di sicurezza all’indirizzo registrato.</p><form id="resetRequestForm"><label class="field">Email</label><input name="email" type="email" required autocomplete="email"><button class="primary" type="submit">Invia codice →</button><p class="formStatus" id="authStatus" role="status"></p></form><button class="textbtn" id="backToAuth">Torna all’accesso</button>`);
    $('resetRequestForm').onsubmit = async e => {
      e.preventDefault();
      try { const email = String(new FormData(e.currentTarget).get('email')).trim().toLowerCase(); $('authStatus').textContent = (await api('request-password-reset', { email })).message; setTimeout(() => renderReset(email), 400); } catch (error) { $('authStatus').textContent = error.message; }
    };
    $('backToAuth').onclick = () => originalPage('auth');
  }

  function renderReset(email) {
    authShell('Imposta una nuova password.', `<p class="muted">Inserisci il codice ricevuto per <b>${esc(email)}</b>.</p><form id="resetForm"><label class="field">Codice di sicurezza</label><input name="code" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" required><label class="field">Nuova password</label><input name="password" type="password" minlength="8" maxlength="128" required autocomplete="new-password"><button class="primary" type="submit">Salva password →</button><p class="formStatus" id="authStatus" role="status"></p></form>`);
    $('resetForm').onsubmit = async e => {
      e.preventDefault();
      try { const data = Object.fromEntries(new FormData(e.currentTarget)); await api('reset-password', { email, code: data.code, password: data.password }); $('authStatus').textContent = 'Password aggiornata. Ora puoi accedere.'; setTimeout(() => originalPage('auth'), 700); } catch (error) { $('authStatus').textContent = error.message; }
    };
  }

  window.renderAuth = function () {
    originalRenderAuth();
    const form = $('authForm');
    if (!form) return;
    const card = form.closest('.formcard');
    card.insertAdjacentHTML('beforeend', `<button class="textbtn" id="forgotPassword">Hai dimenticato la password?</button><button class="textbtn" id="verifyExisting">Devi verificare l’email?</button>`);
    $('forgotPassword').onclick = renderResetRequest;
    $('verifyExisting').onclick = () => {
      const email = form.querySelector('[name="email"]').value.trim().toLowerCase();
      if (email) renderVerification(email); else $('authError').textContent = 'Inserisci prima la tua email.';
    };
    form.onsubmit = async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      try {
        const result = await api(authMode, { ...data, starter: chosenStarter });
        if (result.verificationRequired) renderVerification(result.email);
        else { saveAccount(result); originalPage('home'); toast('Accesso effettuato.'); }
      } catch (error) {
        if (error.code === 'email_not_verified') renderVerification(data.email);
        else $('authError').textContent = error.message;
        submit.disabled = false;
      }
    };
  };
})();
