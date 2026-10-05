(() => {
  'use strict';

  const TOKEN_KEY = 'moc-mien-auth-token';
  const trim = value => String(value ?? '').trim();
  const apiBaseUrl = () => trim(window.MOC_MIEN_API_BASE_URL).replace(/\/+$/, '');

  let currentUser = null;

  const token = () => {
    try { return localStorage.getItem(TOKEN_KEY) || ''; }
    catch { return ''; }
  };

  const setToken = value => {
    try {
      if (value) localStorage.setItem(TOKEN_KEY, value);
      else localStorage.removeItem(TOKEN_KEY);
    } catch { /* Keep auth state in memory only if storage is unavailable. */ }
  };

  async function request(path, options = {}) {
    const base = apiBaseUrl();
    if (!base) {
      throw new Error('Backend chưa được cấu hình cho website này. Hãy đặt window.MOC_MIEN_API_BASE_URL trước khi dùng đăng nhập.');
    }

    const headers = {
      'Accept': 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    };

    const accessToken = token();
    if (accessToken) headers.Authorization = 'Bearer ' + accessToken;

    const response = await fetch(base + path, { ...options, headers });
    let body = null;
    try { body = await response.json(); } catch { body = null; }

    if (!response.ok) {
      const detail = Array.isArray(body?.detail)
        ? body.detail.map(item => item?.msg || item?.message || JSON.stringify(item)).join('; ')
        : body?.detail;
      throw new Error(detail || body?.message || body?.error || ('Yêu cầu thất bại (HTTP ' + response.status + ').'));
    }
    return body || {};
  }

  function modalMarkup() {
    return `
      <div class="auth-overlay" id="auth-overlay" hidden>
        <section class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <button type="button" class="auth-close" id="auth-close" aria-label="Đóng">×</button>

          <div class="auth-guest" id="auth-guest">
            <span class="eyebrow">TÀI KHOẢN MỘC MIÊN</span>
            <h2 id="auth-title">Chào mừng bạn quay lại.</h2>
            <p class="auth-intro">Đăng nhập để kiểm tra tài khoản của bạn, hoặc tạo tài khoản mới trong vài giây.</p>

            <div class="auth-tabs" role="tablist" aria-label="Đăng nhập hoặc đăng ký">
              <button type="button" class="auth-tab is-active" data-auth-tab="login" role="tab" aria-selected="true">Đăng nhập</button>
              <button type="button" class="auth-tab" data-auth-tab="register" role="tab" aria-selected="false">Đăng ký</button>
            </div>

            <form class="auth-form" id="login-form">
              <label>Email hoặc số điện thoại
                <input name="phone_or_email" autocomplete="username" required maxlength="100">
              </label>
              <label>Mật khẩu
                <input name="password" type="password" autocomplete="current-password" required minlength="1">
              </label>
              <button type="submit" class="auth-primary">Đăng nhập</button>
            </form>

            <form class="auth-form" id="register-form" hidden>
              <label>Họ và tên
                <input name="name" autocomplete="name" required maxlength="100">
              </label>
              <label>Email hoặc số điện thoại
                <input name="phone_or_email" autocomplete="username" required maxlength="100">
              </label>
              <label>Mật khẩu
                <input name="password" type="password" autocomplete="new-password" required minlength="1">
              </label>
              <button type="submit" class="auth-primary">Tạo tài khoản</button>
            </form>
          </div>

          <div class="auth-member" id="auth-member" hidden>
            <span class="eyebrow">TÀI KHOẢN MỘC MIÊN</span>
            <h2>Xin chào, <span id="auth-user-name">bạn</span>.</h2>
            <p id="auth-user-contact" class="auth-intro"></p>
            <div class="auth-member-card">
              <span>Trạng thái</span>
              <strong>Đã đăng nhập</strong>
            </div>
            <button type="button" class="auth-secondary" id="logout-button">Đăng xuất</button>
          </div>

          <p class="auth-status" id="auth-status" role="status" aria-live="polite"></p>
        </section>
      </div>`;
  }

  function setStatus(message, kind = '') {
    const el = document.querySelector('#auth-status');
    if (!el) return;
    el.textContent = message || '';
    el.dataset.kind = kind;
  }

  function renderUser() {
    const guest = document.querySelector('#auth-guest');
    const member = document.querySelector('#auth-member');
    const label = document.querySelector('#account-label');
    const button = document.querySelector('#account-toggle');

    if (currentUser) {
      guest.hidden = true;
      member.hidden = false;
      document.querySelector('#auth-user-name').textContent = currentUser.name || 'bạn';
      document.querySelector('#auth-user-contact').textContent = currentUser.phone_or_email || '';
      if (label) label.textContent = currentUser.name || 'Tài khoản';
      if (button) button.setAttribute('aria-label', 'Tài khoản của ' + (currentUser.name || 'bạn'));
    } else {
      guest.hidden = false;
      member.hidden = true;
      if (label) label.textContent = 'Đăng nhập';
      if (button) button.setAttribute('aria-label', 'Đăng nhập hoặc đăng ký');
    }
  }

  function switchTab(tab) {
    const login = tab === 'login';
    document.querySelector('#login-form').hidden = !login;
    document.querySelector('#register-form').hidden = login;
    document.querySelectorAll('[data-auth-tab]').forEach(button => {
      const active = button.dataset.authTab === tab;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    setStatus('');
  }

  function openModal(tab = 'login') {
    const overlay = document.querySelector('#auth-overlay');
    if (!overlay) return;
    if (!currentUser) switchTab(tab);
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    const focusTarget = currentUser
      ? document.querySelector('#logout-button')
      : document.querySelector(tab === 'register' ? '#register-form input' : '#login-form input');
    setTimeout(() => focusTarget?.focus(), 0);
  }

  function closeModal() {
    const overlay = document.querySelector('#auth-overlay');
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    document.querySelector('#account-toggle')?.focus();
  }

  async function loadCurrentUser() {
    if (!token()) {
      currentUser = null;
      renderUser();
      return null;
    }
    try {
      currentUser = await request('/api/auth/me');
    } catch {
      setToken('');
      currentUser = null;
    }
    renderUser();
    return currentUser;
  }

  async function handleLogin(form) {
    const data = new FormData(form);
    setStatus('Đang đăng nhập…');
    const result = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        phone_or_email: trim(data.get('phone_or_email')),
        password: String(data.get('password') || ''),
      }),
    });
    setToken(result.access_token || '');
    currentUser = await request('/api/auth/me');
    renderUser();
    form.reset();
    setStatus('Đăng nhập thành công.', 'success');
  }

  async function handleRegister(form) {
    const data = new FormData(form);
    const credentials = {
      phone_or_email: trim(data.get('phone_or_email')),
      password: String(data.get('password') || ''),
    };
    setStatus('Đang tạo tài khoản…');
    await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: trim(data.get('name')),
        ...credentials,
      }),
    });
    const loginResult = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setToken(loginResult.access_token || '');
    currentUser = await request('/api/auth/me');
    renderUser();
    form.reset();
    setStatus('Tạo tài khoản và đăng nhập thành công.', 'success');
  }

  function init() {
    const accountButton = document.querySelector('#account-toggle');
    if (!accountButton || document.querySelector('#auth-overlay')) return;

    document.body.insertAdjacentHTML('beforeend', modalMarkup());

    accountButton.addEventListener('click', () => openModal());
    document.querySelector('#auth-close').addEventListener('click', closeModal);
    document.querySelector('#auth-overlay').addEventListener('click', event => {
      if (event.target.id === 'auth-overlay') closeModal();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !document.querySelector('#auth-overlay').hidden) closeModal();
    });

    document.querySelectorAll('[data-auth-tab]').forEach(button => {
      button.addEventListener('click', () => switchTab(button.dataset.authTab));
    });

    document.querySelector('#login-form').addEventListener('submit', async event => {
      event.preventDefault();
      const submit = event.currentTarget.querySelector('button[type="submit"]');
      submit.disabled = true;
      try { await handleLogin(event.currentTarget); }
      catch (error) { setStatus(error?.message || 'Không thể đăng nhập.', 'error'); }
      finally { submit.disabled = false; }
    });

    document.querySelector('#register-form').addEventListener('submit', async event => {
      event.preventDefault();
      const submit = event.currentTarget.querySelector('button[type="submit"]');
      submit.disabled = true;
      try { await handleRegister(event.currentTarget); }
      catch (error) { setStatus(error?.message || 'Không thể tạo tài khoản.', 'error'); }
      finally { submit.disabled = false; }
    });

    document.querySelector('#logout-button').addEventListener('click', () => {
      setToken('');
      currentUser = null;
      renderUser();
      switchTab('login');
      setStatus('Bạn đã đăng xuất.');
    });

    renderUser();
    loadCurrentUser();
  }

  window.MocMienAuth = Object.freeze({
    init,
    apiBaseUrl,
    token,
    loadCurrentUser,
  });
})();
