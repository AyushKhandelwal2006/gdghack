/* ─────────────────────────────────────────
   LIFE CHOICES — THE BIAS ENGINE
   script.js — All game logic
───────────────────────────────────────── */

/* ─── THEME DEFINITIONS ─── */
const THEMES = {
  default:         { bg:'radial-gradient(ellipse 80% 60% at 20% 30%, #1a0533 0%, #0a0a12 60%), radial-gradient(ellipse 60% 80% at 80% 70%, #0a1a33 0%, transparent 70%)', orb1:'#6a0dad', orb2:'#0a3d8f', orb3:'#4a0080', particles:'#a78bfa', badge:'🌌 Your Universe Awaits', dot:'#a78bfa' },
  privileged:      { bg:'radial-gradient(ellipse 80% 70% at 10% 20%, #0d2518 0%, #060e0a 60%), radial-gradient(ellipse 70% 60% at 90% 80%, #1a3a1a 0%, transparent 70%)', orb1:'#1a6b2a', orb2:'#0d4020', orb3:'#2d8f50', particles:'#4ade80', badge:'🏛️ Privileged Path', dot:'#4ade80' },
  middle:          { bg:'radial-gradient(ellipse 80% 70% at 15% 25%, #0d1f3a 0%, #080c14 60%), radial-gradient(ellipse 70% 60% at 85% 75%, #1a2a4a 0%, transparent 70%)', orb1:'#0d3a8f', orb2:'#1a2a6b', orb3:'#0a4a8f', particles:'#60a5fa', badge:'🏘️ Middle Path', dot:'#60a5fa' },
  underprivileged: { bg:'radial-gradient(ellipse 80% 70% at 20% 30%, #2a0808 0%, #0e0808 60%), radial-gradient(ellipse 70% 60% at 80% 70%, #1a0a0a 0%, transparent 70%)', orb1:'#8f1a0d', orb2:'#5a0d0d', orb3:'#3d0d0d', particles:'#f87171', badge:'🏚️ Underdog Rising', dot:'#f87171' },
  excel:           { bg:'radial-gradient(ellipse 80% 70% at 10% 10%, #0a2a1a 0%, #060e0a 65%), radial-gradient(ellipse 60% 80% at 90% 90%, #1a3f1a 0%, transparent 70%)', orb1:'#0d6b2a', orb2:'#1a8f40', orb3:'#0a4a20', particles:'#4ade80', badge:'📚 Scholar Aura', dot:'#4ade80' },
  balanced:        { bg:'radial-gradient(ellipse 80% 70% at 15% 20%, #0a1a3a 0%, #080b14 65%), radial-gradient(ellipse 70% 60% at 85% 80%, #0d2a4a 0%, transparent 70%)', orb1:'#0d3a8f', orb2:'#1a4a7a', orb3:'#0a2a5f', particles:'#60a5fa', badge:'⚖️ Balanced Aura', dot:'#60a5fa' },
  struggle:        { bg:'radial-gradient(ellipse 80% 70% at 20% 30%, #1f0a0a 0%, #0e0808 65%), radial-gradient(ellipse 70% 60% at 80% 70%, #2a0d0d 0%, transparent 70%)', orb1:'#8f2a0d', orb2:'#6b1a0d', orb3:'#4a0d0d', particles:'#fb923c', badge:'💪 Fighter\'s Grit', dot:'#fb923c' },
  top_college:     { bg:'radial-gradient(ellipse 80% 70% at 5% 10%, #1a1200 0%, #0d0c06 65%), radial-gradient(ellipse 70% 60% at 95% 90%, #2a2000 0%, transparent 70%)', orb1:'#8f7a0d', orb2:'#6b5a0d', orb3:'#4a3d0d', particles:'#facc15', badge:'🏛️ Elite Scholar', dot:'#facc15' },
  vocational:      { bg:'radial-gradient(ellipse 80% 70% at 10% 20%, #0a1a2a 0%, #060c12 65%)', orb1:'#0d4a6b', orb2:'#0a3a5a', orb3:'#0d2a4a', particles:'#38bdf8', badge:'🔧 Skills First', dot:'#38bdf8' },
  work_early:      { bg:'radial-gradient(ellipse 80% 70% at 20% 30%, #1a0a0a 0%, #0e0808 65%)', orb1:'#8f4a0d', orb2:'#6b3a0d', orb3:'#4a2a0d', particles:'#fb923c', badge:'💼 Street Smart', dot:'#fb923c' },
  corporate:       { bg:'radial-gradient(ellipse 80% 70% at 5% 5%, #050f1a 0%, #040810 65%)', orb1:'#0d2a4a', orb2:'#0a1f3a', orb3:'#0d1a30', particles:'#7dd3fc', badge:'🏢 Corporate Aura', dot:'#7dd3fc' },
  startup:         { bg:'radial-gradient(ellipse 80% 70% at 10% 15%, #1a0a2a 0%, #0c080f 65%)', orb1:'#6b0d8f', orb2:'#4a0d6b', orb3:'#3a0d5a', particles:'#c084fc', badge:'🚀 Startup Energy', dot:'#c084fc' },
  govt:            { bg:'radial-gradient(ellipse 80% 70% at 10% 10%, #0f0f1a 0%, #08080e 65%)', orb1:'#1a1a6b', orb2:'#0d0d4a', orb3:'#1a1a5a', particles:'#818cf8', badge:'🏛️ Public Servant', dot:'#818cf8' },
  freelance:       { bg:'radial-gradient(ellipse 80% 70% at 20% 20%, #0a1f0a 0%, #060c06 65%)', orb1:'#0d6b2a', orb2:'#0a4a20', orb3:'#0d5a25', particles:'#34d399', badge:'💻 Free Spirit', dot:'#34d399' },
  business:        { bg:'radial-gradient(ellipse 80% 70% at 5% 5%, #1a1000 0%, #0d0a00 65%)', orb1:'#8f6b0d', orb2:'#6b4a0d', orb3:'#4a3a0d', particles:'#fbbf24', badge:'🏗️ Builder Mode', dot:'#fbbf24' },
  family:          { bg:'radial-gradient(ellipse 80% 70% at 15% 15%, #1a0a1a 0%, #0c080c 65%)', orb1:'#8f0d6b', orb2:'#6b0d4a', orb3:'#5a0d3a', particles:'#f0abfc', badge:'❤️ Family First', dot:'#f0abfc' },
  opportunity:     { bg:'radial-gradient(ellipse 80% 70% at 10% 10%, #1a1500 0%, #0d0c00 65%)', orb1:'#8f8b0d', orb2:'#6b670d', orb3:'#5a560d', particles:'#fde68a', badge:'🌟 Destiny Unlocked', dot:'#fde68a' },
  crisis:          { bg:'radial-gradient(ellipse 80% 70% at 30% 30%, #1a0808 0%, #0e0606 65%)', orb1:'#8f0d0d', orb2:'#6b0d0d', orb3:'#4a0d0d', particles:'#fca5a5', badge:'🌊 Weathering Storm', dot:'#fca5a5' }
};

/* ─── PARTICLE ENGINE ─── */
const canvas = document.getElementById('particles');
const ctx2 = canvas.getContext('2d');
let particles = [], particleColor = '#a78bfa';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function hexToRgb(h) {
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.6 + 0.1),
      o: Math.random() * 0.6 + 0.1,
      life: Math.random()
    });
  }
}
initParticles();

(function animP() {
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  const rgb = hexToRgb(particleColor);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.life -= 0.002;
    if (p.life <= 0 || p.y < -10) {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + 10;
      p.life = Math.random() * 0.8 + 0.2;
    }
    ctx2.beginPath();
    ctx2.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx2.fillStyle = `rgba(${rgb},${p.o * p.life})`;
    ctx2.fill();
  });
  requestAnimationFrame(animP);
})();

/* ─── THEME APPLIER ─── */
function applyTheme(key) {
  const t = THEMES[key] || THEMES.default;
  document.getElementById('bg').style.background = t.bg;
  document.getElementById('orb1').style.background = t.orb1;
  document.getElementById('orb2').style.background = t.orb2;
  document.getElementById('orb3').style.background = t.orb3;
  particleColor = t.particles;
  document.getElementById('tbdot').style.background = t.dot;
  document.getElementById('tbtext').textContent = t.badge;
}
applyTheme('default');

/* ─── GAME STATE ─── */
let gameMode = 'single'; // 'single' | 'dual'
let activeChar = 'a';    // 'a' | 'b'
let chars = {
  a: { state: {}, trail: [], history: [] },
  b: { state: {}, trail: [], history: [] }
};

/* ─── TRAIL LABELS ─── */
const TRAIL_LABELS = {
  background:    { privileged:'🏠 Privileged', middle:'🏘️ Middle Class', underprivileged:'🏚️ Underdog' },
  school:        { excel:'📚 Top Student', balanced:'⚖️ Balanced', struggle:'💪 Fighter' },
  extra:         { sports:'⚽ Sports', arts:'🎨 Arts', study:'📖 Scholar', work:'💰 Hustler' },
  college:       { top:'🏛️ Top College', regular:'🎓 College', vocational:'🔧 Skilled', work_early:'💼 Worked Early' },
  career_start:  { corporate:'🏢 Corporate', startup:'🚀 Startup', govt:'🏛️ Govt', freelance:'💻 Freelance' },
  career_growth: { climb:'📈 Climber', stable:'⚖️ Balanced', pivot:'🔄 Pivoted', business:'🏗️ Entrepreneur' },
  relationship:  { partner:'💑 Partner', single:'🧘 Solo', family_focus:'👨‍👩‍👧 Family' },
  personal:      { travel:'✈️ Explorer', health:'🏋️ Healthy', community:'🤝 Giver', creative:'🎭 Creative' },
  event:         { crisis:'🌊 Survived', opportunity:'🌟 Seized', loss:'🕊️ Overcame', move:'🗺️ Relocated' }
};

/* ─── MODE SWITCH ─── */
function setMode(m) {
  gameMode = m;
  document.getElementById('btn-single').classList.toggle('active', m === 'single');
  document.getElementById('btn-dual').classList.toggle('active', m === 'dual');
  document.getElementById('char-tabs').style.display = m === 'dual' ? 'flex' : 'none';
  chars = { a:{state:{},trail:[],history:[]}, b:{state:{},trail:[],history:[]} };
  activeChar = 'a';
  restart();
}

/* ─── PROGRESS BAR ─── */
function setProgress(n) {
  for (let i = 0; i < 7; i++) {
    document.getElementById('p' + i).classList.toggle('done', i < n);
  }
}

/* ─── TRAIL RENDER ─── */
function renderTrail() {
  const w = document.getElementById('trail-wrap');
  const trail = chars[activeChar].trail;
  w.innerHTML = trail.map(t => {
    const lbl = TRAIL_LABELS[t.key]?.[t.val] || t.val;
    return `<div class="trail-chip">${lbl}</div>`;
  }).join('');
}

/* ─── UNDO / BACK ─── */
function goBack() {
  const c = chars[activeChar];
  if (!c.history.length) return;
  const prev = c.history.pop();
  c.state = prev.state;
  c.trail = prev.trail;
  renderTrail();
  updateCharTabs();
  nextStep();
}

/* ─── CHAR TABS (dual mode) ─── */
function updateCharTabs() {
  if (gameMode !== 'dual') return;
  const stepsA = chars.a.trail.length, stepsB = chars.b.trail.length;
  document.getElementById('tab-a-steps').textContent = stepsA + ' choice' + (stepsA !== 1 ? 's' : '');
  document.getElementById('tab-b-steps').textContent = stepsB + ' choice' + (stepsB !== 1 ? 's' : '');
  document.getElementById('tab-a').classList.toggle('active-tab', activeChar === 'a');
  document.getElementById('tab-b').classList.toggle('active-tab', activeChar === 'b');
  document.getElementById('tab-a').classList.toggle('done-tab', isComplete('a') && activeChar !== 'a');
  document.getElementById('tab-b').classList.toggle('done-tab', isComplete('b') && activeChar !== 'b');
}

function isComplete(charId) {
  const s = chars[charId].state;
  return !!(s.background && s.school && s.extra && s.college && s.career_start && s.career_growth && s.relationship && s.personal && s.event);
}

/* ─── QUESTION CARD ─── */
function setCard(label, icon, title, sub) {
  document.getElementById('qlabel').textContent = label;
  document.getElementById('qicon').textContent = icon;
  document.getElementById('qtitle').textContent = title;
  document.getElementById('qsub').textContent = sub;
  const card = document.getElementById('qcard');
  card.className = 'card' + (gameMode === 'dual' ? ` card-char-${activeChar}` : '');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

/* ─── CHOICE CARDS ─── */
function renderChoices(choices) {
  const w = document.getElementById('choices-wrap');
  const ci = gameMode === 'dual' ? `<span class="char-indicator ci-${activeChar}">Char ${activeChar.toUpperCase()}</span>` : '';
  const extra = gameMode === 'dual' ? `char-${activeChar}-choice ` : '';
  w.innerHTML = choices.map((c, i) => `
    <div class="choice ${extra}glow-${c.glow || 'purple'}" onclick="pick('${c.key}','${c.val}','${c.theme || ''}')" style="animation-delay:${i * 0.07}s">
      ${ci}
      <span class="c-emoji">${c.emoji}</span>
      <div class="c-title">${c.title}</div>
      <div class="c-desc">${c.desc}</div>
      <span class="c-tag tag-${c.tag || 'purple'}">${c.tagLabel}</span>
    </div>
  `).join('');
}

/* ─── PICK A CHOICE ─── */
function pick(key, val, theme) {
  const c = chars[activeChar];
  // Save snapshot for undo
  c.history.push({
    state: JSON.parse(JSON.stringify(c.state)),
    trail: JSON.parse(JSON.stringify(c.trail))
  });
  c.state[key] = val;
  c.trail.push({ key, val });
  if (theme) applyTheme(theme);
  renderTrail();
  updateCharTabs();

  // Show undo button after first choice
  document.getElementById('back-btn').style.display = 'flex';

  // Dual mode: after Char A completes all steps, switch to Char B
  if (gameMode === 'dual' && isComplete('a') && !isComplete('b') && activeChar === 'a') {
    activeChar = 'b';
    chars.b = { state: {}, trail: [], history: [] };
    applyTheme('default');
    renderTrail();
    updateCharTabs();
    showCharSwitchBanner();
    return;
  }

  nextStep();
}

/* ─── CHARACTER SWITCH BANNER ─── */
function showCharSwitchBanner() {
  document.getElementById('choices-wrap').innerHTML = '';
  const qcard = document.getElementById('qcard');
  qcard.className = 'card card-char-b';
  document.getElementById('qlabel').textContent = 'Character B Begins';
  document.getElementById('qicon').textContent = '🟠';
  document.getElementById('qtitle').textContent = 'Now play as Character B';
  document.getElementById('qsub').textContent = "Character A's journey is locked in. Now make different choices and see how outcomes diverge.";
  document.getElementById('back-btn').style.display = 'none';
  setTimeout(() => { nextStep(); }, 1800);
}

/* ─── GAME FLOW ROUTER ─── */
function nextStep() {
  const s = chars[activeChar].state;
  if (!s.background)    return showBackground();
  if (!s.school)        return showSchool();
  if (!s.extra)         return showExtra();
  if (!s.college)       return showCollege();
  if (!s.career_start)  return showCareerStart();
  if (!s.career_growth) return showCareerGrowth();
  if (!s.relationship)  return showRelationship();
  if (!s.personal)      return showPersonal();
  if (!s.event)         return showEvent();
  if (gameMode === 'dual') showComparison();
  else showFinal();
}

/* ─── CHAPTER 1: BACKGROUND ─── */
function showBackground() {
  setProgress(1);
  setCard('Chapter 1 · Origins', '🌱', 'Where does your story begin?', 'Your background sets the stage — every door ahead is shaped by this first truth.');
  renderChoices([
    { key:'background', val:'privileged',      theme:'privileged',      emoji:'🏠', title:'Privileged',    desc:'Stable family, top school, full support system',        tag:'green', glow:'green', tagLabel:'Head Start' },
    { key:'background', val:'middle',           theme:'middle',           emoji:'🏘️', title:'Middle Class',  desc:'Average resources — hard work determines your rise',    tag:'blue',  glow:'blue',  tagLabel:'Balanced' },
    { key:'background', val:'underprivileged',  theme:'underprivileged',  emoji:'🏚️', title:'Underdog',      desc:'Tough start, limited means — but infinite hunger',      tag:'red',   glow:'red',   tagLabel:'Resilient' },
  ]);
}

/* ─── CHAPTER 2: SCHOOL ─── */
function showSchool() {
  setProgress(2);
  const s = chars[activeChar].state;
  const cfgs = {
    privileged:      { q:'Your school has everything. How do you show up?',          sub:'Tutors, labs, connections — what do you make of it?' },
    middle:          { q:'School is fair but not exceptional. Your move?',            sub:'No silver spoon — just your effort and attitude.' },
    underprivileged: { q:'School is tough. Resources are scarce. What drives you?',  sub:'Every textbook matters. Every grade is earned twice over.' }
  };
  const cfg = cfgs[s.background];
  setCard('Chapter 2 · School', '🏫', cfg.q, cfg.sub);
  renderChoices([
    { key:'school', val:'excel',    theme:'excel',    emoji:'🔥', title: s.background==='underprivileged'?'Fight Through':'Maximize It', desc: s.background==='privileged'?'Top grades, tutors, perfect scores':'Self-study, iron discipline, scholarship eyes', tag:'green',  glow:'green',  tagLabel: s.background==='underprivileged'?'Warrior':'Overachiever' },
    { key:'school', val:'balanced', theme:'balanced', emoji:'⚖️', title:'Find Balance', desc:'Good grades, friends, some hobbies — stay sane', tag:'blue', glow:'blue', tagLabel:'Grounded' },
    { key:'school', val:'struggle', theme:'struggle', emoji: s.background==='underprivileged'?'🏭':'🎮', title: s.background==='underprivileged'?'Work to Survive':'Coast Along', desc: s.background==='underprivileged'?'Family needs you. Studies take a hit.':'Lean on advantages. Minimal effort.', tag: s.background==='underprivileged'?'red':'yellow', glow: s.background==='underprivileged'?'red':'yellow', tagLabel: s.background==='underprivileged'?'Sacrifice':'Complacent' },
  ]);
}

/* ─── CHAPTER 2B: EXTRACURRICULARS ─── */
function showExtra() {
  setProgress(3);
  setCard('Chapter 2 · Interests', '🎯', 'What do you do outside class?', 'Beyond curriculum — this shapes who you become.');
  const choices = [
    { key:'extra', val:'sports', emoji:'⚽', title:'Sports & Fitness',    desc:'Teamwork, discipline, possible scholarships', tag:'blue',   glow:'blue',   tagLabel:'Athlete' },
    { key:'extra', val:'arts',   emoji:'🎨', title:'Arts & Music',         desc:'Creative edge, unique portfolio, passion',    tag:'purple', glow:'purple', tagLabel:'Creative' },
    { key:'extra', val:'study',  emoji:'📖', title:'Competitive Study',    desc:'Olympiads, entrance prep, academic edge',     tag:'green',  glow:'green',  tagLabel:'Scholar' },
  ];
  const s = chars[activeChar].state;
  if (s.school === 'struggle' || s.background === 'underprivileged') {
    choices.push({ key:'extra', val:'work', emoji:'💰', title:'Part-Time Job', desc:'Earn, grow up fast, real-world skills', tag:'yellow', glow:'yellow', tagLabel:'Hustler' });
  }
  renderChoices(choices);
}

/* ─── CHAPTER 3: COLLEGE ─── */
function showCollege() {
  setProgress(4);
  const s = chars[activeChar].state;
  const strong = s.school === 'excel', priv = s.background === 'privileged';
  let q, sub;
  if (strong && priv) { q = 'Every door is open. Which do you walk through?'; sub = 'Top grades + resources = maximum choice.'; }
  else if (strong)    { q = 'Your hard work earned you options. Choose wisely.'; sub = 'Merit opened these doors — you earned them.'; }
  else                { q = 'Not the strongest start. But there is still a path.'; sub = 'Character, not credentials, defines what comes next.'; }
  setCard('Chapter 3 · After School', '🎓', q, sub);
  let choices = [];
  if (strong) {
    choices = [
      { key:'college', val:'top',       theme:'top_college', emoji:'🏛️', title:'Top College',                  desc: priv?'IIT/IIM/Ivy — elite network, premium future':'Scholarship to top college — earned, not bought', tag:'yellow', glow:'yellow', tagLabel:'Elite Track' },
      { key:'college', val:'regular',   theme:'middle',      emoji:'🎓', title: priv?'Local College':'Affordable College', desc:'Good degree, manageable cost, solid outcome', tag:'blue', glow:'blue', tagLabel:'Smart Choice' },
      { key:'college', val:'vocational',theme:'vocational',  emoji:'🔧', title:'Skill Course',                 desc:'Coding bootcamp, design, trade — fast entry',  tag:'purple', glow:'purple', tagLabel:'Fast Track' },
    ];
  } else {
    choices = [
      { key:'college', val:'regular',   theme:'middle',     emoji:'🎓', title:'Night / Part-Time College', desc:'Study while working — slow but steady wins', tag:'blue',   glow:'blue',   tagLabel:'Determined' },
      { key:'college', val:'vocational',theme:'vocational', emoji:'🔧', title:'Vocational / Trade',         desc:'Earn faster, practical skills, real demand',  tag:'yellow', glow:'yellow', tagLabel:'Practical' },
      { key:'college', val:'work_early',theme:'work_early', emoji:'💼', title:'Start Working',              desc:'Dive into the workforce — learn on the job',  tag:'red',    glow:'red',    tagLabel:'Real World' },
    ];
  }
  renderChoices(choices);
}

/* ─── CHAPTER 4: CAREER START ─── */
function showCareerStart() {
  setProgress(5);
  const s = chars[activeChar].state;
  let choices = [], sub = 'Your education and background open specific doors.';
  if (s.college === 'top') {
    sub = 'Top college opens premium doors — pick your arena.';
    choices = [
      { key:'career_start', val:'corporate', theme:'corporate', emoji:'🏢', title:'Big MNC/Corp',    desc:'Fortune 500, high salary, structured growth', tag:'blue',   glow:'blue',   tagLabel:'₹₹₹' },
      { key:'career_start', val:'startup',   theme:'startup',   emoji:'🚀', title:'Hot Startup',     desc:'Equity, speed, high risk — high upside',      tag:'purple', glow:'purple', tagLabel:'High Stakes' },
      { key:'career_start', val:'govt',      theme:'govt',      emoji:'🏛️', title:'Civil Services',  desc:'UPSC/Government — power and security',        tag:'green',  glow:'green',  tagLabel:'Secure' },
    ];
  } else if (s.college === 'vocational' || s.college === 'work_early') {
    sub = 'Skills over degrees — the practical track.';
    choices = [
      { key:'career_start', val:'freelance', theme:'freelance', emoji:'💻', title:'Go Freelance',     desc:'Build your own client base from day one',    tag:'green',  glow:'green',  tagLabel:'Free' },
      { key:'career_start', val:'startup',   theme:'startup',   emoji:'🚀', title:'Join a Startup',   desc:'Wear many hats, learn fast, grow quick',      tag:'purple', glow:'purple', tagLabel:'Scrappy' },
      { key:'career_start', val:'corporate', theme:'corporate', emoji:'🏢', title:'Entry Level Corp', desc:'Steady income, climb slowly from within',    tag:'blue',   glow:'blue',   tagLabel:'Stable' },
    ];
  } else {
    choices = [
      { key:'career_start', val:'corporate', theme:'corporate', emoji:'🏢', title:'Corporate Job',   desc:'Mid-tier firm, decent salary, structure',  tag:'blue',   glow:'blue',   tagLabel:'Steady' },
      { key:'career_start', val:'govt',      theme:'govt',      emoji:'🏛️', title:'Government Job',  desc:'Security, pension, social respect',        tag:'green',  glow:'green',  tagLabel:'Safe' },
      { key:'career_start', val:'startup',   theme:'startup',   emoji:'🚀', title:'Startup',         desc:'Risk it for bigger, faster gains',         tag:'purple', glow:'purple', tagLabel:'Bold' },
      { key:'career_start', val:'freelance', theme:'freelance', emoji:'💻', title:'Self-Employed',   desc:'Start solo, build your own thing',         tag:'yellow', glow:'yellow', tagLabel:'Independent' },
    ];
  }
  setCard('Chapter 4 · Career Begins', '💼', 'Your career begins. Where do you land?', sub);
  renderChoices(choices);
}

/* ─── CHAPTER 4B: CAREER GROWTH ─── */
function showCareerGrowth() {
  setProgress(5);
  const s = chars[activeChar].state;
  setCard('Chapter 4 · Career Growth', '📈', '5 years in — how do you play it?', `You started in ${s.career_start}. Now you define your trajectory.`);
  let choices = [];
  if (s.career_start === 'corporate') {
    choices = [
      { key:'career_growth', val:'climb',    theme:'top_college', emoji:'📈', title:'Climb the Ladder',  desc:'Promotions, politics, leadership — relentless', tag:'green',  glow:'green',  tagLabel:'Ambitious' },
      { key:'career_growth', val:'stable',   theme:'balanced',    emoji:'⚖️', title:'Work-Life Balance', desc:'Good pay, protect your time and energy',         tag:'blue',   glow:'blue',   tagLabel:'Balanced' },
      { key:'career_growth', val:'pivot',    theme:'vocational',  emoji:'🔄', title:'Career Pivot',      desc:'Upskill aggressively, jump industries',           tag:'yellow', glow:'yellow', tagLabel:'Brave' },
      { key:'career_growth', val:'business', theme:'business',    emoji:'🏗️', title:'Start a Business',  desc:'Build while employed, then take the leap',       tag:'purple', glow:'purple', tagLabel:'Founder' },
    ];
  } else if (s.career_start === 'startup') {
    choices = [
      { key:'career_growth', val:'climb',    theme:'startup',    emoji:'🚀', title:'Go All-In',    desc:"Bet everything on the startup's success",   tag:'yellow', glow:'yellow', tagLabel:'All-In' },
      { key:'career_growth', val:'business', theme:'business',   emoji:'🏗️', title:'Start Your Own', desc:'Use startup knowledge to build yours',       tag:'green',  glow:'green',  tagLabel:'Founder' },
      { key:'career_growth', val:'pivot',    theme:'corporate',  emoji:'🔄', title:'Join Big Co.', desc:'Cash in experience, get stability + salary', tag:'blue',   glow:'blue',   tagLabel:'Pivot' },
      { key:'career_growth', val:'stable',   theme:'balanced',   emoji:'😮‍💨', title:'Step Back',    desc:'Burnout is real — recharge and recalibrate', tag:'red',    glow:'red',    tagLabel:'Recharge' },
    ];
  } else if (s.career_start === 'freelance') {
    choices = [
      { key:'career_growth', val:'business', theme:'business',  emoji:'🏗️', title:'Build an Agency', desc:'Hire people, systemise, scale your work',   tag:'green',  glow:'green',  tagLabel:'Scale Up' },
      { key:'career_growth', val:'stable',   theme:'freelance', emoji:'⚖️', title:'Stay Freelance',  desc:'Steady clients, freedom, solid income',      tag:'blue',   glow:'blue',   tagLabel:'Freedom' },
      { key:'career_growth', val:'pivot',    theme:'corporate', emoji:'🔄', title:'Go Corporate',    desc:'Trade freedom for a stable paycheck',        tag:'yellow', glow:'yellow', tagLabel:'Stability' },
    ];
  } else {
    choices = [
      { key:'career_growth', val:'climb',    theme:'top_college', emoji:'📈', title:'Get Promoted', desc:'Ace exams, move up the ranks',                    tag:'blue',   glow:'blue',   tagLabel:'Dedicated' },
      { key:'career_growth', val:'stable',   theme:'balanced',    emoji:'⚖️', title:'Enjoy Security', desc:'Job security + real personal time',              tag:'green',  glow:'green',  tagLabel:'Content' },
      { key:'career_growth', val:'business', theme:'business',    emoji:'🏗️', title:'Side Hustle',  desc:'Build something while your job stays safe',      tag:'purple', glow:'purple', tagLabel:'Smart' },
    ];
  }
  renderChoices(choices);
}

/* ─── CHAPTER 5: RELATIONSHIP ─── */
function showRelationship() {
  setProgress(6);
  const s = chars[activeChar].state;
  const busy = s.career_growth === 'climb' || s.career_growth === 'business';
  setCard('Chapter 5 · Personal Life', '❤️', 'What does your heart choose?',
    busy ? 'Ambition has consumed you — but life beyond work calls.' : 'Stability creates space for people who matter.');
  renderChoices([
    { key:'relationship', val:'partner',      theme:'family', emoji:'💑', title:'Committed Partner', desc:'Long-term love — grow together through it all', tag:'purple', glow:'purple', tagLabel:'Together' },
    { key:'relationship', val:'single',                       emoji:'🧘', title:'Solo Life',          desc:'Independence, self-discovery, zero compromise', tag:'blue',   glow:'blue',   tagLabel:'Free Spirit' },
    { key:'relationship', val:'family_focus', theme:'family', emoji:'👨‍👩‍👧', title:'Start a Family',   desc:'Partner, children, a home — family first',       tag:'green',  glow:'green',  tagLabel:'Family' },
  ]);
}

/* ─── CHAPTER 5B: PERSONAL GROWTH ─── */
function showPersonal() {
  setProgress(6);
  const s = chars[activeChar].state;
  const sub = s.relationship === 'family_focus'
    ? 'Between parenting and life, you still carve out space for…'
    : 'Beyond career and relationships — what fuels your soul?';
  setCard('Chapter 5 · Growth', '✨', 'How do you grow as a person?', sub);
  const choices = [
    { key:'personal', val:'health',    theme:'excel', emoji:'🏋️', title:'Health & Wellbeing', desc:'Mind, body, and spirit — your greatest asset',        tag:'green',  glow:'green',  tagLabel:'Vital' },
    { key:'personal', val:'community',               emoji:'🤝', title:'Give Back',            desc:'Mentor, volunteer, build something beyond yourself',  tag:'purple', glow:'purple', tagLabel:'Purpose' },
    { key:'personal', val:'creative',                emoji:'🎭', title:'Creative Pursuits',    desc:'Music, writing, art — passion over profit',           tag:'yellow', glow:'yellow', tagLabel:'Artful' },
  ];
  if (s.relationship !== 'family_focus') {
    choices.unshift({ key:'personal', val:'travel', emoji:'✈️', title:'Explore the World', desc:'New cultures, new perspectives, stories forever', tag:'blue', glow:'blue', tagLabel:'Explorer' });
  }
  renderChoices(choices);
}

/* ─── CHAPTER 6: LIFE EVENT ─── */
function showEvent() {
  setProgress(7);
  const s = chars[activeChar].state;
  const isHigh = (s.college === 'top' && s.career_growth === 'climb') || s.career_growth === 'business';
  const isLow  = s.school === 'struggle' && (s.college === 'work_early' || s.college === 'vocational');
  let q, sub, choices;
  if (isHigh) {
    q = 'From strength, life sends a curveball.'; sub = 'Your resources help — but wisdom matters more.';
    choices = [
      { key:'event', val:'crisis',      theme:'crisis',      emoji:'📉', title:'Market Crash / Layoff', desc:'Business takes a hit. Pivot or rebuild?',                  tag:'red',    glow:'red',    tagLabel:'Setback' },
      { key:'event', val:'opportunity', theme:'opportunity', emoji:'🌟', title:'Big Opportunity',       desc:'Acquisition, breakthrough partnership, IPO',                tag:'yellow', glow:'yellow', tagLabel:'Windfall' },
      { key:'event', val:'loss',                             emoji:'🕊️', title:'Family Crisis',         desc:'Health emergency — priorities permanently shift',            tag:'purple', glow:'purple', tagLabel:'Perspective' },
    ];
  } else if (isLow) {
    q = "Still building — life doesn't wait."; sub = 'How you respond now will define your next decade.';
    choices = [
      { key:'event', val:'crisis',      theme:'crisis',      emoji:'🌊', title:'Financial Crisis', desc:'Debt, job loss — survive and adapt',                          tag:'red',   glow:'red',   tagLabel:'Tough' },
      { key:'event', val:'opportunity', theme:'opportunity', emoji:'🌟', title:'Lucky Break',       desc:'Right person sees your potential at the right time',         tag:'green', glow:'green', tagLabel:'Turning Point' },
      { key:'event', val:'move',                             emoji:'🗺️', title:'Relocate',          desc:'New city, fresh start, blank slate',                         tag:'blue',  glow:'blue',  tagLabel:'New Chapter' },
    ];
  } else {
    q = 'Mid-journey — life sends its biggest test.'; sub = 'Your path shapes how hard this hits.';
    choices = [
      { key:'event', val:'crisis',      theme:'crisis',      emoji:'🌊', title:'Health Crisis',        desc:'You or someone close — everything changes',                  tag:'red',    glow:'red',    tagLabel:'Wake Up' },
      { key:'event', val:'opportunity', theme:'opportunity', emoji:'🌟', title:'Dream Opportunity',    desc:'Job abroad, breakthrough deal, or big break',                tag:'green',  glow:'green',  tagLabel:'Leap' },
      { key:'event', val:'loss',                             emoji:'🕊️', title:'Personal Loss',        desc:'Grief that permanently reshapes your worldview',              tag:'yellow', glow:'yellow', tagLabel:'Growth' },
      { key:'event', val:'move',                             emoji:'🗺️', title:'Relocate Abroad',      desc:'Move countries for a radically fresh start',                  tag:'blue',   glow:'blue',   tagLabel:'Adventure' },
    ];
  }
  setCard('Chapter 6 · Life Event', '⚡', q, sub);
  renderChoices(choices);
}

/* ─── SCORING FUNCTIONS ─── */
function calcScore(s) {
  let score = 0;
  if (s.background === 'privileged') score += 20;
  if (s.background === 'middle')     score += 10;
  if (s.school === 'excel')          score += 25;
  if (s.school === 'balanced')       score += 12;
  if (s.extra === 'study')           score += 10;
  if (s.extra === 'work')            score += 7;
  if (s.college === 'top')           score += 20;
  if (s.college === 'regular')       score += 12;
  if (s.college === 'vocational')    score += 10;
  if (s.career_growth === 'business') score += 20;
  if (s.career_growth === 'climb')    score += 15;
  if (s.event === 'opportunity')     score += 15;
  if (s.personal === 'health')       score += 8;
  if (s.relationship === 'family_focus') score += 10;
  return Math.min(100, score);
}

function calcHappy(s) {
  return Math.min(100,
    35 +
    (s.personal === 'health' ? 20 : 10) +
    (s.relationship === 'family_focus' ? 15 : 5) +
    (s.event === 'opportunity' ? 12 : 0) +
    (s.career_growth === 'stable' ? 10 : 0)
  );
}

function calcImpact(s, score) {
  return (s.personal === 'community' || s.career_growth === 'business' || s.event === 'opportunity')
    ? Math.min(100, score + 20)
    : Math.min(100, score - 10);
}

function calcWealth(s) {
  let w = 20;
  if (s.background === 'privileged')   w += 30;
  if (s.background === 'middle')       w += 15;
  if (s.college === 'top')             w += 25;
  if (s.career_start === 'corporate')  w += 20;
  if (s.career_start === 'startup')    w += 15;
  if (s.career_growth === 'business')  w += 20;
  if (s.career_growth === 'climb')     w += 15;
  if (s.event === 'opportunity')       w += 10;
  return Math.min(100, w);
}

function calcAccess(s) {
  // Measures how much systemic structural access the character had
  let a = 0;
  if (s.background === 'privileged')   a += 35;
  if (s.background === 'middle')       a += 18;
  if (s.college === 'top')             a += 25;
  if (s.college === 'regular')         a += 12;
  if (s.career_start === 'corporate')  a += 15;
  if (s.career_start === 'govt')       a += 10;
  return Math.min(100, a);
}

function archetypeFor(score) {
  if (score >= 90) return { icon:'🌟', title:'The Visionary' };
  if (score >= 75) return { icon:'🏆', title:'The Achiever' };
  if (score >= 55) return { icon:'⚡', title:'The Fighter' };
  if (score >= 35) return { icon:'🌱', title:'The Grower' };
  return { icon:'🕊️', title:'The Survivor' };
}

/* ─── SINGLE FINAL SCREEN ─── */
function showFinal() {
  document.getElementById('qcard').style.display = 'none';
  document.getElementById('choices-wrap').style.display = 'none';
  document.getElementById('connector').style.display = 'none';
  document.getElementById('scroll-hint').style.display = 'none';
  document.getElementById('back-btn').style.display = 'none';

  const fw = document.getElementById('final-wrap');
  fw.style.display = 'flex';
  setProgress(7);

  const s = chars[activeChar].state;
  const score = calcScore(s), happy = calcHappy(s), impact = Math.max(0, calcImpact(s, score));
  const arch = archetypeFor(score);
  const subs = {
    '🌟 The Visionary': 'Privilege met preparation. You built an extraordinary, outsized life.',
    '🏆 The Achiever':  'Smart choices and relentless effort created a life of real impact.',
    '⚡ The Fighter':   'You faced real walls — and still built something that mattered.',
    '🌱 The Grower':    'Every struggle planted seeds. Your story is still being written.',
    '🕊️ The Survivor': 'Against enormous odds, you kept going. That alone is extraordinary.'
  };

  const icons2 = { background:'🧬', school:'🏫', extra:'🎯', college:'🎓', career_start:'💼', career_growth:'📈', relationship:'❤️', personal:'✨', event:'⚡' };

  fw.innerHTML = `
    <div class="final-card">
      <span class="final-icon">${arch.icon}</span>
      <div class="final-title">${arch.title}</div>
      <div class="final-sub">${subs[arch.icon + ' ' + arch.title] || ''}</div>
      <div class="stats-row">
        <div class="stat"><div class="stat-val">${score}</div><div class="stat-key">Life Score</div></div>
        <div class="stat"><div class="stat-val">${happy}%</div><div class="stat-key">Happiness</div></div>
        <div class="stat"><div class="stat-val">${impact}%</div><div class="stat-key">Impact</div></div>
      </div>
      <div class="path-log">
        ${chars[activeChar].trail.map(t => `
          <div class="path-row">
            <span class="pr-icon">${icons2[t.key] || '•'}</span>
            <span class="pr-key">${t.key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
            <span class="pr-val">${TRAIL_LABELS[t.key]?.[t.val] || t.val}</span>
          </div>`).join('')}
      </div>
      <button class="replay-btn" onclick="restart()">↩ Live Another Life</button>
    </div>`;

  if (score >= 75) applyTheme('opportunity');
  else if (score >= 50) applyTheme('balanced');
  else applyTheme('crisis');
}

/* ─── DUAL COMPARISON FINAL SCREEN ─── */
function showComparison() {
  document.getElementById('qcard').style.display = 'none';
  document.getElementById('choices-wrap').style.display = 'none';
  document.getElementById('connector').style.display = 'none';
  document.getElementById('scroll-hint').style.display = 'none';
  document.getElementById('back-btn').style.display = 'none';
  document.getElementById('char-tabs').style.display = 'none';
  document.getElementById('theme-badge').style.display = 'none';
  document.getElementById('trail-wrap').style.display = 'none';
  document.getElementById('progress-wrap').style.display = 'none';
  setProgress(7);

  const cw = document.getElementById('compare-wrap');
  cw.style.display = 'flex';
  applyTheme('opportunity');

  const sA = chars.a.state, sB = chars.b.state;
  const scoreA = calcScore(sA),  scoreB = calcScore(sB);
  const happyA = calcHappy(sA),  happyB = calcHappy(sB);
  const impactA = Math.max(0, calcImpact(sA, scoreA)), impactB = Math.max(0, calcImpact(sB, scoreB));
  const wealthA = calcWealth(sA), wealthB = calcWealth(sB);
  const accessA = calcAccess(sA), accessB = calcAccess(sB);
  const archA = archetypeFor(scoreA), archB = archetypeFor(scoreB);

  // Dynamic insights based on real differences
  const insights = [];
  if (sA.background !== sB.background) {
    const labels = { privileged:'a privileged background', middle:'a middle-class background', underprivileged:'an underprivileged background' };
    insights.push(`Starting point is destiny. Character A began with ${labels[sA.background] || sA.background}, Character B with ${labels[sB.background] || sB.background} — the same effort produced a ${Math.abs(scoreA - scoreB)}-point score gap. Systems reward origin, not just ambition.`);
  }
  if (sA.college === sB.college && sA.school !== sB.school) {
    insights.push(`Same college, different school journeys. When institutional access is equal, school-era effort equalizes outcomes — but getting that equal access often depends on what came before school.`);
  }
  if (sA.college !== sB.college) {
    const crank = { top:3, regular:2, vocational:1, work_early:0 };
    if (crank[sA.college] !== crank[sB.college])
      insights.push(`College tier creates compounding privilege. Top institutions don't just teach skills — they gatekeep networks. The career paths available to each character diverged here, and those gaps widened with every passing chapter.`);
  }
  if (sA.career_start !== sB.career_start) {
    insights.push(`Same ambition, different doors. Corporate vs freelance vs startup — these weren't just preferences. The doors characters could even knock on were shaped by their degree, background, and who they knew.`);
  }
  if (accessA > accessB + 15) {
    insights.push(`Systemic access explains ${Math.round(accessA - accessB)}% of Character A's advantage. This gap wasn't earned through harder work — it was inherited through privilege, institutional networks, and compounding structural advantage.`);
  } else if (accessB > accessA + 15) {
    insights.push(`Character B had significantly less systemic access (${Math.round(accessB - accessA)} points less) — yet still achieved a life score of ${scoreB}. This represents extraordinary effort against structural resistance.`);
  }
  if (scoreA !== scoreB && sA.school === sB.school && sA.extra === sB.extra) {
    insights.push(`Identical effort, unequal outcomes. Both characters made the same choices in school and extracurriculars — yet their life scores diverged by ${Math.abs(scoreA - scoreB)} points. The system amplified background differences, not personal choices.`);
  }
  if (insights.length === 0) {
    insights.push(`Two paths through the same world. Every chapter, each character faced structurally different versions of the same choices — gatekeeping dressed as meritocracy.`);
    insights.push(`The scoring system rewards compound privilege. Early advantages multiply; early disadvantages compound too. The gap at the end is rarely about effort — it's about which starting square you were handed.`);
  }

  // Path comparison rows
  const pathKeys = ['background','school','extra','college','career_start','career_growth','relationship','personal','event'];
  const keyIcons = { background:'🧬', school:'🏫', extra:'🎯', college:'🎓', career_start:'💼', career_growth:'📈', relationship:'❤️', personal:'✨', event:'⚡' };
  const pcRows = pathKeys.map(k => {
    const vA = sA[k] || '—', vB = sB[k] || '—';
    const lA = TRAIL_LABELS[k]?.[vA] || vA, lB = TRAIL_LABELS[k]?.[vB] || vB;
    const diff = vA !== vB;
    return `<div class="pc-row">
      <div class="pc-key">${keyIcons[k] || ''} ${k.replace(/_/g,' ')}</div>
      <div class="pc-cell cell-a ${diff ? 'cell-diff-a' : ''}">${lA}</div>
      <div class="pc-cell cell-b ${diff ? 'cell-diff-b' : ''}">${lB}</div>
    </div>`;
  }).join('');

  function bar(a, b, key) {
    return `<div class="stat-bar-row">
      <div class="sbr-label"><span class="sl-key">${key}</span><span class="sl-vals"><span class="sl-a">A: ${a}</span><span class="sl-b">B: ${b}</span></span></div>
      <div class="sbr-track"><div class="sbr-fill fill-a" style="width:${a}%"></div></div>
      <div class="sbr-track" style="margin-top:3px;"><div class="sbr-fill fill-b" style="width:${b}%"></div></div>
    </div>`;
  }

  cw.innerHTML = `
    <div class="compare-header">
      <h2>The Verdict</h2>
      <p>Two lives played. The same world — built different for each of them.</p>
    </div>

    <div class="vs-banner">
      <div class="vs-col col-a">
        <div class="vs-icon">${archA.icon}</div>
        <div class="vs-archetype a-color">${archA.title}</div>
        <div class="vs-score"><span>${scoreA}</span>life score</div>
      </div>
      <div class="vs-divider">VS</div>
      <div class="vs-col col-b">
        <div class="vs-icon">${archB.icon}</div>
        <div class="vs-archetype b-color">${archB.title}</div>
        <div class="vs-score"><span>${scoreB}</span>life score</div>
      </div>
    </div>

    <div class="stat-bars-wrap">
      <h3>Outcome metrics</h3>
      ${bar(scoreA, scoreB, 'Life Score')}
      ${bar(happyA, happyB, 'Happiness')}
      ${bar(impactA, impactB, 'Impact')}
      ${bar(wealthA, wealthB, 'Wealth Index')}
      ${bar(accessA, accessB, 'Systemic Access')}
    </div>

    <div class="path-compare">
      <h3>Decision by decision</h3>
      <div class="pc-row" style="margin-bottom:12px;">
        <div></div>
        <div style="font-size:0.65rem;font-weight:700;color:#a78bfa;padding:0 12px;">Character A</div>
        <div style="font-size:0.65rem;font-weight:700;color:#fb923c;padding:0 12px;">Character B</div>
      </div>
      ${pcRows}
    </div>

    <div class="insight-box">
      <h3>What the system revealed</h3>
      ${insights.map(i => `<div class="insight-item">${i}</div>`).join('')}
    </div>

    <div class="compare-btns">
      <button class="btn-replay replay-btn" onclick="restart()">↩ Play Again</button>
      <button class="btn-swap" onclick="swapAndReplay()">⇄ Swap Paths & Compare</button>
    </div>`;
}

/* ─── SWAP AND REPLAY ─── */
function swapAndReplay() {
  const tmp = chars.a;
  chars.a = chars.b;
  chars.b = tmp;
  showComparison();
}

/* ─── RESTART ─── */
function restart() {
  chars = { a:{state:{},trail:[],history:[]}, b:{state:{},trail:[],history:[]} };
  activeChar = 'a';

  document.getElementById('qcard').style.display = '';
  document.getElementById('choices-wrap').style.display = '';
  document.getElementById('connector').style.display = '';
  document.getElementById('scroll-hint').style.display = '';
  document.getElementById('final-wrap').style.display = 'none';
  document.getElementById('final-wrap').innerHTML = '';
  document.getElementById('compare-wrap').style.display = 'none';
  document.getElementById('compare-wrap').innerHTML = '';
  document.getElementById('trail-wrap').innerHTML = '';
  document.getElementById('trail-wrap').style.display = '';
  document.getElementById('theme-badge').style.display = '';
  document.getElementById('progress-wrap').style.display = '';
  document.getElementById('back-btn').style.display = 'none';

  if (gameMode === 'dual') {
    document.getElementById('char-tabs').style.display = 'flex';
    updateCharTabs();
  }
  applyTheme('default');
  showBackground();
}

/* ─── INIT ─── */
showBackground();