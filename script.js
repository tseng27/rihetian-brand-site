const products = {
  rice: { number: '01 / 03', kicker: '日常主食', title: '台灣良質米', description: '粒粒飽滿、口感清爽，適合成為每天餐桌上的安心主角。實際產地與米種，請依購買商品包裝標示為準。', note: '建議情境：一家人的日常晚餐' },
  tea: { number: '02 / 03', kicker: '慢慢品味', title: '台灣高山茶', description: '以清香與回甘陪你把步調放慢，適合在午後或需要專注時，享受一段簡單的茶時光。', note: '建議情境：午後的一人茶席' },
  fruit: { number: '03 / 03', kicker: '自然零嘴', title: '台灣天然果乾', description: '保留水果本身的色澤與酸甜印象，放進包包就能帶著走，分享也剛剛好。實際成分請依商品包裝標示為準。', note: '建議情境：出門補充一點活力' }
};

const tabs = document.querySelectorAll('.product-tab');
const productNumber = document.querySelector('.product-number');
const productKicker = document.querySelector('#product-kicker');
const productTitle = document.querySelector('#product-title');
const productDescription = document.querySelector('#product-description');
const productNote = document.querySelector('#product-note');

tabs.forEach((tab) => tab.addEventListener('click', () => {
  const product = products[tab.dataset.product];
  tabs.forEach((item) => { item.classList.remove('is-active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('is-active');
  tab.setAttribute('aria-selected', 'true');
  productNumber.textContent = product.number;
  productKicker.textContent = product.kicker;
  productTitle.textContent = product.title;
  productDescription.textContent = product.description;
  productNote.textContent = product.note;
}));

const quizCopy = {
  rice: '你的今日推薦：台灣良質米。把一碗熱飯端上桌，讓忙碌的一天回到最安心的地方。',
  tea: '你的今日推薦：台灣高山茶。找一個舒服的位置，給自己一段慢慢回甘的時間。',
  fruit: '你的今日推薦：台灣天然果乾。帶著自然的酸甜出發，今天也有輕盈的好活力。'
};
const quizOptions = document.querySelector('#quiz-options');
const quizResult = document.querySelector('#quiz-result');
const quizReset = document.querySelector('#quiz-reset');
quizOptions.addEventListener('click', (event) => {
  if (!event.target.matches('button')) return;
  quizResult.hidden = false;
  quizResult.textContent = quizCopy[event.target.dataset.answer];
  quizOptions.hidden = true;
  quizReset.hidden = false;
});
quizReset.addEventListener('click', () => { quizOptions.hidden = false; quizResult.hidden = true; quizReset.hidden = true; });

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menuToggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

const mascotTalk = document.querySelector('#mascot-talk');
const mascotMessage = document.querySelector('#mascot-message');
const mascotMessages = ['今天也要吃得剛剛好！', '小禾喜歡陽光，也喜歡被你認識。', '選一份好田味，支持友善土地。'];
let mascotMessageIndex = 0;
mascotTalk.addEventListener('click', () => { mascotMessage.textContent = mascotMessages[mascotMessageIndex % mascotMessages.length]; mascotMessageIndex += 1; mascotMessage.hidden = false; });

const impactCopy = {
  land: { title: '讓土地慢慢恢復元氣', text: '從減少不必要的包裝開始，讓每一次選擇都更靠近友善環境。', icon: '◒' },
  farmers: { title: '讓農人的用心被看見', text: '把產地故事說清楚，讓每一份支持都能回到生產者身上。', icon: '⌁' },
  daily: { title: '讓健康成為日常習慣', text: '不需要複雜的口號，從一份自然、安心的食物開始就很好。', icon: '♡' }
};
const impactPanel = document.querySelector('#impact-panel');
document.querySelectorAll('.impact-tab').forEach((tab) => tab.addEventListener('click', () => {
  const item = impactCopy[tab.dataset.impact];
  document.querySelectorAll('.impact-tab').forEach((button) => { button.classList.remove('is-active'); button.setAttribute('aria-selected', 'false'); });
  tab.classList.add('is-active'); tab.setAttribute('aria-selected', 'true');
  impactPanel.innerHTML = `<span class="impact-icon">${item.icon}</span><div><h3>${item.title}</h3><p>${item.text}</p></div>`;
}));

const revealItems = document.querySelectorAll('main > section');
revealItems.forEach((item) => item.classList.add('reveal-ready'));
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 }); revealItems.forEach((item) => observer.observe(item)); } else { revealItems.forEach((item) => item.classList.add('is-visible')); }

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
  heroVisual.addEventListener('pointermove', (event) => { const rect = heroVisual.getBoundingClientRect(); const x = ((event.clientX - rect.left) / rect.width - .5) * 10; const y = ((event.clientY - rect.top) / rect.height - .5) * 8; heroVisual.style.setProperty('--parallax-x', `${x}px`); heroVisual.style.setProperty('--parallax-y', `${y}px`); heroVisual.style.setProperty('--mascot-x', `${x * -0.6}px`); heroVisual.style.setProperty('--mascot-y', `${y * -0.6}px`); });
  heroVisual.addEventListener('pointerleave', () => { heroVisual.style.setProperty('--parallax-x', '0px'); heroVisual.style.setProperty('--parallax-y', '0px'); heroVisual.style.setProperty('--mascot-x', '0px'); heroVisual.style.setProperty('--mascot-y', '0px'); });
}

