import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const availableLanguages: Language[] = [
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const detectBrowserLanguage = (): string => {
  // Détecter la langue du navigateur
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  
  // Extraire le code de langue (ex: 'fr-FR' -> 'fr')
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Vérifier si cette langue est disponible
  const isAvailable = availableLanguages.some(lang => lang.code === langCode);
  
  // Retourner la langue détectée si disponible, sinon anglais
  return isAvailable ? langCode : 'en';
};

const translations = {
  fr: {
    // Navigation
    'nav.destinations': 'Destinations',
    'nav.inspiration': 'Inspiration',
    'nav.adventures': 'Aventures',
    'nav.about': 'À propos',
    'nav.login': 'Se connecter',
    'nav.signup': 'S\'inscrire',
    
    // Hero section
    'hero.adventure': 'L\'aventure',
    'hero.awaits': 'vous attend',
    'hero.description': 'Découvrez des destinations extraordinaires et créez des souvenirs inoubliables avec notre IA de voyage intelligente',
    'hero.travelers': '+50,000 voyageurs inspirés',
    'hero.destinations': '180+ destinations',
    'hero.plan': 'Planifier mon voyage',
    'hero.inspire': 'M\'inspirer',
    
    // Authentication
    'auth.login': 'Connexion',
    'auth.signup': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.forgotPassword': 'Mot de passe oublié ?',
    'auth.noAccount': 'Pas encore de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    'auth.signupHere': 'Inscrivez-vous ici',
    'auth.loginHere': 'Connectez-vous ici',
    'auth.welcome': 'Bienvenue',
    'auth.createAccount': 'Créer votre compte',

    // Plan Trip Steps
    'planTrip.previous': 'Précédent',
    'planTrip.next': 'Suivant',
    'planTrip.createTrip': 'Créer mon voyage',
    'planTrip.step': 'Étape',
    'planTrip.of': 'sur',

    // Features
    'features.aiIntuitive': 'IA Intuitive',
    'features.aiDescription': 'Notre intelligence artificielle comprend vos envies et crée des voyages parfaitement adaptés à votre personnalité',
    'features.secretDestinations': 'Destinations Secrètes',
    'features.secretDescription': 'Explorez des lieux magiques hors des sentiers battus, sélectionnés par nos experts locaux',
    'features.authenticExperiences': 'Expériences Authentiques',
    'features.authenticDescription': 'Vivez des moments uniques et créez des souvenirs qui dureront toute une vie',

    // Footer
    'footer.readyForAdventure': 'Prêt pour l\'aventure ?',
    'footer.joinTravelers': 'Rejoignez des milliers de voyageurs qui ont trouvé leur destination de rêve',
    'footer.terms': 'Conditions',
    'footer.privacy': 'Confidentialité',
    'footer.support': 'Support',
    'footer.copyright': '© 2024 TASARINI. Votre passeport vers l\'extraordinaire.'
  },
  en: {
    // Navigation
    'nav.destinations': 'Destinations',
    'nav.inspiration': 'Inspiration',
    'nav.adventures': 'Adventures',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.signup': 'Sign up',
    
    // Hero section
    'hero.adventure': 'Adventure',
    'hero.awaits': 'awaits you',
    'hero.description': 'Discover extraordinary destinations and create unforgettable memories with our intelligent travel AI',
    'hero.travelers': '+50,000 inspired travelers',
    'hero.destinations': '180+ destinations',
    'hero.plan': 'Plan my trip',
    'hero.inspire': 'Inspire me',
    
    // Authentication
    'auth.login': 'Login',
    'auth.signup': 'Sign up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.signupHere': 'Sign up here',
    'auth.loginHere': 'Login here',
    'auth.welcome': 'Welcome',
    'auth.createAccount': 'Create your account',

    // Plan Trip Steps
    'planTrip.previous': 'Previous',
    'planTrip.next': 'Next',
    'planTrip.createTrip': 'Create my trip',
    'planTrip.step': 'Step',
    'planTrip.of': 'of',

    // Features
    'features.aiIntuitive': 'Intuitive AI',
    'features.aiDescription': 'Our artificial intelligence understands your desires and creates trips perfectly adapted to your personality',
    'features.secretDestinations': 'Secret Destinations',
    'features.secretDescription': 'Explore magical places off the beaten path, selected by our local experts',
    'features.authenticExperiences': 'Authentic Experiences',
    'features.authenticDescription': 'Live unique moments and create memories that will last a lifetime',

    // Footer
    'footer.readyForAdventure': 'Ready for adventure?',
    'footer.joinTravelers': 'Join thousands of travelers who have found their dream destination',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.support': 'Support',
    'footer.copyright': '© 2024 TASARINI. Your passport to the extraordinary.'
  },
  es: {
    // Navigation
    'nav.destinations': 'Destinos',
    'nav.inspiration': 'Inspiración',
    'nav.adventures': 'Aventuras',
    'nav.about': 'Acerca de',
    'nav.login': 'Iniciar sesión',
    'nav.signup': 'Registrarse',
    
    // Hero section
    'hero.adventure': 'La aventura',
    'hero.awaits': 'te espera',
    'hero.description': 'Descubre destinos extraordinarios y crea recuerdos inolvidables con nuestra IA de viajes inteligente',
    'hero.travelers': '+50,000 viajeros inspirados',
    'hero.destinations': '180+ destinos',
    'hero.plan': 'Planificar mi viaje',
    'hero.inspire': 'Inspirarme',
    
    // Authentication
    'auth.login': 'Iniciar sesión',
    'auth.signup': 'Registrarse',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar contraseña',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes una cuenta?',
    'auth.hasAccount': '¿Ya tienes una cuenta?',
    'auth.signupHere': 'Regístrate aquí',
    'auth.loginHere': 'Inicia sesión aquí',
    'auth.welcome': 'Bienvenido',
    'auth.createAccount': 'Crear tu cuenta',

    // Plan Trip Steps
    'planTrip.previous': 'Anterior',
    'planTrip.next': 'Siguiente',
    'planTrip.createTrip': 'Crear mi viaje',
    'planTrip.step': 'Paso',
    'planTrip.of': 'de',

    // Features
    'features.aiIntuitive': 'IA Intuitiva',
    'features.aiDescription': 'Nuestra inteligencia artificial comprende tus deseos y crea viajes perfectamente adaptados a tu personalidad',
    'features.secretDestinations': 'Destinos Secretos',
    'features.secretDescription': 'Explora lugares mágicos fuera de los caminos trillados, seleccionados por nuestros expertos locales',
    'features.authenticExperiences': 'Experiencias Auténticas',
    'features.authenticDescription': 'Vive momentos únicos y crea recuerdos que durarán toda la vida',

    // Footer
    'footer.readyForAdventure': '¿Listo para la aventura?',
    'footer.joinTravelers': 'Únete a miles de viajeros que han encontrado su destino soñado',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.support': 'Soporte',
    'footer.copyright': '© 2024 TASARINI. Tu pasaporte a lo extraordinario.'
  },
  it: {
    // Navigation
    'nav.destinations': 'Destinazioni',
    'nav.inspiration': 'Ispirazione',
    'nav.adventures': 'Avventure',
    'nav.about': 'Chi siamo',
    'nav.login': 'Accedi',
    'nav.signup': 'Registrati',
    
    // Hero section
    'hero.adventure': 'L\'avventura',
    'hero.awaits': 'ti aspetta',
    'hero.description': 'Scopri destinazioni straordinarie e crea ricordi indimenticabili con la nostra IA di viaggio intelligente',
    'hero.travelers': '+50,000 viaggiatori ispirati',
    'hero.destinations': '180+ destinazioni',
    'hero.plan': 'Pianifica il mio viaggio',
    'hero.inspire': 'Ispirami',
    
    // Authentication
    'auth.login': 'Accedi',
    'auth.signup': 'Registrati',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Conferma password',
    'auth.forgotPassword': 'Password dimenticata?',
    'auth.noAccount': 'Non hai un account?',
    'auth.hasAccount': 'Hai già un account?',
    'auth.signupHere': 'Registrati qui',
    'auth.loginHere': 'Accedi qui',
    'auth.welcome': 'Benvenuto',
    'auth.createAccount': 'Crea il tuo account',

    // Plan Trip Steps
    'planTrip.previous': 'Precedente',
    'planTrip.next': 'Successivo',
    'planTrip.createTrip': 'Crea il mio viaggio',
    'planTrip.step': 'Passo',
    'planTrip.of': 'di',

    // Features
    'features.aiIntuitive': 'IA Intuitiva',
    'features.aiDescription': 'La nostra intelligenza artificiale comprende i tuoi desideri e crea viaggi perfettamente adattati alla tua personalità',
    'features.secretDestinations': 'Destinazioni Segrete',
    'features.secretDescription': 'Esplora luoghi mágicos fuori dai sentieri battuti, selezionati dai nostri esperti locali',
    'features.authenticExperiences': 'Esperienze Autentiche',
    'features.authenticDescription': 'Vivi momenti unici e crea ricordi che dureranno tutta la vita',

    // Footer
    'footer.readyForAdventure': 'Pronto per l\'avventura?',
    'footer.joinTravelers': 'Unisciti a migliaia di viaggiatori che hanno trovato la loro destinazione da sogno',
    'footer.terms': 'Termini',
    'footer.privacy': 'Privacy',
    'footer.support': 'Supporto',
    'footer.copyright': '© 2024 TASARINI. Il tuo passaporto verso lo straordinario.'
  },
  de: {
    // Navigation
    'nav.destinations': 'Reiseziele',
    'nav.inspiration': 'Inspiration',
    'nav.adventures': 'Abenteuer',
    'nav.about': 'Über uns',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',
    
    // Hero section
    'hero.adventure': 'Das Abenteuer',
    'hero.awaits': 'wartet auf dich',
    'hero.description': 'Entdecke außergewöhnliche Reiseziele und schaffe unvergessliche Erinnerungen mit unserer intelligenten Reise-KI',
    'hero.travelers': '+50,000 inspirierte Reisende',
    'hero.destinations': '180+ Reiseziele',
    'hero.plan': 'Meine Reise planen',
    'hero.inspire': 'Inspiriere mich',
    
    // Authentication
    'auth.login': 'Anmelden',
    'auth.signup': 'Registrieren',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.confirmPassword': 'Passwort bestätigen',
    'auth.forgotPassword': 'Passwort vergessen?',
    'auth.noAccount': 'Noch kein Konto?',
    'auth.hasAccount': 'Bereits ein Konto?',
    'auth.signupHere': 'Hier registrieren',
    'auth.loginHere': 'Hier anmelden',
    'auth.welcome': 'Willkommen',
    'auth.createAccount': 'Konto erstellen',

    // Plan Trip Steps
    'planTrip.previous': 'Zurück',
    'planTrip.next': 'Weiter',
    'planTrip.createTrip': 'Meine Reise erstellen',
    'planTrip.step': 'Schritt',
    'planTrip.of': 'von',

    // Features
    'features.aiIntuitive': 'Intuitive KI',
    'features.aiDescription': 'Unsere künstliche Intelligenz versteht deine Wünsche und erstellt Reisen, die perfekt zu deiner Persönlichkeit passen',
    'features.secretDestinations': 'Geheime Reiseziele',
    'features.secretDescription': 'Erkunde magische Orte abseits der ausgetretenen Pfade, ausgewählt von unseren lokalen Experten',
    'features.authenticExperiences': 'Authentische Erlebnisse',
    'features.authenticDescription': 'Erlebe einzigartige Momente und schaffe Erinnerungen, die ein Leben lang halten',

    // Footer
    'footer.readyForAdventure': 'Bereit für das Abenteuer?',
    'footer.joinTravelers': 'Schließe dich Tausenden von Reisenden an, die ihr Traumziel gefunden haben',
    'footer.terms': 'Bedingungen',
    'footer.privacy': 'Datenschutz',
    'footer.support': 'Support',
    'footer.copyright': '© 2024 TASARINI. Dein Reisepass ins Außergewöhnliche.'
  },
  pt: {
    // Navigation
    'nav.destinations': 'Destinos',
    'nav.inspiration': 'Inspiração',
    'nav.adventures': 'Aventuras',
    'nav.about': 'Sobre',
    'nav.login': 'Entrar',
    'nav.signup': 'Cadastrar',
    
    // Hero section
    'hero.adventure': 'A aventura',
    'hero.awaits': 'te espera',
    'hero.description': 'Descubra destinos extraordinários e crie memórias inesquecíveis com nossa IA de viagem inteligente',
    'hero.travelers': '+50,000 viajantes inspirados',
    'hero.destinations': '180+ destinos',
    'hero.plan': 'Planejar minha viagem',
    'hero.inspire': 'Me inspirar',
    
    // Authentication
    'auth.login': 'Entrar',
    'auth.signup': 'Cadastrar',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.confirmPassword': 'Confirmar senha',
    'auth.forgotPassword': 'Esqueceu a senha?',
    'auth.noAccount': 'Não tem uma conta?',
    'auth.hasAccount': 'Já tem uma conta?',
    'auth.signupHere': 'Cadastre-se aqui',
    'auth.loginHere': 'Entre aqui',
    'auth.welcome': 'Bem-vindo',
    'auth.createAccount': 'Criar sua conta',

    // Plan Trip Steps
    'planTrip.previous': 'Anterior',
    'planTrip.next': 'Próximo',
    'planTrip.createTrip': 'Criar minha viagem',
    'planTrip.step': 'Passo',
    'planTrip.of': 'de',

    // Features
    'features.aiIntuitive': 'IA Intuitiva',
    'features.aiDescription': 'Nossa inteligência artificial compreende seus desejos e cria viagens perfeitamente adaptadas à sua personalidade',
    'features.secretDestinations': 'Destinos Secretos',
    'features.secretDescription': 'Explore lugares mágicos fora dos caminhos tradicionais, selecionados por nossos especialistas locais',
    'features.authenticExperiences': 'Experiências Autênticas',
    'features.authenticDescription': 'Viva momentos únicos e crie memórias que durarão toda a vida',

    // Footer
    'footer.readyForAdventure': 'Pronto para a aventura?',
    'footer.joinTravelers': 'Junte-se a milhares de viajantes que encontraram seu destino dos sonhos',
    'footer.terms': 'Termos',
    'footer.privacy': 'Privacidade',
    'footer.support': 'Suporte',
    'footer.copyright': '© 2024 TASARINI. Seu passaporte para o extraordinário.'
  },
  ru: {
    // Navigation
    'nav.destinations': 'Направления',
    'nav.inspiration': 'Вдохновение',
    'nav.adventures': 'Приключения',
    'nav.about': 'О нас',
    'nav.login': 'Войти',
    'nav.signup': 'Регистрация',
    
    // Hero section
    'hero.adventure': 'Приключение',
    'hero.awaits': 'ждет вас',
    'hero.description': 'Откройте для себя необыкновенные места и создайте незабываемые воспоминания с нашим умным ИИ для путешествий',
    'hero.travelers': '+50,000 вдохновленных путешественников',
    'hero.destinations': '180+ направлений',
    'hero.plan': 'Спланировать мое путешествие',
    'hero.inspire': 'Вдохновить меня',
    
    // Authentication
    'auth.login': 'Войти',
    'auth.signup': 'Регистрация',
    'auth.email': 'Электронная почта',
    'auth.password': 'Пароль',
    'auth.confirmPassword': 'Подтвердить пароль',
    'auth.forgotPassword': 'Забыли пароль?',
    'auth.noAccount': 'Нет аккаунта?',
    'auth.hasAccount': 'Уже есть аккаунт?',
    'auth.signupHere': 'Зарегистрируйтесь здесь',
    'auth.loginHere': 'Войдите здесь',
    'auth.welcome': 'Добро пожаловать',
    'auth.createAccount': 'Создать ваш аккаунт',

    // Plan Trip Steps
    'planTrip.previous': 'Назад',
    'planTrip.next': 'Далее',
    'planTrip.createTrip': 'Создать мое путешествие',
    'planTrip.step': 'Шаг',
    'planTrip.of': 'из',

    // Features
    'features.aiIntuitive': 'Интуитивный ИИ',
    'features.aiDescription': 'Наш искусственный интеллект понимает ваши желания и создает путешествия, идеально подходящие вашей личности',
    'features.secretDestinations': 'Секретные направления',
    'features.secretDescription': 'Исследуйте волшебные места вдали от проторенных дорог, отобранные нашими местными экспертами',
    'features.authenticExperiences': 'Подлинные впечатления',
    'features.authenticDescription': 'Переживите уникальные моменты и создайте воспоминания на всю жизнь',

    // Footer
    'footer.readyForAdventure': 'Готовы к приключению?',
    'footer.joinTravelers': 'Присоединяйтесь к тысячам путешественников, которые нашли место своей мечты',
    'footer.terms': 'Условия',
    'footer.privacy': 'Конфиденциальность',
    'footer.support': 'Поддержка',
    'footer.copyright': '© 2024 TASARINI. Ваш паспорт в необыкновенное.'
  },
  ja: {
    // Navigation
    'nav.destinations': '目的地',
    'nav.inspiration': 'インスピレーション',
    'nav.adventures': '冒険',
    'nav.about': '私たちについて',
    'nav.login': 'ログイン',
    'nav.signup': 'サインアップ',
    
    // Hero section
    'hero.adventure': '冒険が',
    'hero.awaits': 'あなたを待っています',
    'hero.description': '私たちのインテリジェントな旅行AIで、特別な目的地を発見し、忘れられない思い出を作りましょう',
    'hero.travelers': '+50,000人のインスパイアされた旅行者',
    'hero.destinations': '180以上の目的地',
    'hero.plan': '私の旅を計画する',
    'hero.inspire': 'インスピレーションを得る',
    
    // Authentication
    'auth.login': 'ログイン',
    'auth.signup': 'サインアップ',
    'auth.email': 'メール',
    'auth.password': 'パスワード',
    'auth.confirmPassword': 'パスワードを確認',
    'auth.forgotPassword': 'パスワードをお忘れですか？',
    'auth.noAccount': 'アカウントをお持ちでありませんか？',
    'auth.hasAccount': 'すでにアカウントをお持ちですか？',
    'auth.signupHere': 'こちらでサインアップ',
    'auth.loginHere': 'こちらでログイン',
    'auth.welcome': 'ようこそ',
    'auth.createAccount': 'アカウントを作成',

    // Plan Trip Steps
    'planTrip.previous': '前へ',
    'planTrip.next': '次へ',
    'planTrip.createTrip': '私の旅を作成',
    'planTrip.step': 'ステップ',
    'planTrip.of': '/',

    // Features
    'features.aiIntuitive': '直感的AI',
    'features.aiDescription': '私たちの人工知能があなたの願いを理解し、あなたの個性に完璧に適応した旅を作成します',
    'features.secretDestinations': '秘密の目的地',
    'features.secretDescription': '地元の専門家によって選ばれた、人里離れた魔法の場所を探索してください',
    'features.authenticExperiences': '本格的な体験',
    'features.authenticDescription': 'ユニークな瞬間を生き、一生続く思い出を作りましょう',

    // Footer
    'footer.readyForAdventure': '冒険の準備はできましたか？',
    'footer.joinTravelers': '夢の目的地を見つけた何千人もの旅行者に参加しましょう',
    'footer.terms': '利用規約',
    'footer.privacy': 'プライバシー',
    'footer.support': 'サポート',
    'footer.copyright': '© 2024 TASARINI. 特別への旅路。'
  },
  ko: {
    // Navigation
    'nav.destinations': '목적지',
    'nav.inspiration': '영감',
    'nav.adventures': '모험',
    'nav.about': '소개',
    'nav.login': '로그인',
    'nav.signup': '회원가입',
    
    // Hero section
    'hero.adventure': '모험이',
    'hero.awaits': '당신을 기다립니다',
    'hero.description': '우리의 지능형 여행 AI로 특별한 목적지를 발견하고 잊을 수 없는 추억을 만드세요',
    'hero.travelers': '+50,000명의 영감받은 여행자',
    'hero.destinations': '180개 이상의 목적지',
    'hero.plan': '내 여행 계획하기',
    'hero.inspire': '영감 받기',
    
    // Authentication
    'auth.login': '로그인',
    'auth.signup': '회원가입',
    'auth.email': '이메일',
    'auth.password': '비밀번호',
    'auth.confirmPassword': '비밀번호 확인',
    'auth.forgotPassword': '비밀번호를 잊으셨나요?',
    'auth.noAccount': '계정이 없으신가요?',
    'auth.hasAccount': '이미 계정이 있으신가요?',
    'auth.signupHere': '여기서 회원가입',
    'auth.loginHere': '여기서 로그인',
    'auth.welcome': '환영합니다',
    'auth.createAccount': '계정 만들기',

    // Plan Trip Steps
    'planTrip.previous': '이전',
    'planTrip.next': '다음',
    'planTrip.createTrip': '내 여행 만들기',
    'planTrip.step': '단계',
    'planTrip.of': '/',

    // Features
    'features.aiIntuitive': '직관적인 AI',
    'features.aiDescription': '우리의 인공지능이 당신의 욕구를 이해하고 당신의 개성에 완벽하게 맞는 여행을 만듭니다',
    'features.secretDestinations': '비밀 목적지',
    'features.secretDescription': '현지 전문가들이 선별한 숨겨진 마법 같은 장소들을 탐험해보세요',
    'features.authenticExperiences': '진정한 경험',
    'features.authenticDescription': '독특한 순간을 살고 평생 지속될 추억을 만드세요',

    // Footer
    'footer.readyForAdventure': '모험을 위한 준비가 되셨나요?',
    'footer.joinTravelers': '꿈의 목적지를 찾은 수천 명의 여행자들과 함께하세요',
    'footer.terms': '약관',
    'footer.privacy': '개인정보보호',
    'footer.support': '지원',
    'footer.copyright': '© 2024 TASARINI. 특별함으로의 여권.'
  },
  zh: {
    // Navigation
    'nav.destinations': '目的地',
    'nav.inspiration': '灵感',
    'nav.adventures': '冒险',
    'nav.about': '关于我们',
    'nav.login': '登录',
    'nav.signup': '注册',
    
    // Hero section
    'hero.adventure': '冒险',
    'hero.awaits': '等待着您',
    'hero.description': '用我们的智能旅行AI发现非凡的目的地，创造难忘的回忆',
    'hero.travelers': '+50,000名受启发的旅行者',
    'hero.destinations': '180+个目的地',
    'hero.plan': '规划我的旅行',
    'hero.inspire': '启发我',
    
    // Authentication
    'auth.login': '登录',
    'auth.signup': '注册',
    'auth.email': '邮箱',
    'auth.password': '密码',
    'auth.confirmPassword': '确认密码',
    'auth.forgotPassword': '忘记密码？',
    'auth.noAccount': '还没有账户？',
    'auth.hasAccount': '已有账户？',
    'auth.signupHere': '在此注册',
    'auth.loginHere': '在此登录',
    'auth.welcome': '欢迎',
    'auth.createAccount': '创建您的账户',

    // Plan Trip Steps
    'planTrip.previous': '上一步',
    'planTrip.next': '下一步',
    'planTrip.createTrip': '创建我的旅行',
    'planTrip.step': '步骤',
    'planTrip.of': '/',

    // Features
    'features.aiIntuitive': '直观AI',
    'features.aiDescription': '我们的人工智能理解您的愿望，创造完全适合您个性的旅行',
    'features.secretDestinations': '秘密目的地',
    'features.secretDescription': '探索由我们当地专家精选的偏僻神奇之地',
    'features.authenticExperiences': '真实体验',
    'features.authenticDescription': '体验独特时刻，创造持续终生的回忆',

    // Footer
    'footer.readyForAdventure': '准备好冒险了吗？',
    'footer.joinTravelers': '加入数千名找到梦想目的地的旅行者',
    'footer.terms': '条款',
    'footer.privacy': '隐私',
    'footer.support': '支持',
    'footer.copyright': '© 2024 TASARINI. 您通往非凡的护照。'
  },
  ar: {
    // Navigation
    'nav.destinations': 'الوجهات',
    'nav.inspiration': 'الإلهام',
    'nav.adventures': 'المغامرات',
    'nav.about': 'عنا',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'التسجيل',
    
    // Hero section
    'hero.adventure': 'المغامرة',
    'hero.awaits': 'تنتظرك',
    'hero.description': 'اكتشف وجهات استثنائية واصنع ذكريات لا تُنسى مع ذكائنا الاصطناعي الذكي للسفر',
    'hero.travelers': '+50,000 مسافر ملهم',
    'hero.destinations': '180+ وجهة',
    'hero.plan': 'خطط لرحلتي',
    'hero.inspire': 'ألهمني',
    
    // Authentication
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'التسجيل',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'auth.signupHere': 'سجل هنا',
    'auth.loginHere': 'سجل دخولك هنا',
    'auth.welcome': 'مرحباً',
    'auth.createAccount': 'إنشاء حسابك',

    // Plan Trip Steps
    'planTrip.previous': 'السابق',
    'planTrip.next': 'التالي',
    'planTrip.createTrip': 'إنشاء رحلتي',
    'planTrip.step': 'الخطوة',
    'planTrip.of': 'من',

    // Features
    'features.aiIntuitive': 'ذكاء اصطناعي بديهي',
    'features.aiDescription': 'يفهم ذكاؤنا الاصطناعي رغباتك وينشئ رحلات مُتكيفة تماماً مع شخصيتك',
    'features.secretDestinations': 'وجهات سرية',
    'features.secretDescription': 'استكشف أماكن سحرية بعيدة عن المسارات المطروقة، مُختارة من قبل خبرائنا المحليين',
    'features.authenticExperiences': 'تجارب أصيلة',
    'features.authenticDescription': 'عش لحظات فريدة واصنع ذكريات ستدوم مدى الحياة',

    // Footer
    'footer.readyForAdventure': 'مستعد للمغامرة؟',
    'footer.joinTravelers': 'انضم إلى آلاف المسافرين الذين وجدوا وجهة أحلامهم',
    'footer.terms': 'الشروط',
    'footer.privacy': 'الخصوصية',
    'footer.support': 'الدعم',
    'footer.copyright': '© 2024 TASARINI. جواز سفرك إلى الاستثنائي.'
  },
  hi: {
    // Navigation
    'nav.destinations': 'गंतव्य',
    'nav.inspiration': 'प्रेरणा',
    'nav.adventures': 'रोमांच',
    'nav.about': 'हमारे बारे में',
    'nav.login': 'लॉग इन',
    'nav.signup': 'साइन अप',
    
    // Hero section
    'hero.adventure': 'रोमांच',
    'hero.awaits': 'आपका इंतजार कर रहा है',
    'hero.description': 'हमारी बुद्धिमान यात्रा AI के साथ असाधारण गंतव्यों की खोज करें और अविस्मरणीय यादें बनाएं',
    'hero.travelers': '+50,000 प्रेरित यात्री',
    'hero.destinations': '180+ गंतव्य',
    'hero.plan': 'मेरी यात्रा की योजना बनाएं',
    'hero.inspire': 'मुझे प्रेरित करें',
    
    // Authentication
    'auth.login': 'लॉग इन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.hasAccount': 'पहले से खाता है?',
    'auth.signupHere': 'यहाँ साइन अप करें',
    'auth.loginHere': 'यहाँ लॉग इन करें',
    'auth.welcome': 'स्वागत है',
    'auth.createAccount': 'अपना खाता बनाएं',

    // Plan Trip Steps
    'planTrip.previous': 'पिछला',
    'planTrip.next': 'अगला',
    'planTrip.createTrip': 'मेरी यात्रा बनाएं',
    'planTrip.step': 'चरण',
    'planTrip.of': 'का',

    // Features
    'features.aiIntuitive': 'सहज AI',
    'features.aiDescription': 'हमारी कृत्रिम बुद्धिमत्ता आपकी इच्छाओं को समझती है और आपके व्यक्तित्व के अनुकूल यात्राएं बनाती है',
    'features.secretDestinations': 'गुप्त गंतव्य',
    'features.secretDescription': 'हमारे स्थानीय विशेषज्ञों द्वारा चुने गए, पारंपरिक रास्तों से हटकर जादुई स्थानों का अन्वेषण करें',
    'features.authenticExperiences': 'प्रामाणिक अनुभव',
    'features.authenticDescription': 'अनोखे पलों को जिएं और जीवन भर चलने वाली यादें बनाएं',

    // Footer
    'footer.readyForAdventure': 'रोमांच के लिए तैयार हैं?',
    'footer.joinTravelers': 'हजारों यात्रियों से जुड़ें जिन्होंने अपने सपनों का गंतव्य पाया है',
    'footer.terms': 'नियम',
    'footer.privacy': 'गोपनीयता',
    'footer.support': 'सहायता',
    'footer.copyright': '© 2024 TASARINI. असाधारण की ओर अपना पासपोर्ट।'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Détecter et définir la langue au démarrage
    const detectedLanguage = detectBrowserLanguage();
    setLanguage(detectedLanguage);
  }, []);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
