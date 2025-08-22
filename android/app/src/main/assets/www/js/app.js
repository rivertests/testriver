document.addEventListener('DOMContentLoaded', () => {
    // --- Traduções ---
    const translations = {
      'pt-br': {
        loginTitle: 'Acesse sua conta Titan',
        emailLabel: 'E-mail',
        passwordLabel: 'Senha',
        keepConnectedLabel: 'Manter conectado',
        loginButton: 'Entrar',
        showPasswordAria: 'Mostrar senha',
        hidePasswordAria: 'Ocultar senha',
        popupTitle: 'Falha na Conexão',
        popupMessage: 'Você não está conectado à internet. Por favor, conecte-se a uma rede e reinicie o aplicativo para acessar a IA Titan.',
        popupCloseButton: 'Entendi',
        createAccountLink: 'Crie sua conta'
      },
      'es-es': {
        loginTitle: 'Accede a tu cuenta Titan',
        emailLabel: 'Correo electrónico',
        passwordLabel: 'Contraseña',
        keepConnectedLabel: 'Mantener la sesión iniciada',
        loginButton: 'Entrar',
        showPasswordAria: 'Mostrar contraseña',
        hidePasswordAria: 'Ocultar contraseña',
        popupTitle: 'Fallo de Conexión',
        popupMessage: 'No estás conectado a internet. Por favor, conéctate a una red y reinicia la aplicación para acceder a la IA Titan.',
        popupCloseButton: 'Entendido',
        createAccountLink: 'Crea tu cuenta'
      },
      'en-us': {
        loginTitle: 'Access your Titan account',
        emailLabel: 'E-mail',
        passwordLabel: 'Password',
        keepConnectedLabel: 'Keep me logged in',
        loginButton: 'Login',
        showPasswordAria: 'Show password',
        hidePasswordAria: 'Hide password',
        popupTitle: 'Connection Failure',
        popupMessage: 'You are not connected to a network. Please connect and restart the app to access Titan AI.',
        popupCloseButton: 'Got it',
        createAccountLink: 'Create your account'
      }
    };
  
    // --- BOTÕES DE IDIOMA ---
    const localeButtons = document.querySelectorAll('.titan-locale__botao');
    let currentLang = 'pt-br';
  
    function setLanguage(lang) {
      currentLang = lang;
      document.documentElement.lang = lang.split('-')[0];
  
      document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
  
      localeButtons.forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('titan-locale__botao--ativo', isActive);
        btn.setAttribute('aria-checked', isActive);
      });
  
      const passwordButton = document.getElementById('password-mostrar-senha');
      const passwordInput = document.getElementById('password');
      if (passwordInput && passwordButton) {
        const isPasswordVisible = passwordInput.type === 'text';
        passwordButton.setAttribute('aria-label', isPasswordVisible ? translations[lang].hidePasswordAria : translations[lang].showPasswordAria);
      }
    }
  
    localeButtons.forEach(button => {
      button.addEventListener('click', () => {
        setLanguage(button.dataset.lang);
      });
    });
  
    // --- FORMULÁRIOS ---
    const formFields = document.querySelectorAll('.titan-campo__input');
    formFields.forEach(input => {
      const fieldContainer = input.parentElement;
  
      function updateFieldState() {
        if (input.value) {
          fieldContainer.classList.remove('titan-campo--vazio');
        } else {
          fieldContainer.classList.add('titan-campo--vazio');
        }
      }
  
      input.addEventListener('focus', () => {
        fieldContainer.classList.add('titan-campo--com-foco');
      });
      input.addEventListener('blur', () => {
        fieldContainer.classList.remove('titan-campo--com-foco');
      });
      input.addEventListener('input', updateFieldState);
      updateFieldState();
    });
  
    // --- TOGGLE SENHA ---
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('password-mostrar-senha');
    const passwordIconContainer = document.getElementById('password-icon-container');
  
    const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const eyeOffIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
  
    if (togglePasswordButton && passwordInput && passwordIconContainer) {
      togglePasswordButton.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordIconContainer.innerHTML = isPassword ? eyeOffIcon : eyeIcon;
        togglePasswordButton.setAttribute('aria-label', isPassword ? translations[currentLang].hidePasswordAria : translations[currentLang].showPasswordAria);
      });
    }
  
    // --- POPUP ---
    const loginForm = document.getElementById('login-form');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupCloseButton = document.getElementById('popup-close-button');
    const createAccountButton = document.getElementById('create-account-button');
  
    function openPopup() {
      if (popupOverlay) popupOverlay.classList.add('titan-popup-overlay--ativo');
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        openPopup();
      });
    }
  
    if (createAccountButton) {
      createAccountButton.addEventListener('click', openPopup);
    }
  
    if (popupCloseButton) {
      popupCloseButton.addEventListener('click', () => {
        if (popupOverlay) popupOverlay.classList.remove('titan-popup-overlay--ativo');
      });
    }
  
    if (popupOverlay) {
      popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
          popupOverlay.classList.remove('titan-popup-overlay--ativo');
        }
      });
    }
  
    // --- DEFINE IDIOMA PADRÃO ---
    setLanguage('pt-br');
  
    // --- ESCONDE SPLASH --- (Capacitor compatível)
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.SplashScreen) {
      window.Capacitor.Plugins.SplashScreen.hide();
    }
  });
  