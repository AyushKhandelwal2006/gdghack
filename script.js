/* ═══════════════════════════════════════════════
   LIFE CHOICES — THE BIAS ENGINE  v2.0
   script.js  |  Full bias simulation
═══════════════════════════════════════════════ */

/* ─── THEME DEFINITIONS ─── */
const THEMES = {
  default:         { bg:'radial-gradient(ellipse 80% 60% at 20% 30%, #1a0533 0%, #060610 60%), radial-gradient(ellipse 60% 80% at 80% 70%, #000d33 0%, transparent 70%)', orb1:'#6a0dad', orb2:'#0a3d8f', orb3:'#4a0080', particles:'#a78bfa', badge:'🌌 Your Universe Awaits', dot:'#a78bfa' },
  privileged:      { bg:'radial-gradient(ellipse 80% 70% at 10% 20%, #0d2518 0%, #040a06 60%), radial-gradient(ellipse 70% 60% at 90% 80%, #1a3a1a 0%, transparent 70%)', orb1:'#1a6b2a', orb2:'#0d4020', orb3:'#2d8f50', particles:'#4ade80', badge:'🏛️ Privileged Path', dot:'#4ade80' },
  middle:          { bg:'radial-gradient(ellipse 80% 70% at 15% 25%, #0d1f3a 0%, #06090f 60%), radial-gradient(ellipse 70% 60% at 85% 75%, #1a2a4a 0%, transparent 70%)', orb1:'#0d3a8f', orb2:'#1a2a6b', orb3:'#0a4a8f', particles:'#60a5fa', badge:'🏘️ Middle Path', dot:'#60a5fa' },
  underprivileged: { bg:'radial-gradient(ellipse 80% 70% at 20% 30%, #2a0808 0%, #0d0606 60%), radial-gradient(ellipse 70% 60% at 80% 70%, #1a0a0a 0%, transparent 70%)', orb1:'#8f1a0d', orb2:'#5a0d0d', orb3:'#3d0d0d', particles:'#f87171', badge:'🏚️ Underdog Rising', dot:'#f87171' },
  excel:           { bg:'radial-gradient(ellipse 80% 70% at 10% 10%, #0a2a1a 0%, #040a06 65%)', orb1:'#0d6b2a', orb2:'#1a8f40', orb3:'#0a4a20', particles:'#4ade80', badge:'📚 Scholar Aura', dot:'#4ade80' },
  balanced:        { bg:'radial-gradient(ellipse 80% 70% at 15% 20%, #0a1a3a 0%, #060810 65%)', orb1:'#0d3a8f', orb2:'#1a4a7a', orb3:'#0a2a5f', particles:'#60a5fa', badge:'⚖️ Balanced Aura', dot:'#60a5fa' },
  struggle:        { bg:'radial-gradient(ellipse 80% 70% at 20% 30%, #1f0a0a 0%, #0d0707 65%)', orb1:'#8f2a0d', orb2:'#6b1a0d', orb3:'#4a0d0d', particles:'#fb923c', badge:'💪 Fighter\'s Grit', dot:'#fb923c' },
  top_college:     { bg:'radial-gradient(ellipse 80% 70% at 5% 10%, #1a1200 0%, #0c0b05 65%)', orb1:'#8f7a0d', orb2:'#6b5a0d', orb3:'#4a3d0d', particles:'#facc15', badge:'🏛️ Elite Scholar', dot:'#facc15' },
  vocational:      { bg:'radial-gradient(ellipse 80% 70% at 10% 20%, #0a1a2a 0%, #060b10 65%)', orb1:'#0d4a6b', orb2:'#0a3a5a', orb3:'#0d2a4a', particles:'#38bdf8', badge:'🔧 Skills First', dot:'#38bdf8' },
  work_early:      { bg:'radial-gradient(ellipse 80% 70% at 20% 30%, #1a0a0a 0%, #0d0707 65%)', orb1:'#8f4a0d', orb2:'#6b3a0d', orb3:'#4a2a0d', particles:'#fb923c', badge:'💼 Street Smart', dot:'#fb923c' },
  corporate:       { bg:'radial-gradient(ellipse 80% 70% at 5% 5%, #040c14 0%, #030810 65%)', orb1:'#0d2a4a', orb2:'#0a1f3a', orb3:'#0d1a30', particles:'#7dd3fc', badge:'🏢 Corporate Aura', dot:'#7dd3fc' },
  startup:         { bg:'radial-gradient(ellipse 80% 70% at 10% 15%, #1a0a2a 0%, #0b080f 65%)', orb1:'#6b0d8f', orb2:'#4a0d6b', orb3:'#3a0d5a', particles:'#c084fc', badge:'🚀 Startup Energy', dot:'#c084fc' },
  govt:            { bg:'radial-gradient(ellipse 80% 70% at 10% 10%, #0d0d18 0%, #07070e 65%)', orb1:'#1a1a6b', orb2:'#0d0d4a', orb3:'#1a1a5a', particles:'#818cf8', badge:'🏛️ Public Servant', dot:'#818cf8' },
  freelance:       { bg:'radial-gradient(ellipse 80% 70% at 20% 20%, #0a1c0a 0%, #060b06 65%)', orb1:'#0d6b2a', orb2:'#0a4a20', orb3:'#0d5a25', particles:'#34d399', badge:'💻 Free Spirit', dot:'#34d399' },
  business:        { bg:'radial-gradient(ellipse 80% 70% at 5% 5%, #160f00 0%, #0c0900 65%)', orb1:'#8f6b0d', orb2:'#6b4a0d', orb3:'#4a3a0d', particles:'#fbbf24', badge:'🏗️ Builder Mode', dot:'#fbbf24' },
  family:          { bg:'radial-gradient(ellipse 80% 70% at 15% 15%, #18091a 0%, #0c0710 65%)', orb1:'#8f0d6b', orb2:'#6b0d4a', orb3:'#5a0d3a', particles:'#f0abfc', badge:'❤️ Family First', dot:'#f0abfc' },
  opportunity:     { bg:'radial-gradient(ellipse 80% 70% at 10% 10%, #1a1400 0%, #0d0c00 65%)', orb1:'#8f8b0d', orb2:'#6b670d', orb3:'#5a560d', particles:'#fde68a', badge:'🌟 Destiny Unlocked', dot:'#fde68a' },
  crisis:          { bg:'radial-gradient(ellipse 80% 70% at 30% 30%, #1a0707 0%, #0e0606 65%)', orb1:'#8f0d0d', orb2:'#6b0d0d', orb3:'#4a0d0d', particles:'#fca5a5', badge:'🌊 Weathering Storm', dot:'#fca5a5' }
};

/* ─── PARTICLE ENGINE ─── */
const canvas = document.getElementById('particles');
const ctx2 = canvas.getContext('2d');
let particles = [], particleColor = '#a78bfa';
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
function hexToRgb(h) { return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`; }
function initParticles() {
  particles = [];
  for (let i = 0; i < 55; i++) particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2.5+0.5, vx:(Math.random()-0.5)*0.4, vy:-(Math.random()*0.6+0.1), o:Math.random()*0.6+0.1, life:Math.random() });
}
initParticles();
(function animP() {
  ctx2.clearRect(0,0,canvas.width,canvas.height);
  const rgb = hexToRgb(particleColor);
  particles.forEach(p => {
    p.x+=p.vx; p.y+=p.vy; p.life-=0.002;
    if (p.life<=0||p.y<-10) { p.x=Math.random()*canvas.width; p.y=canvas.height+10; p.life=Math.random()*0.8+0.2; }
    ctx2.beginPath(); ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx2.fillStyle=`rgba(${rgb},${p.o*p.life})`; ctx2.fill();
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

/* ═══════════════════════════════════════
   BIAS SYSTEM
═══════════════════════════════════════ */
/* How much bias accumulates per choice-key per background */
const BIAS_WEIGHTS = {
  privileged: {
    background:0, school:-5, extra:-5, college:-8, career_start:-5,
    career_growth:-5, relationship:-3, personal:-2, event:-5
  },
  middle: {
    background:0, school:3, extra:5, college:8, career_start:5,
    career_growth:5, relationship:3, personal:2, event:5
  },
  underprivileged: {
    background:0, school:15, extra:12, college:18, career_start:14,
    career_growth:14, relationship:8, personal:6, event:12
  }
};

/* Effort multipliers – same action, different required effort */
const EFFORT_COST = {
  privileged: { school:1, extra:1, college:1, career_start:1, career_growth:1, relationship:1, personal:1, event:1 },
  middle:     { school:1.4, extra:1.3, college:1.6, career_start:1.4, career_growth:1.4, relationship:1.2, personal:1.2, event:1.4 },
  underprivileged: { school:2.2, extra:2.0, college:2.8, career_start:2.4, career_growth:2.4, relationship:1.8, personal:1.8, event:2.2 }
};

/* Role-based consequence flavour for same choice */
const CONSEQUENCE_FLAVOR = {
  school_excel: {
    privileged: { title:'Mentored to Excellence', msg:'Private tutors, school counsellors, alumni networks — every resource amplified your effort. Results came fast.', reward:'+22 pts · Network unlocked', rewardClass:'reward-great' },
    middle:      { title:'Studied Smart, Worked Hard', msg:'No silver spoon, but solid discipline. You hit the books alone — results took twice as long, but you got there.', reward:'+14 pts · Effort recognised', rewardClass:'reward-good' },
    underprivileged: { title:'Fought for Every Grade', msg:'No textbooks, shared notes, no quiet space to study. You outworked everyone — and the system still scored you lower.', reward:'+9 pts · System undervalued you', rewardClass:'reward-poor' }
  },
  school_balanced: {
    privileged: { title:'Balanced & Comfortable', msg:'Sports, clubs, tutors, leisure — you had the luxury of balance without consequences.', reward:'+12 pts', rewardClass:'reward-good' },
    middle:      { title:'Juggling Act', msg:'Balanced effort while managing part-time responsibilities. Every "balance" cost you something.', reward:'+8 pts', rewardClass:'reward-ok' },
    underprivileged: { title:'Survival Mode Called Balance', msg:'"Balance" meant choosing between studying and family duties. The scale was never equal.', reward:'+4 pts · Invisible tax paid', rewardClass:'reward-poor' }
  },
  college_top: {
    privileged: { title:'Destination: IIT/IIM/Ivy', msg:'Legacy status, coaching institutes, connections — the door was already open. You walked through.', reward:'+20 pts · Premium network', rewardClass:'reward-great' },
    middle:      { title:'Earned Your Seat', msg:'Months of grinding, one shot at the entrance exam. You made it — without a safety net.', reward:'+20 pts · Earned hard', rewardClass:'reward-good' },
    underprivileged: { title:'★ Against All Odds ★', msg:'No coaching institute. Borrowed books. You cracked it anyway. Exceptional.', reward:'+20 pts · 3× the effort required', rewardClass:'reward-exceptional' }
  },
  career_start_corporate: {
    privileged: { title:'Fast-Tracked In', msg:'Referral from a family contact. Director-level uncle. The interview was a formality.', reward:'+18 pts · Referral bonus', rewardClass:'reward-great' },
    middle:      { title:'Competed and Won', msg:'100 applications, 6 rounds of interviews. You earned your seat at the table.', reward:'+12 pts', rewardClass:'reward-good' },
    underprivileged: { title:'Door Was Barely Ajar', msg:'No referral. No network. Hired for entry-level while peers with connections started mid-senior.', reward:'+8 pts · 2 levels behind at start', rewardClass:'reward-poor' }
  },
  career_growth_climb: {
    privileged: { title:'Promoted on Schedule', msg:'Golf with the CEO. Drinks with the board. Visibility was automatic.', reward:'+15 pts · Sponsor found you', rewardClass:'reward-great' },
    middle:      { title:'Hustled for Visibility', msg:'Volunteered for every project, documented every win. Promotion took 5 years instead of 3.', reward:'+12 pts', rewardClass:'reward-good' },
    underprivileged: { title:'Invisible Labor', msg:'Did the work of three people. Praise went to colleagues with better "executive presence". That meant accent, address, attire.', reward:'+7 pts · Credit stolen', rewardClass:'reward-poor' }
  }
};

function getConsequence(key, val, bg) {
  const ckey = `${key}_${val}`;
  const map = CONSEQUENCE_FLAVOR[ckey];
  if (!map) return null;
  return map[bg] || null;
}

/* ─── GAME STATE ─── */
let gameMode = 'single';
let activeChar = 'a';
let chars = {
  a: { state:{}, trail:[], history:[], biasScore:0, effortTotal:0, rewardTotal:0 },
  b: { state:{}, trail:[], history:[], biasScore:0, effortTotal:0, rewardTotal:0 }
};

/* ─── BIAS METER UI ─── */
function updateBiasMeter() {
  const c = chars[activeChar];
  const bg = c.state.background || 'middle';
  const bias = Math.min(100, Math.max(0, c.biasScore));
  const meterFill = document.getElementById('bias-fill');
  const meterVal  = document.getElementById('bias-val');
  const meterWrap = document.getElementById('bias-meter-wrap');
  if (!meterFill) return;

  meterFill.style.width = bias + '%';
  meterVal.textContent = bias;

  // Color shifts by severity
  if (bias < 20) { meterFill.style.background = 'linear-gradient(90deg,#39ff14,#4ade80)'; }
  else if (bias < 45) { meterFill.style.background = 'linear-gradient(90deg,#fbbf24,#fb923c)'; }
  else if (bias < 70) { meterFill.style.background = 'linear-gradient(90deg,#f87171,#ef4444)'; }
  else { meterFill.style.background = 'linear-gradient(90deg,#dc2626,#ff0000)'; meterFill.style.animation = 'biasPulse 0.6s ease-in-out infinite'; }

  // Show/hide based on background
  meterWrap.style.display = bg === 'privileged' ? 'none' : '';
}

/* ─── ROLE-BASED UI DISTORTION ─── */
function applyRoleDistortion() {
  const bg = chars[activeChar].state.background;
  const bias = chars[activeChar].biasScore;
  const app = document.getElementById('app');

  // Remove all role classes
  app.classList.remove('role-privileged','role-middle','role-underprivileged');
  document.body.classList.remove('distort-low','distort-med','distort-high');

  if (!bg) return;
  app.classList.add(`role-${bg}`);

  if (bg === 'underprivileged') {
    if (bias >= 60) document.body.classList.add('distort-high');
    else if (bias >= 35) document.body.classList.add('distort-med');
    else document.body.classList.add('distort-low');
  }
}

/* ─── MODE SWITCH ─── */
function setMode(m) {
  gameMode = m;
  document.getElementById('btn-single').classList.toggle('active', m === 'single');
  document.getElementById('btn-dual').classList.toggle('active', m === 'dual');
  document.getElementById('char-tabs').style.display = m === 'dual' ? 'flex' : 'none';
  chars = {
    a:{state:{},trail:[],history:[],biasScore:0,effortTotal:0,rewardTotal:0},
    b:{state:{},trail:[],history:[],biasScore:0,effortTotal:0,rewardTotal:0}
  };
  activeChar = 'a';
  restart();
}

/* ─── PROGRESS BAR ─── */
function setProgress(n) {
  const bg = chars[activeChar].state.background;
  const isUnder = bg === 'underprivileged';
  for (let i = 0; i < 7; i++) {
    const el = document.getElementById('p' + i);
    const done = i < n;
    el.classList.toggle('done', done);
    // Underprivileged bar fills slightly slower visually
    if (isUnder && done) el.style.opacity = '0.75';
    else el.style.opacity = '';
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
  c.biasScore = prev.biasScore;
  c.effortTotal = prev.effortTotal;
  c.rewardTotal = prev.rewardTotal;
  renderTrail();
  updateCharTabs();
  updateBiasMeter();
  applyRoleDistortion();
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
  const bg = chars[activeChar].state.background;
  let cls = 'card';
  if (gameMode === 'dual') cls += ` card-char-${activeChar}`;
  if (bg === 'underprivileged') cls += ' card-underdog';
  else if (bg === 'privileged') cls += ' card-privileged';
  card.className = cls;
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

/* ─── CHOICE CARDS ─── */
function renderChoices(choices) {
  const w = document.getElementById('choices-wrap');
  const c = chars[activeChar];
  const bg = c.state.background;
  const bias = c.biasScore;
  const ci = gameMode === 'dual' ? `<span class="char-indicator ci-${activeChar}">Player ${activeChar.toUpperCase()}</span>` : '';
  const extra = gameMode === 'dual' ? `char-${activeChar}-choice ` : '';

  // Locked options for high-bias underprivileged
  const lockThreshold = 55;
  const shouldLock = bg === 'underprivileged' && bias >= lockThreshold;

  // Randomly lock 1 option when bias is very high (not the first one)
  let lockedIndex = -1;
  if (shouldLock && choices.length > 2) {
    lockedIndex = 1 + Math.floor(Math.random() * (choices.length - 1));
  }

  w.innerHTML = choices.map((ch, i) => {
    const isLocked = i === lockedIndex;
    const lockReason = isLocked ? getLockReason(ch.key, ch.val) : '';
    const roleClass = bg ? `role-choice-${bg}` : '';

    if (isLocked) {
      return `
        <div class="choice choice-locked ${extra}glow-red" style="animation-delay:${i*0.07}s">
          ${ci}
          <span class="c-emoji" style="filter:grayscale(1);opacity:0.4">${ch.emoji}</span>
          <div class="c-title" style="opacity:0.4">${ch.title}</div>
          <div class="c-desc locked-reason">🔒 ${lockReason}</div>
          <span class="c-tag tag-red">LOCKED</span>
        </div>`;
    }
    return `
      <div class="choice ${extra}${roleClass} glow-${ch.glow||'purple'}" onclick="pick('${ch.key}','${ch.val}','${ch.theme||''}')" style="animation-delay:${i*0.07}s">
        ${ci}
        <span class="c-emoji">${ch.emoji}</span>
        <div class="c-title">${ch.title}</div>
        <div class="c-desc">${ch.desc}</div>
        <span class="c-tag tag-${ch.tag||'purple'}">${ch.tagLabel}</span>
      </div>`;
  }).join('');
}

function getLockReason(key, val) {
  const reasons = {
    college_top: 'No coaching institute access. Entrance exam fee unaffordable.',
    career_start_corporate: 'Referral required. No alumni network.',
    career_growth_climb: 'Leadership track requires sponsor. No one advocates for you.',
    personal_travel: 'Discretionary income unavailable.',
    career_start_govt: 'Exam prep costs ₹50k. No savings.',
  };
  return reasons[`${key}_${val}`] || 'System barriers prevent access at this bias level.';
}

/* ─── CONSEQUENCE TOAST ─── */
function showConsequenceToast(consequence) {
  if (!consequence) return;
  const existing = document.getElementById('consequence-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'consequence-toast';
  toast.className = `consequence-toast ${consequence.rewardClass}`;
  toast.innerHTML = `
    <div class="ct-title">${consequence.title}</div>
    <div class="ct-msg">${consequence.msg}</div>
    <div class="ct-reward">${consequence.reward}</div>
  `;
  document.getElementById('app').insertBefore(toast, document.getElementById('qcard'));
  setTimeout(() => { toast.classList.add('toast-visible'); }, 50);
  setTimeout(() => { toast.classList.remove('toast-visible'); setTimeout(()=>toast.remove(),500); }, 4500);
}

/* ─── PICK A CHOICE ─── */
function pick(key, val, theme) {
  const c = chars[activeChar];
  // Save snapshot for undo
  c.history.push({
    state: JSON.parse(JSON.stringify(c.state)),
    trail: JSON.parse(JSON.stringify(c.trail)),
    biasScore: c.biasScore,
    effortTotal: c.effortTotal,
    rewardTotal: c.rewardTotal
  });

  c.state[key] = val;
  c.trail.push({ key, val });

  // Bias accumulation
  const bg = c.state.background || 'middle';
  const biasAdd = (BIAS_WEIGHTS[bg]?.[key] || 0);
  c.biasScore = Math.max(0, c.biasScore + biasAdd);

  // Effort tracking
  const effortMult = EFFORT_COST[bg]?.[key] || 1;
  c.effortTotal += effortMult * 10;
  c.rewardTotal += 10; // base reward same for all

  if (theme) applyTheme(theme);
  renderTrail();
  updateCharTabs();
  updateBiasMeter();
  applyRoleDistortion();

  document.getElementById('back-btn').style.display = 'flex';

  // Show consequence toast
  const consequence = getConsequence(key, val, bg);
  showConsequenceToast(consequence);

  // Dual mode switch
  if (gameMode === 'dual' && isComplete('a') && !isComplete('b') && activeChar === 'a') {
    activeChar = 'b';
    chars.b = { state:{}, trail:[], history:[], biasScore:0, effortTotal:0, rewardTotal:0 };
    applyTheme('default');
    applyRoleDistortion();
    renderTrail();
    updateCharTabs();
    updateBiasMeter();
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
  document.getElementById('qlabel').textContent = 'Player B Begins';
  document.getElementById('qicon').textContent = '🟠';
  document.getElementById('qtitle').textContent = 'Now play as Player B';
  document.getElementById('qsub').textContent = "Player A's journey is locked in. Make different choices — or the same ones. Watch how outcomes diverge.";
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
  const w = document.getElementById('choices-wrap');
  // Background choice has NO bias meter yet — neutral start
  document.getElementById('bias-meter-wrap').style.display = 'none';
  w.innerHTML = `
    <div class="choice glow-green role-choice-privileged" onclick="pick('background','privileged','privileged')" style="animation-delay:0s">
      <span class="c-emoji">🏠</span>
      <div class="c-title">Privileged</div>
      <div class="c-desc">Stable family, elite school, full support. Every door is already marked "Welcome."</div>
      <span class="c-tag tag-green">HEAD START</span>
    </div>
    <div class="choice glow-blue role-choice-middle" onclick="pick('background','middle','middle')" style="animation-delay:0.07s">
      <span class="c-emoji">🏘️</span>
      <div class="c-title">Middle Class</div>
      <div class="c-desc">Average resources. Hard work determines your rise — but the runway is shorter.</div>
      <span class="c-tag tag-blue">BALANCED</span>
    </div>
    <div class="choice glow-red role-choice-underprivileged" onclick="pick('background','underprivileged','underprivileged')" style="animation-delay:0.14s">
      <span class="c-emoji">🏚️</span>
      <div class="c-title">Underdog</div>
      <div class="c-desc">Tough start, scarce resources — but the kind of hunger that privilege can't buy.</div>
      <span class="c-tag tag-red">RESILIENT</span>
    </div>`;
}

/* ─── CHAPTER 2: SCHOOL ─── */
function showSchool() {
  setProgress(2);
  const s = chars[activeChar].state;
  const cfgs = {
    privileged:      { q:'Your school has everything. How do you show up?',         sub:'Tutors, labs, connections — the system is designed for you.' },
    middle:          { q:'School is fair but not exceptional. Your move?',           sub:'No silver spoon — just your effort and attitude.' },
    underprivileged: { q:'School is tough. Resources are scarce. What drives you?', sub:'Every textbook matters. Every grade costs twice as much.' }
  };
  const cfg = cfgs[s.background];
  setCard('Chapter 2 · School', '🏫', cfg.q, cfg.sub);
  renderChoices([
    { key:'school', val:'excel',    theme:'excel',    emoji:'🔥', title: s.background==='underprivileged'?'Fight Through':'Maximize It', desc: s.background==='privileged'?'Top grades, tutors, perfect scores — results amplified':'Self-study, iron discipline — same effort, less return', tag:'green', glow:'green', tagLabel: s.background==='underprivileged'?'WARRIOR':'OVERACHIEVER' },
    { key:'school', val:'balanced', theme:'balanced', emoji:'⚖️', title:'Find Balance', desc: s.background==='underprivileged'?'Balance means surviving, not thriving':'Good grades, friends, some hobbies — stay sane', tag:'blue', glow:'blue', tagLabel:'GROUNDED' },
    { key:'school', val:'struggle', theme:'struggle', emoji: s.background==='underprivileged'?'🏭':'🎮', title: s.background==='underprivileged'?'Work to Survive':'Coast Along', desc: s.background==='underprivileged'?'Family needs income. Studies suffer — not from choice, from necessity.':'Lean on advantages. Minimal effort.', tag: s.background==='underprivileged'?'red':'yellow', glow: s.background==='underprivileged'?'red':'yellow', tagLabel: s.background==='underprivileged'?'SACRIFICE':'COMPLACENT' },
  ]);
}

/* ─── CHAPTER 2B: EXTRACURRICULARS ─── */
function showExtra() {
  setProgress(3);
  const s = chars[activeChar].state;
  const bg = s.background;
  setCard('Chapter 2 · Interests', '🎯', 'What do you do outside class?', bg==='underprivileged'?'Options cost money or time you may not have.':'Beyond curriculum — this shapes who you become.');
  const choices = [
    { key:'extra', val:'sports', emoji:'⚽', title:'Sports & Fitness', desc: bg==='underprivileged'?'Equipment costs. Travel costs. No school sponsorship.':'Teamwork, discipline, possible scholarships', tag:'blue', glow:'blue', tagLabel:'ATHLETE' },
    { key:'extra', val:'arts',   emoji:'🎨', title:'Arts & Music',     desc: bg==='underprivileged'?'No instrument, no classes — passion without infrastructure.':'Creative edge, unique portfolio, passion', tag:'purple', glow:'purple', tagLabel:'CREATIVE' },
    { key:'extra', val:'study',  emoji:'📖', title:'Competitive Study',desc: bg==='underprivileged'?'No coaching. Self-taught. Starting 6 months behind peers.':'Olympiads, entrance prep, academic edge', tag:'green', glow:'green', tagLabel:'SCHOLAR' },
  ];
  if (s.school === 'struggle' || bg === 'underprivileged') {
    choices.push({ key:'extra', val:'work', emoji:'💰', title:'Part-Time Job', desc:'Earn ₹3k/month to support family. Lose 20 hrs/week of study time.', tag:'yellow', glow:'yellow', tagLabel:'HUSTLER' });
  }
  renderChoices(choices);
}

/* ─── CHAPTER 3: COLLEGE ─── */
function showCollege() {
  setProgress(4);
  const s = chars[activeChar].state;
  const strong = s.school === 'excel', priv = s.background === 'privileged';
  let q, sub;
  if (strong && priv) { q='Every door is open. Which do you walk through?'; sub='Top grades + resources = maximum choice.'; }
  else if (strong)    { q='Your hard work earned you options. Choose wisely.'; sub='Merit opened these doors — you earned them.'; }
  else                { q='Not the strongest start. But there is still a path.'; sub='Character, not credentials, defines what comes next.'; }
  setCard('Chapter 3 · After School', '🎓', q, sub);
  let choices = [];
  if (strong) {
    choices = [
      { key:'college', val:'top',       theme:'top_college', emoji:'🏛️', title:'Top College',       desc: priv?'IIT/IIM/Ivy — elite network, premium future':'Scholarship to top college — earned against all odds', tag:'yellow', glow:'yellow', tagLabel:'ELITE' },
      { key:'college', val:'regular',   theme:'middle',      emoji:'🎓', title:'Good College',       desc:'Solid degree, reasonable cost', tag:'blue', glow:'blue', tagLabel:'SOLID' },
      { key:'college', val:'vocational',theme:'vocational',  emoji:'🔧', title:'Skill Course',       desc:'Coding bootcamp, trade — fast entry', tag:'purple', glow:'purple', tagLabel:'FAST TRACK' },
    ];
  } else {
    choices = [
      { key:'college', val:'regular',   theme:'middle',     emoji:'🎓', title:'Night College', desc:'Study while working — slow but steady', tag:'blue', glow:'blue', tagLabel:'DETERMINED' },
      { key:'college', val:'vocational',theme:'vocational', emoji:'🔧', title:'Vocational',    desc:'Earn faster, real skills, real demand', tag:'yellow', glow:'yellow', tagLabel:'PRACTICAL' },
      { key:'college', val:'work_early',theme:'work_early', emoji:'💼', title:'Start Working', desc:'Dive in — learn on the job from day one', tag:'red', glow:'red', tagLabel:'REAL WORLD' },
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
    sub = s.background==='privileged'?'Top college + family connections = wide open.':'Top college opens premium doors — you earned this.';
    choices = [
      { key:'career_start', val:'corporate', theme:'corporate', emoji:'🏢', title:'Big Corp / MNC',   desc: s.background==='privileged'?'Referral from family contact. Interview a formality.':'100 applications. 6 rounds. Finally in.', tag:'blue', glow:'blue', tagLabel:'₹₹₹' },
      { key:'career_start', val:'startup',   theme:'startup',   emoji:'🚀', title:'Hot Startup',      desc:'Equity, speed, high risk — high upside', tag:'purple', glow:'purple', tagLabel:'HIGH STAKES' },
      { key:'career_start', val:'govt',      theme:'govt',      emoji:'🏛️', title:'Civil Services',   desc:'UPSC/Government — power and security', tag:'green', glow:'green', tagLabel:'SECURE' },
    ];
  } else if (s.college==='vocational'||s.college==='work_early') {
    sub = 'Skills over degrees — the practical track.';
    choices = [
      { key:'career_start', val:'freelance', theme:'freelance', emoji:'💻', title:'Go Freelance', desc:'Build client base — no office, no ceiling', tag:'green', glow:'green', tagLabel:'FREE' },
      { key:'career_start', val:'startup',   theme:'startup',   emoji:'🚀', title:'Join Startup',  desc:'Wear many hats, grow fast', tag:'purple', glow:'purple', tagLabel:'SCRAPPY' },
      { key:'career_start', val:'corporate', theme:'corporate', emoji:'🏢', title:'Entry Level',   desc: s.background==='underprivileged'?'Entry role, while others with connections start 2 levels above.':'Steady income, climb slowly', tag:'blue', glow:'blue', tagLabel:'STABLE' },
    ];
  } else {
    choices = [
      { key:'career_start', val:'corporate', theme:'corporate', emoji:'🏢', title:'Corporate Job',  desc:'Mid-tier firm, decent salary', tag:'blue', glow:'blue', tagLabel:'STEADY' },
      { key:'career_start', val:'govt',      theme:'govt',      emoji:'🏛️', title:'Government Job', desc:'Security, pension, respect', tag:'green', glow:'green', tagLabel:'SAFE' },
      { key:'career_start', val:'startup',   theme:'startup',   emoji:'🚀', title:'Startup',        desc:'Risk it for bigger gains', tag:'purple', glow:'purple', tagLabel:'BOLD' },
      { key:'career_start', val:'freelance', theme:'freelance', emoji:'💻', title:'Self-Employed',  desc:'Start solo, build your own thing', tag:'yellow', glow:'yellow', tagLabel:'INDEPENDENT' },
    ];
  }
  setCard('Chapter 4 · Career Begins', '💼', 'Your career begins. Where do you land?', sub);
  renderChoices(choices);
}

/* ─── CHAPTER 4B: CAREER GROWTH ─── */
function showCareerGrowth() {
  setProgress(5);
  const s = chars[activeChar].state;
  const bg = s.background;
  setCard('Chapter 4 · Career Growth', '📈', '5 years in — how do you play it?', bg==='underprivileged'?`You started in ${s.career_start}, but with fewer resources and more friction.`:`You started in ${s.career_start}. Now you define your trajectory.`);
  let choices = [];
  if (s.career_start==='corporate') {
    choices = [
      { key:'career_growth', val:'climb',    theme:'top_college', emoji:'📈', title:'Climb the Ladder', desc: bg==='privileged'?'Golf with CEO. Drinks with the board. Visibility was automatic.':bg==='underprivileged'?'Did 3× the work. Credit went to colleagues with better "executive presence."':'Relentless promotions — 5 years not 3', tag:'green', glow:'green', tagLabel:'AMBITIOUS' },
      { key:'career_growth', val:'stable',   theme:'balanced',    emoji:'⚖️', title:'Work-Life Balance', desc:'Protect your energy. Good pay, steady pace.', tag:'blue', glow:'blue', tagLabel:'BALANCED' },
      { key:'career_growth', val:'pivot',    theme:'vocational',  emoji:'🔄', title:'Career Pivot',      desc:'Upskill, jump industries', tag:'yellow', glow:'yellow', tagLabel:'BRAVE' },
      { key:'career_growth', val:'business', theme:'business',    emoji:'🏗️', title:'Start a Business',  desc: bg==='underprivileged'?'No savings, no safety net — every rupee at risk.':'Build while employed, then leap', tag:'purple', glow:'purple', tagLabel:'FOUNDER' },
    ];
  } else if (s.career_start==='startup') {
    choices = [
      { key:'career_growth', val:'climb',    theme:'startup',   emoji:'🚀', title:'Go All-In',     desc:"Bet everything on the startup's success", tag:'yellow', glow:'yellow', tagLabel:'ALL-IN' },
      { key:'career_growth', val:'business', theme:'business',  emoji:'🏗️', title:'Start Your Own',desc:'Use startup knowledge to build yours', tag:'green', glow:'green', tagLabel:'FOUNDER' },
      { key:'career_growth', val:'pivot',    theme:'corporate', emoji:'🔄', title:'Join Big Co.',  desc:'Cash in experience, get stability', tag:'blue', glow:'blue', tagLabel:'PIVOT' },
      { key:'career_growth', val:'stable',   theme:'balanced',  emoji:'😮‍💨', title:'Step Back',    desc:'Burnout is real — recharge', tag:'red', glow:'red', tagLabel:'RECHARGE' },
    ];
  } else if (s.career_start==='freelance') {
    choices = [
      { key:'career_growth', val:'business', theme:'business',  emoji:'🏗️', title:'Build an Agency',desc:'Hire, systemise, scale', tag:'green', glow:'green', tagLabel:'SCALE UP' },
      { key:'career_growth', val:'stable',   theme:'freelance', emoji:'⚖️', title:'Stay Freelance', desc:'Steady clients, freedom', tag:'blue', glow:'blue', tagLabel:'FREEDOM' },
      { key:'career_growth', val:'pivot',    theme:'corporate', emoji:'🔄', title:'Go Corporate',   desc:'Trade freedom for stability', tag:'yellow', glow:'yellow', tagLabel:'STABILITY' },
    ];
  } else {
    choices = [
      { key:'career_growth', val:'climb',    theme:'top_college', emoji:'📈', title:'Get Promoted',   desc: bg==='underprivileged'?'Ace exams. Work twice as hard. Get half the credit.':'Ace exams, move up the ranks', tag:'blue', glow:'blue', tagLabel:'DEDICATED' },
      { key:'career_growth', val:'stable',   theme:'balanced',    emoji:'⚖️', title:'Enjoy Security', desc:'Job security + personal time', tag:'green', glow:'green', tagLabel:'CONTENT' },
      { key:'career_growth', val:'business', theme:'business',    emoji:'🏗️', title:'Side Hustle',    desc: bg==='underprivileged'?'No capital. No safety net. Still worth trying?':'Build something while your job stays safe', tag:'purple', glow:'purple', tagLabel:'SMART' },
    ];
  }
  renderChoices(choices);
}

/* ─── CHAPTER 5: RELATIONSHIP ─── */
function showRelationship() {
  setProgress(6);
  const s = chars[activeChar].state;
  const busy = s.career_growth==='climb'||s.career_growth==='business';
  setCard('Chapter 5 · Personal Life', '❤️', 'What does your heart choose?', busy?'Ambition has consumed you — but life beyond work calls.':'Stability creates space for people who matter.');
  renderChoices([
    { key:'relationship', val:'partner',      theme:'family', emoji:'💑', title:'Committed Partner', desc:'Long-term love — grow together', tag:'purple', glow:'purple', tagLabel:'TOGETHER' },
    { key:'relationship', val:'single',                       emoji:'🧘', title:'Solo Life',          desc:'Independence, self-discovery', tag:'blue', glow:'blue', tagLabel:'FREE SPIRIT' },
    { key:'relationship', val:'family_focus', theme:'family', emoji:'👨‍👩‍👧', title:'Start a Family',  desc:'Partner, children, home first', tag:'green', glow:'green', tagLabel:'FAMILY' },
  ]);
}

/* ─── CHAPTER 5B: PERSONAL GROWTH ─── */
function showPersonal() {
  setProgress(6);
  const s = chars[activeChar].state;
  const bg = s.background;
  const sub = s.relationship==='family_focus'?'Between parenting and life, you carve out space for…':'Beyond career — what fuels your soul?';
  setCard('Chapter 5 · Growth', '✨', 'How do you grow as a person?', sub);
  const choices = [
    { key:'personal', val:'health',    theme:'excel', emoji:'🏋️', title:'Health & Wellbeing', desc: bg==='underprivileged'?'Gym costs money. Healthy food costs money. Stress is free though.':'Mind, body, spirit — your greatest asset', tag:'green', glow:'green', tagLabel:'VITAL' },
    { key:'personal', val:'community',               emoji:'🤝', title:'Give Back',            desc:'Mentor, volunteer, build beyond yourself', tag:'purple', glow:'purple', tagLabel:'PURPOSE' },
    { key:'personal', val:'creative',                emoji:'🎭', title:'Creative Pursuits',    desc:'Music, writing, art — passion over profit', tag:'yellow', glow:'yellow', tagLabel:'ARTFUL' },
  ];
  if (s.relationship!=='family_focus') {
    choices.unshift({ key:'personal', val:'travel', emoji:'✈️', title:'Explore the World', desc: bg==='underprivileged'?'Passport, visa, tickets — a year\'s savings for one trip.':'New cultures, new perspectives, stories forever', tag:'blue', glow:'blue', tagLabel:'EXPLORER' });
  }
  renderChoices(choices);
}

/* ─── CHAPTER 6: LIFE EVENT ─── */
function showEvent() {
  setProgress(7);
  const s = chars[activeChar].state;
  const isHigh = (s.college==='top'&&s.career_growth==='climb')||s.career_growth==='business';
  const isLow  = s.school==='struggle'&&(s.college==='work_early'||s.college==='vocational');
  let q, sub, choices;
  if (isHigh) {
    q='From strength, life sends a curveball.'; sub='Your resources help — but wisdom matters more.';
    choices = [
      { key:'event', val:'crisis',      theme:'crisis',      emoji:'📉', title:'Market Crash / Layoff', desc:'Business takes a hit. Pivot or rebuild?', tag:'red', glow:'red', tagLabel:'SETBACK' },
      { key:'event', val:'opportunity', theme:'opportunity', emoji:'🌟', title:'Big Opportunity',       desc:'Acquisition, breakthrough, IPO', tag:'yellow', glow:'yellow', tagLabel:'WINDFALL' },
      { key:'event', val:'loss',                             emoji:'🕊️', title:'Family Crisis',         desc:'Health emergency — priorities shift permanently', tag:'purple', glow:'purple', tagLabel:'PERSPECTIVE' },
    ];
  } else if (isLow) {
    q="Still building — life doesn't wait."; sub='How you respond now defines the next decade.';
    choices = [
      { key:'event', val:'crisis',      theme:'crisis',      emoji:'🌊', title:'Financial Crisis', desc:'Debt, job loss — survive and adapt', tag:'red', glow:'red', tagLabel:'TOUGH' },
      { key:'event', val:'opportunity', theme:'opportunity', emoji:'🌟', title:'Lucky Break',       desc:'Right person sees your potential', tag:'green', glow:'green', tagLabel:'TURNING POINT' },
      { key:'event', val:'move',                             emoji:'🗺️', title:'Relocate',          desc:'New city, fresh start', tag:'blue', glow:'blue', tagLabel:'NEW CHAPTER' },
    ];
  } else {
    q='Mid-journey — life sends its biggest test.'; sub='Your path shapes how hard this hits.';
    choices = [
      { key:'event', val:'crisis',      theme:'crisis',      emoji:'🌊', title:'Health Crisis',     desc:'Everything changes', tag:'red', glow:'red', tagLabel:'WAKE UP' },
      { key:'event', val:'opportunity', theme:'opportunity', emoji:'🌟', title:'Dream Opportunity', desc:'Job abroad, breakthrough deal', tag:'green', glow:'green', tagLabel:'LEAP' },
      { key:'event', val:'loss',                             emoji:'🕊️', title:'Personal Loss',     desc:'Grief that reshapes your worldview', tag:'yellow', glow:'yellow', tagLabel:'GROWTH' },
      { key:'event', val:'move',                             emoji:'🗺️', title:'Relocate Abroad',   desc:'Move countries for a fresh start', tag:'blue', glow:'blue', tagLabel:'ADVENTURE' },
    ];
  }
  setCard('Chapter 6 · Life Event', '⚡', q, sub);
  renderChoices(choices);
}

/* ─── SCORING ─── */
function calcScore(s) {
  let score = 0;
  if (s.background==='privileged') score+=20;
  if (s.background==='middle')     score+=10;
  if (s.school==='excel')          score+=25;
  if (s.school==='balanced')       score+=12;
  if (s.extra==='study')           score+=10;
  if (s.extra==='work')            score+=7;
  if (s.college==='top')           score+=20;
  if (s.college==='regular')       score+=12;
  if (s.college==='vocational')    score+=10;
  if (s.career_growth==='business') score+=20;
  if (s.career_growth==='climb')    score+=15;
  if (s.event==='opportunity')      score+=15;
  if (s.personal==='health')        score+=8;
  if (s.relationship==='family_focus') score+=10;
  return Math.min(100,score);
}
function calcHappy(s) {
  return Math.min(100, 35+(s.personal==='health'?20:10)+(s.relationship==='family_focus'?15:5)+(s.event==='opportunity'?12:0)+(s.career_growth==='stable'?10:0));
}
function calcImpact(s,score) {
  return (s.personal==='community'||s.career_growth==='business'||s.event==='opportunity')?Math.min(100,score+20):Math.min(100,score-10);
}
function calcWealth(s) {
  let w=20;
  if (s.background==='privileged')  w+=30;
  if (s.background==='middle')      w+=15;
  if (s.college==='top')            w+=25;
  if (s.career_start==='corporate') w+=20;
  if (s.career_start==='startup')   w+=15;
  if (s.career_growth==='business') w+=20;
  if (s.career_growth==='climb')    w+=15;
  if (s.event==='opportunity')      w+=10;
  return Math.min(100,w);
}
function calcAccess(s) {
  let a=0;
  if (s.background==='privileged')  a+=35;
  if (s.background==='middle')      a+=18;
  if (s.college==='top')            a+=25;
  if (s.college==='regular')        a+=12;
  if (s.career_start==='corporate') a+=15;
  if (s.career_start==='govt')      a+=10;
  return Math.min(100,a);
}
function archetypeFor(score) {
  if (score>=90) return { icon:'🌟', title:'The Visionary' };
  if (score>=75) return { icon:'🏆', title:'The Achiever' };
  if (score>=55) return { icon:'⚡', title:'The Fighter' };
  if (score>=35) return { icon:'🌱', title:'The Grower' };
  return { icon:'🕊️', title:'The Survivor' };
}

/* ─── EFFORT vs OUTCOME RATIO ─── */
function calcEffortRatio(charId) {
  const c = chars[charId];
  const bg = c.state.background;
  const score = calcScore(c.state);
  const effort = c.effortTotal || 80;
  const normScore = score / 100;
  const normEffort = Math.min(1, effort / 200);
  // Higher ratio = more effort per outcome point
  return { effort: Math.round(normEffort * 100), outcome: score, ratio: (normEffort / Math.max(0.01, normScore)).toFixed(2) };
}

/* ─── SINGLE FINAL SCREEN ─── */
function showFinal() {
  document.getElementById('qcard').style.display='none';
  document.getElementById('choices-wrap').style.display='none';
  document.getElementById('connector').style.display='none';
  document.getElementById('scroll-hint').style.display='none';
  document.getElementById('back-btn').style.display='none';
  document.getElementById('bias-meter-wrap').style.display='none';

  const fw = document.getElementById('final-wrap');
  fw.style.display='flex';
  setProgress(7);

  const s = chars[activeChar].state;
  const score = calcScore(s), happy = calcHappy(s), impact = Math.max(0,calcImpact(s,score));
  const arch = archetypeFor(score);
  const bg = s.background;
  const bias = chars[activeChar].biasScore;
  const er = calcEffortRatio(activeChar);

  const subs = {
    privileged: {
      '🌟 The Visionary': 'Privilege met preparation. Every door was already open — you just had to choose which one.',
      '🏆 The Achiever':  'Resources amplified your every move. The system was built for you.',
      '⚡ The Fighter':   'Even with all the advantages, something got in the way. Rare.',
      '🌱 The Grower':    'Privilege doesn\'t guarantee success — but it softened every landing.',
      '🕊️ The Survivor': 'You had every advantage and still struggled. The system wanted you to win.'
    },
    middle: {
      '🌟 The Visionary': 'You maximised a fair but unexceptional hand. Real achievement.',
      '🏆 The Achiever':  'Smart choices and relentless effort on a level (if not generous) field.',
      '⚡ The Fighter':   'You fought — but the walls were real. Middle isn\'t neutral.',
      '🌱 The Grower':    'The runway was shorter than it looked. But you\'re still running.',
      '🕊️ The Survivor': 'The middle path has its own invisible barriers. You felt them.'
    },
    underprivileged: {
      '🌟 The Visionary': 'Against structural resistance — you built an extraordinary life. This is rarer than it should be.',
      '🏆 The Achiever':  'You worked 2× as hard for 60% of the result. That gap? The system\'s fault, not yours.',
      '⚡ The Fighter':   'Every point on your score required 3× the effort of someone privileged. Remember that.',
      '🌱 The Grower':    'The seeds you planted cost you everything to sow. The harvest will come.',
      '🕊️ The Survivor': 'The system designed this outcome. Your score doesn\'t measure your worth — it measures what was allowed.'
    }
  };
  const sub = subs[bg]?.[arch.icon+' '+arch.title] || '';

  // Effort vs outcome callout
  let effortCallout = '';
  if (bg === 'underprivileged') {
    effortCallout = `<div class="effort-callout underdog-callout">
      <div class="ec-label">⚡ EFFORT vs OUTCOME</div>
      <div class="ec-stat">You worked <strong>${Math.round(er.ratio * 100)}% harder</strong> for <strong>${score} pts</strong></div>
      <div class="ec-sub">A privileged peer making identical choices would score ~${Math.min(100,score+22)} — same decisions, different system.</div>
    </div>`;
  } else if (bg === 'privileged') {
    effortCallout = `<div class="effort-callout privileged-callout">
      <div class="ec-label">🏛️ STRUCTURAL BONUS</div>
      <div class="ec-stat">~<strong>${Math.min(25,Math.round(score*0.3))} pts</strong> came from background alone</div>
      <div class="ec-sub">An underdog making every same choice would score ~${Math.max(10,score-22)}. Same decisions. Different starting square.</div>
    </div>`;
  }

  let biasCallout = '';
  if (bias > 0) {
    biasCallout = `<div class="bias-final-bar">
      <div class="bfb-label">ACCUMULATED BIAS <span>${bias} pts</span></div>
      <div class="bfb-track"><div class="bfb-fill" style="width:${Math.min(100,bias)}%"></div></div>
      <div class="bfb-note">${bias>=60?'🔴 Severe systemic resistance encountered':bias>=30?'🟡 Moderate structural barriers faced':'🟢 Low system resistance'}</div>
    </div>`;
  }

  const icons2 = { background:'🧬', school:'🏫', extra:'🎯', college:'🎓', career_start:'💼', career_growth:'📈', relationship:'❤️', personal:'✨', event:'⚡' };

  fw.innerHTML = `
    <div class="final-card final-card-${bg}">
      <span class="final-icon">${arch.icon}</span>
      <div class="final-title">${arch.title}</div>
      <div class="final-sub">${sub}</div>
      ${effortCallout}
      <div class="stats-row">
        <div class="stat"><div class="stat-val">${score}</div><div class="stat-key">Life Score</div></div>
        <div class="stat"><div class="stat-val">${happy}%</div><div class="stat-key">Happiness</div></div>
        <div class="stat"><div class="stat-val">${impact}%</div><div class="stat-key">Impact</div></div>
      </div>
      ${biasCallout}
      <div class="path-log">
        ${chars[activeChar].trail.map(t=>`
          <div class="path-row">
            <span class="pr-icon">${icons2[t.key]||'•'}</span>
            <span class="pr-key">${t.key.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</span>
            <span class="pr-val">${TRAIL_LABELS[t.key]?.[t.val]||t.val}</span>
          </div>`).join('')}
      </div>
      <button class="replay-btn" onclick="restart()">↩ LIVE ANOTHER LIFE</button>
    </div>`;

  if (score>=75) applyTheme('opportunity');
  else if (score>=50) applyTheme('balanced');
  else applyTheme('crisis');

  // Remove distortion on final screen
  document.body.classList.remove('distort-low','distort-med','distort-high');
}

/* ─── DUAL COMPARISON FINAL SCREEN ─── */
function showComparison() {
  document.getElementById('qcard').style.display='none';
  document.getElementById('choices-wrap').style.display='none';
  document.getElementById('connector').style.display='none';
  document.getElementById('scroll-hint').style.display='none';
  document.getElementById('back-btn').style.display='none';
  document.getElementById('char-tabs').style.display='none';
  document.getElementById('theme-badge').style.display='none';
  document.getElementById('trail-wrap').style.display='none';
  document.getElementById('progress-wrap').style.display='none';
  document.getElementById('bias-meter-wrap').style.display='none';
  setProgress(7);

  const cw = document.getElementById('compare-wrap');
  cw.style.display='flex';
  applyTheme('opportunity');
  document.body.classList.remove('distort-low','distort-med','distort-high');

  const sA=chars.a.state, sB=chars.b.state;
  const scoreA=calcScore(sA), scoreB=calcScore(sB);
  const happyA=calcHappy(sA), happyB=calcHappy(sB);
  const impactA=Math.max(0,calcImpact(sA,scoreA)), impactB=Math.max(0,calcImpact(sB,scoreB));
  const wealthA=calcWealth(sA), wealthB=calcWealth(sB);
  const accessA=calcAccess(sA), accessB=calcAccess(sB);
  const archA=archetypeFor(scoreA), archB=archetypeFor(scoreB);
  const biasA=chars.a.biasScore, biasB=chars.b.biasScore;
  const erA=calcEffortRatio('a'), erB=calcEffortRatio('b');

  const insights=[];
  if (sA.background!==sB.background) {
    const labels={privileged:'a privileged background',middle:'a middle-class background',underprivileged:'an underprivileged background'};
    insights.push(`Starting point is destiny. Player A began with ${labels[sA.background]||sA.background}, Player B with ${labels[sB.background]||sB.background} — the same effort produced a ${Math.abs(scoreA-scoreB)}-point gap. Systems reward origin, not just ambition.`);
  }
  if (sA.school===sB.school&&sA.extra===sB.extra&&scoreA!==scoreB) {
    insights.push(`Identical effort, unequal outcomes. Both players made the same school and extracurricular choices — yet scores diverged by ${Math.abs(scoreA-scoreB)} points. The system amplified background, not personal choices.`);
  }
  if (sA.college!==sB.college) {
    insights.push(`College tier creates compounding privilege. Top institutions gatekeep networks, not just skills. Career paths diverged here and never converged.`);
  }
  if (accessA>accessB+15) {
    insights.push(`Systemic access explains ${Math.round(accessA-accessB)}% of Player A's advantage. This gap wasn't earned — it was inherited through privilege and compounding structural advantage.`);
  } else if (accessB>accessA+15) {
    insights.push(`Player B had ${Math.round(accessB-accessA)} fewer systemic access points — yet still scored ${scoreB}. This represents extraordinary effort against structural resistance.`);
  }
  if (biasA>biasB+20) {
    insights.push(`Player A faced ${biasA-biasB} more bias accumulation points. Every identical action cost them more effort and returned less reward — the invisible tax of systemic inequality.`);
  } else if (biasB>biasA+20) {
    insights.push(`Player B accumulated ${biasB-biasA} more bias points than Player A — meaning identical choices carried a hidden penalty for Player B throughout the journey.`);
  }
  if (insights.length===0) {
    insights.push('Two paths through the same world. Every chapter, each player faced structurally different versions of the same choices — gatekeeping dressed as meritocracy.');
    insights.push('The scoring system rewards compounding privilege. Early advantages multiply; early disadvantages compound. The gap at the end is rarely about effort — it\'s about which starting square you were handed.');
  }

  const pathKeys=['background','school','extra','college','career_start','career_growth','relationship','personal','event'];
  const keyIcons={background:'🧬',school:'🏫',extra:'🎯',college:'🎓',career_start:'💼',career_growth:'📈',relationship:'❤️',personal:'✨',event:'⚡'};
  const pcRows=pathKeys.map(k=>{
    const vA=sA[k]||'—', vB=sB[k]||'—';
    const lA=TRAIL_LABELS[k]?.[vA]||vA, lB=TRAIL_LABELS[k]?.[vB]||vB;
    const diff=vA!==vB;
    return `<div class="pc-row">
      <div class="pc-key">${keyIcons[k]||''} ${k.replace(/_/g,' ')}</div>
      <div class="pc-cell cell-a ${diff?'cell-diff-a':''}">${lA}</div>
      <div class="pc-cell cell-b ${diff?'cell-diff-b':''}">${lB}</div>
    </div>`;
  }).join('');

  function bar(a,b,key) {
    return `<div class="stat-bar-row">
      <div class="sbr-label"><span class="sl-key">${key}</span><span class="sl-vals"><span class="sl-a">A:${a}</span><span class="sl-b">B:${b}</span></span></div>
      <div class="sbr-track"><div class="sbr-fill fill-a" style="width:${a}%"></div></div>
      <div class="sbr-track" style="margin-top:3px;"><div class="sbr-fill fill-b" style="width:${b}%"></div></div>
    </div>`;
  }

  // Effort vs outcome comparison
  const sameChoices = pathKeys.filter(k=>sA[k]&&sB[k]&&sA[k]===sB[k]).length;
  const effortBanner = sameChoices>=4 ? `
    <div class="effort-compare-banner">
      <div class="ecb-title">⚠️ ${sameChoices} IDENTICAL CHOICES — DIFFERENT OUTCOMES</div>
      <div class="ecb-row">
        <div class="ecb-col col-a">
          <div class="ecb-num">${scoreA}</div>
          <div class="ecb-label">Player A result</div>
          <div class="ecb-effort">${erA.effort}% effort spent</div>
        </div>
        <div class="ecb-divider">≠</div>
        <div class="ecb-col col-b">
          <div class="ecb-num">${scoreB}</div>
          <div class="ecb-label">Player B result</div>
          <div class="ecb-effort">${erB.effort}% effort spent</div>
        </div>
      </div>
      <div class="ecb-verdict">Same choices. The system scored them differently.</div>
    </div>` : '';

  cw.innerHTML = `
    <div class="compare-header">
      <h2>The Verdict</h2>
      <p>Two lives played. The same world — built differently for each.</p>
    </div>

    ${effortBanner}

    <div class="vs-banner">
      <div class="vs-col col-a">
        <div class="vs-icon">${archA.icon}</div>
        <div class="vs-archetype a-color">${archA.title}</div>
        <div class="vs-score"><span>${scoreA}</span> life score</div>
        <div class="vs-bias">Bias accumulated: <strong>${biasA}</strong></div>
      </div>
      <div class="vs-divider">VS</div>
      <div class="vs-col col-b">
        <div class="vs-icon">${archB.icon}</div>
        <div class="vs-archetype b-color">${archB.title}</div>
        <div class="vs-score"><span>${scoreB}</span> life score</div>
        <div class="vs-bias">Bias accumulated: <strong>${biasB}</strong></div>
      </div>
    </div>

    <div class="stat-bars-wrap">
      <h3>Outcome metrics</h3>
      ${bar(scoreA,scoreB,'Life Score')}
      ${bar(happyA,happyB,'Happiness')}
      ${bar(impactA,impactB,'Impact')}
      ${bar(wealthA,wealthB,'Wealth Index')}
      ${bar(accessA,accessB,'Systemic Access')}
      ${bar(Math.max(0,100-biasA),Math.max(0,100-biasB),'Freedom from Bias')}
    </div>

    <div class="path-compare">
      <h3>Decision by decision</h3>
      <div class="pc-row" style="margin-bottom:12px;">
        <div></div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:0.62rem;font-weight:700;color:#bf00ff;padding:0 12px;">Player A</div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:0.62rem;font-weight:700;color:#ff6b00;padding:0 12px;">Player B</div>
      </div>
      ${pcRows}
    </div>

    <div class="insight-box">
      <h3>What the system revealed</h3>
      ${insights.map(i=>`<div class="insight-item">${i}</div>`).join('')}
      <div class="insight-signature">Users experience bias — not read about it.</div>
    </div>

    <div class="compare-btns">
      <button class="btn-replay replay-btn" onclick="restart()">↩ PLAY AGAIN</button>
      <button class="btn-swap" onclick="swapAndReplay()">⇄ SWAP PATHS</button>
    </div>`;
}

/* ─── SWAP AND REPLAY ─── */
function swapAndReplay() { const tmp=chars.a; chars.a=chars.b; chars.b=tmp; showComparison(); }

/* ─── RESTART ─── */
function restart() {
  chars = {
    a:{state:{},trail:[],history:[],biasScore:0,effortTotal:0,rewardTotal:0},
    b:{state:{},trail:[],history:[],biasScore:0,effortTotal:0,rewardTotal:0}
  };
  activeChar='a';
  document.getElementById('qcard').style.display='';
  document.getElementById('choices-wrap').style.display='';
  document.getElementById('connector').style.display='';
  document.getElementById('scroll-hint').style.display='';
  document.getElementById('final-wrap').style.display='none';
  document.getElementById('final-wrap').innerHTML='';
  document.getElementById('compare-wrap').style.display='none';
  document.getElementById('compare-wrap').innerHTML='';
  document.getElementById('trail-wrap').innerHTML='';
  document.getElementById('trail-wrap').style.display='';
  document.getElementById('theme-badge').style.display='';
  document.getElementById('progress-wrap').style.display='';
  document.getElementById('back-btn').style.display='none';
  document.getElementById('bias-meter-wrap').style.display='none';
  document.getElementById('app').classList.remove('role-privileged','role-middle','role-underprivileged');
  document.body.classList.remove('distort-low','distort-med','distort-high');
  const existing=document.getElementById('consequence-toast');
  if(existing) existing.remove();
  if(gameMode==='dual'){document.getElementById('char-tabs').style.display='flex';updateCharTabs();}
  applyTheme('default');
  showBackground();
}

/* ─── INIT ─── */
showBackground();