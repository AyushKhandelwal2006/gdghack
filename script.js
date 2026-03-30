/* ─── SCENE CANVAS — city + dude + plant ─── */
const sc = document.getElementById('scene-canvas');
const sCtx = sc.getContext('2d');
let scW, scH;
function resizeSc(){ scW=sc.width=window.innerWidth; scH=sc.height=window.innerHeight; }
resizeSc(); window.addEventListener('resize', resizeSc);

let sceneT = 0, gameStep = 0;

// Buildings
const BLDGS = Array.from({length:28}, (_, i) => ({
  x: i/28,
  w: 0.024 + Math.random()*0.022,
  baseH: 0.04 + Math.random()*0.04,
  maxH: 0.12 + Math.random()*0.28,
  hue: 180 + Math.random()*200,
  sat: 40 + Math.random()*30,
  wins: Array.from({length:35},()=>({lit:Math.random()>0.42,blink:Math.random()>0.85,ph:Math.random()*Math.PI*2}))
}));

// Stars
const STARS = Array.from({length:90},()=>({rx:Math.random(),ry:Math.random()*0.55,r:Math.random()*1.4+0.3,tw:Math.random()*Math.PI*2}));

// Plant
const PLANT = {
  leaves: Array.from({length:20},()=>({ph:Math.random()*Math.PI*2,orb:12+Math.random()*28,hue:105+Math.random()*55,sz:4+Math.random()*9,spd:0.006+Math.random()*0.009}))
};

// Dude
const DUDE = {x:0.05, bobPh:0, walk:0};

// Floating archetypes — far right
const ARCHS = [
  {icon:'😤',y:0.08,spd:0.38,ph:0,alpha:0},
  {icon:'💪',y:0.14,spd:0.31,ph:1.4,alpha:0},
  {icon:'🎓',y:0.21,spd:0.27,ph:2.8,alpha:0},
  {icon:'🚀',y:0.28,spd:0.44,ph:4.2,alpha:0},
  {icon:'🌟',y:0.35,spd:0.22,ph:5.6,alpha:0},
];

// Road stage icons
const ROAD_ICONS = ['🏠','🏫','🎯','🎓','💼','📈','❤️','✨','⚡'];

function drawScene(){
  sCtx.clearRect(0,0,scW,scH);
  sceneT += 0.016;
  const prog = gameStep / 9;

  // stars fade as city grows
  STARS.forEach(s=>{
    s.tw += 0.018;
    const fade = Math.max(0.04, 1 - prog*0.75);
    sCtx.beginPath(); sCtx.arc(s.rx*scW, s.ry*scH, s.r*(0.55+Math.sin(s.tw)*0.45),0,Math.PI*2);
    sCtx.fillStyle=`rgba(255,255,255,${(0.1+Math.sin(s.tw)*0.1)*fade})`; sCtx.fill();
  });

  // moon
  const moonA = Math.max(0, 0.65 - prog*0.85);
  if(moonA>0.01){
    sCtx.globalAlpha=moonA;
    sCtx.fillStyle='rgba(255,248,200,0.88)';
    sCtx.beginPath();sCtx.arc(scW*0.86,scH*0.07,18,0,Math.PI*2);sCtx.fill();
    sCtx.fillStyle='#090910';
    sCtx.beginPath();sCtx.arc(scW*0.872,scH*0.065,14,0,Math.PI*2);sCtx.fill();
    sCtx.globalAlpha=1;
  }

  const baseY = scH*0.8;

  // city
  if(prog>0.04){
    BLDGS.forEach((b,i)=>{
      const t2 = Math.max(0,Math.min(1,(prog*1.5 - i*0.035)));
      const h = (b.baseH + (b.maxH - b.baseH)*t2) * scH;
      if(h<3) return;
      const bx = b.x * scW;
      const bw = b.w * scW;
      const by = baseY - h;

      // building body — neon-tinted dark
      const bg = sCtx.createLinearGradient(bx,by,bx,by+h);
      bg.addColorStop(0,`hsla(${b.hue},${b.sat}%,22%,0.88)`);
      bg.addColorStop(1,`hsla(${b.hue},${b.sat-10}%,10%,0.96)`);
      sCtx.fillStyle=bg;
      sCtx.beginPath();sCtx.rect(bx,by,bw,h);sCtx.fill();

      // neon edge glow
      sCtx.strokeStyle=`hsla(${b.hue},90%,60%,${0.15+t2*0.12})`;
      sCtx.lineWidth=0.8;
      sCtx.beginPath();sCtx.rect(bx,by,bw,h);sCtx.stroke();

      // antenna
      if(t2>0.55){
        sCtx.strokeStyle=`hsla(${b.hue},80%,60%,0.35)`;sCtx.lineWidth=0.9;
        sCtx.beginPath();sCtx.moveTo(bx+bw/2,by);sCtx.lineTo(bx+bw/2,by-6);sCtx.stroke();
        const blink = 0.4+Math.sin(sceneT*2.2+(b.hue*0.1))*0.55;
        sCtx.fillStyle=`hsla(${b.hue+20},100%,65%,${blink*t2})`;
        sCtx.beginPath();sCtx.arc(bx+bw/2,by-6,1.8,0,Math.PI*2);sCtx.fill();
      }

      // windows
      const cols=Math.max(1,Math.floor(bw/6));
      const ww=3,wh=3;
      b.wins.forEach((w,wi)=>{
        const row=Math.floor(wi/cols), col=wi%cols;
        if(col>=cols) return;
        const wx=bx+2+col*(ww+2.5);
        const wy=by+4+row*(wh+3.5);
        if(wy+wh>by+h-3) return;
        const lit=w.blink?(Math.sin(sceneT*1.8+w.ph)>0&&w.lit):w.lit;
        sCtx.fillStyle=lit?`hsla(${b.hue+15},90%,72%,0.82)`:`rgba(0,0,0,0.3)`;
        sCtx.beginPath();sCtx.rect(wx,wy,ww,wh);sCtx.fill();
      });
    });
  }

  // road
  const rL=scW*0.04, rR=scW*0.96;
  sCtx.fillStyle='rgba(18,12,30,0.92)';
  sCtx.beginPath();sCtx.rect(rL,baseY-8,rR-rL,scH-baseY+8);sCtx.fill();

  // road progress glow — neon yellow track
  if(prog>0){
    const px = rL+(rR-rL)*prog*0.96;
    const pg=sCtx.createLinearGradient(rL,0,px,0);
    pg.addColorStop(0,'rgba(255,225,53,0)');
    pg.addColorStop(0.6,'rgba(255,225,53,0.12)');
    pg.addColorStop(1,'rgba(255,225,53,0.32)');
    sCtx.fillStyle=pg;
    sCtx.beginPath();sCtx.rect(rL,baseY-8,px-rL,5);sCtx.fill();
  }

  // dashes
  sCtx.strokeStyle='rgba(255,225,53,0.18)';sCtx.lineWidth=1.2;sCtx.setLineDash([12,10]);
  sCtx.beginPath();sCtx.moveTo(rL,baseY-2);sCtx.lineTo(rR,baseY-2);sCtx.stroke();
  sCtx.setLineDash([]);

  // stage markers
  ROAD_ICONS.forEach((icon,i)=>{
    const sx = rL+(rR-rL)*(i/8)*0.96;
    const passed = prog*9>i;
    sCtx.strokeStyle=passed?'rgba(255,225,53,0.7)':'rgba(255,255,255,0.12)';sCtx.lineWidth=1;
    sCtx.beginPath();sCtx.moveTo(sx,baseY-8);sCtx.lineTo(sx,baseY-28);sCtx.stroke();
    if(passed){
      sCtx.fillStyle='rgba(255,225,53,0.85)';
      sCtx.beginPath();sCtx.arc(sx,baseY-30,7,0,Math.PI*2);sCtx.fill();
    } else {
      sCtx.strokeStyle='rgba(255,255,255,0.1)';sCtx.lineWidth=1;
      sCtx.beginPath();sCtx.arc(sx,baseY-30,7,0,Math.PI*2);sCtx.stroke();
    }
    sCtx.font='10px serif';sCtx.textAlign='center';sCtx.textBaseline='middle';
    sCtx.fillText(icon,sx,baseY-30);
  });

  // dude
  const targetX = rL + (rR-rL)*prog*0.96;
  DUDE.x += (targetX - DUDE.x) * 0.018;
  DUDE.walk++;
  DUDE.bobPh += 0.14;
  const bob = Math.sin(DUDE.bobPh)*2.5;
  const dx=DUDE.x, dy=baseY-26+bob;
  const ls=Math.sin(DUDE.walk*0.25)*10;

  // shadow
  sCtx.fillStyle='rgba(0,0,0,0.2)';
  sCtx.beginPath();sCtx.ellipse(dx,baseY-4,8,3,0,0,Math.PI*2);sCtx.fill();
  // legs
  sCtx.strokeStyle='#ffe135';sCtx.lineWidth=2.8;sCtx.lineCap='round';
  sCtx.beginPath();sCtx.moveTo(dx-3,dy+8);sCtx.lineTo(dx-4-ls*0.4,dy+17);sCtx.stroke();
  sCtx.beginPath();sCtx.moveTo(dx+3,dy+8);sCtx.lineTo(dx+4+ls*0.4,dy+17);sCtx.stroke();
  // shoes — neon red
  sCtx.fillStyle='#ff3d5a';
  sCtx.beginPath();sCtx.ellipse(dx-4-ls*0.4,dy+18,5,2.5,0,0,Math.PI*2);sCtx.fill();
  sCtx.beginPath();sCtx.ellipse(dx+4+ls*0.4,dy+18,5,2.5,0,0,Math.PI*2);sCtx.fill();
  // body — sharp rectangle, neon yellow suit
  sCtx.fillStyle='#ffe135';
  sCtx.beginPath();sCtx.rect(dx-6.5,dy-10,13,17);sCtx.fill();
  // lapels
  sCtx.fillStyle='#0d0d0d';
  sCtx.beginPath();sCtx.moveTo(dx,dy-10);sCtx.lineTo(dx-4,dy-2);sCtx.lineTo(dx,dy-4);sCtx.closePath();sCtx.fill();
  sCtx.beginPath();sCtx.moveTo(dx,dy-10);sCtx.lineTo(dx+4,dy-2);sCtx.lineTo(dx,dy-4);sCtx.closePath();sCtx.fill();
  // tie
  sCtx.fillStyle='#ff3d5a';
  sCtx.beginPath();sCtx.moveTo(dx-1.5,dy-7);sCtx.lineTo(dx+1.5,dy-7);sCtx.lineTo(dx+2,dy+2);sCtx.lineTo(dx,dy+5);sCtx.lineTo(dx-2,dy+2);sCtx.closePath();sCtx.fill();
  // arms
  sCtx.strokeStyle='#ffe135';sCtx.lineWidth=2.8;
  sCtx.beginPath();sCtx.moveTo(dx-6.5,dy-7);sCtx.lineTo(dx-12,dy+ls*0.3);sCtx.stroke();
  sCtx.beginPath();sCtx.moveTo(dx+6.5,dy-7);sCtx.lineTo(dx+12,dy-ls*0.3);sCtx.stroke();
  // briefcase
  sCtx.fillStyle='rgba(255,255,255,0.12)';sCtx.strokeStyle='rgba(255,255,255,0.3)';sCtx.lineWidth=0.8;
  sCtx.beginPath();sCtx.rect(dx+9,dy-2,8,6);sCtx.fill();sCtx.stroke();
  // head — paper white
  sCtx.fillStyle='#f5f0e0';
  sCtx.beginPath();sCtx.arc(dx,dy-19,9,0,Math.PI*2);sCtx.fill();
  // eyes — solid dots
  sCtx.fillStyle='#0d0d0d';
  sCtx.beginPath();sCtx.arc(dx-3,dy-20,1.5,0,Math.PI*2);sCtx.fill();
  sCtx.beginPath();sCtx.arc(dx+3,dy-20,1.5,0,Math.PI*2);sCtx.fill();
  // smile
  sCtx.strokeStyle='#0d0d0d';sCtx.lineWidth=1.2;
  sCtx.beginPath();sCtx.arc(dx,dy-18,3.2,0.15,Math.PI-0.15);sCtx.stroke();
  // hat — black boxy
  sCtx.fillStyle='#0d0d0d';
  sCtx.beginPath();sCtx.rect(dx-7,dy-31,14,5);sCtx.fill();
  sCtx.beginPath();sCtx.rect(dx-5,dy-46,10,17);sCtx.fill();
  // hat band — neon red
  sCtx.fillStyle='#ff3d5a';
  sCtx.beginPath();sCtx.rect(dx-5,dy-33,10,3);sCtx.fill();

  // speech bubble at intervals
  if(prog>0.06 && Math.sin(sceneT*0.18)*0.5+0.5>0.96){
    const bubbles=['Let\'s go!','Hustling!','Stay grinding!','Degree locked!','First job!','Level up!','Love life!','Growing daily!','Final chapter!'];
    const si=Math.min(8,Math.round(prog*9));
    const txt=bubbles[si];
    sCtx.font='bold 8.5px Karla,sans-serif';
    const tw=sCtx.measureText(txt).width+14;
    sCtx.fillStyle='#f5f0e0';
    sCtx.beginPath();sCtx.rect(dx-tw/2,dy-62,tw,18);sCtx.fill();
    sCtx.fillStyle='#f5f0e0';
    sCtx.beginPath();sCtx.moveTo(dx-4,dy-44);sCtx.lineTo(dx+4,dy-44);sCtx.lineTo(dx,dy-37);sCtx.fill();
    sCtx.fillStyle='#0d0d0d';sCtx.textAlign='center';sCtx.textBaseline='middle';
    sCtx.fillText(txt,dx,dy-53);
  }

  // plant — bottom-left corner
  const px=58, py=scH-50;
  const g=Math.min(1,prog*1.4);
  if(g>0.02){
    // pot — pixel-art style
    sCtx.fillStyle='#3a2010';sCtx.beginPath();sCtx.rect(px-13,py-10,26,14);sCtx.fill();
    sCtx.fillStyle='#5a3020';sCtx.beginPath();sCtx.rect(px-11,py-14,22,6);sCtx.fill();
    sCtx.strokeStyle='rgba(255,225,53,0.3)';sCtx.lineWidth=0.8;
    sCtx.beginPath();sCtx.rect(px-13,py-10,26,14);sCtx.stroke();

    // trunk
    const th=85*g;
    sCtx.strokeStyle='#5a3a20';sCtx.lineWidth=4;sCtx.lineCap='round';
    sCtx.beginPath();sCtx.moveTo(px,py-12);
    sCtx.bezierCurveTo(px+Math.sin(sceneT*0.32)*5,py-th*0.35, px-Math.sin(sceneT*0.22)*4,py-th*0.7, px,py-th);
    sCtx.stroke();

    // branches
    if(g>0.22){
      const nb=Math.floor(g*5);
      for(let i=0;i<nb;i++){
        const frac=(i+1)/(nb+1);
        const bsy=py-th*frac;
        const bsx=px+Math.sin(sceneT*0.32)*4*frac;
        const ang=(i%2===0?1:-1)*(0.55+frac*0.3);
        const blen=20*g*(1-frac*0.25);
        sCtx.strokeStyle='rgba(80,55,25,0.75)';sCtx.lineWidth=1.8;
        sCtx.beginPath();sCtx.moveTo(bsx,bsy);
        sCtx.lineTo(bsx+Math.cos(Math.PI/2+ang)*blen, bsy-Math.sin(Math.PI/2+ang)*blen);
        sCtx.stroke();
        if(g>0.38){
          const lx=bsx+Math.cos(Math.PI/2+ang)*blen, ly=bsy-Math.sin(Math.PI/2+ang)*blen;
          sCtx.fillStyle=`hsla(${118+i*18},68%,40%,0.82)`;
          sCtx.beginPath();sCtx.ellipse(lx,ly,7*g,4*g,ang,0,Math.PI*2);sCtx.fill();
        }
      }
    }

    // crown leaves
    PLANT.leaves.forEach(l=>{
      if(g<0.45) return;
      l.ph+=l.spd;
      const lx=px+Math.cos(l.ph)*l.orb*g, ly=(py-th)+Math.sin(l.ph*0.82)*l.orb*g*0.55;
      sCtx.save();sCtx.translate(lx,ly);sCtx.rotate(l.ph);
      sCtx.fillStyle=`hsla(${l.hue},70%,42%,0.75)`;
      sCtx.beginPath();sCtx.ellipse(0,0,l.sz,l.sz*0.45,0,0,Math.PI*2);sCtx.fill();
      sCtx.restore();
    });

    // fruits/stars at bloom
    if(g>0.68){
      const fc=Math.floor((g-0.68)/0.32*8);
      for(let i=0;i<fc;i++){
        const fa=(i/8)*Math.PI*2+sceneT*0.2;
        const fx=px+Math.cos(fa)*26*g, fy=(py-th)+Math.sin(fa*0.9)*13*g;
        sCtx.font=`${9+g*4}px serif`;sCtx.textAlign='center';sCtx.textBaseline='middle';
        sCtx.fillText(['⭐','🍎','🌸','✨','🍀','💛','🌺'][i%7],fx,fy);
      }
    }

    // plant label
    sCtx.font='bold 8px Karla,sans-serif';sCtx.textAlign='center';
    const plabs=['🌱 SEED','🌿 GROWING','🌳 THRIVING','🏆 BLOOMING'];
    sCtx.fillStyle='rgba(255,225,53,0.45)';
    sCtx.fillText(plabs[Math.min(3,Math.floor(g*4))],px,py+12);
  }

  // floating archetypes — right side
  if(prog>0.12){
    const targetA=Math.min(1,(prog-0.12)*2.5);
    ARCHS.forEach((a,i)=>{
      a.alpha+=(targetA-a.alpha)*0.04;
      const ax=scW*0.94+Math.sin(sceneT*a.spd+a.ph)*14;
      const ay=a.y*scH+Math.cos(sceneT*a.spd*0.7+a.ph)*10;
      const bubble=sCtx.createRadialGradient(ax,ay,0,ax,ay,22);
      bubble.addColorStop(0,`rgba(255,225,53,${0.12*a.alpha})`);
      bubble.addColorStop(1,'rgba(0,0,0,0)');
      sCtx.fillStyle=bubble;sCtx.beginPath();sCtx.arc(ax,ay,22,0,Math.PI*2);sCtx.fill();
      sCtx.globalAlpha=a.alpha*0.85;
      sCtx.font='20px serif';sCtx.textAlign='center';sCtx.textBaseline='middle';
      sCtx.fillText(a.icon,ax,ay);
      sCtx.globalAlpha=1;
    });
  }

  requestAnimationFrame(drawScene);
}
drawScene();

/* ─── THEMES ─── */
const CHAPTERS = {
  default:         {label:'CHAPTER 0',text:'Your universe awaits — choose your origin',dot:'#ffe135'},
  privileged:      {label:'CH.1 — ORIGINS',text:'Privileged path — all doors open',dot:'#00e5a0'},
  middle:          {label:'CH.1 — ORIGINS',text:'Middle class — effort decides everything',dot:'#00b8ff'},
  underprivileged: {label:'CH.1 — ORIGINS',text:'Underdog rising — hunger over everything',dot:'#ff3d5a'},
  excel:           {label:'CH.2 — SCHOOL',text:'Scholar aura — maximum effort',dot:'#00e5a0'},
  balanced:        {label:'CH.2 — SCHOOL',text:'Balanced approach — steady growth',dot:'#00b8ff'},
  struggle:        {label:'CH.2 — SCHOOL',text:'Fighter\'s grit — grinding daily',dot:'#ff3d5a'},
  top_college:     {label:'CH.3 — COLLEGE',text:'Elite track — top institution',dot:'#ffe135'},
  vocational:      {label:'CH.3 — COLLEGE',text:'Skills first — practical wins',dot:'#00b8ff'},
  work_early:      {label:'CH.3 — COLLEGE',text:'Street smart — real world hustle',dot:'#ff3d5a'},
  corporate:       {label:'CH.4 — CAREER',text:'Corporate aura — climbing the ladder',dot:'#00b8ff'},
  startup:         {label:'CH.4 — CAREER',text:'Startup energy — high risk, high reward',dot:'#c77dff'},
  govt:            {label:'CH.4 — CAREER',text:'Public servant — security & purpose',dot:'#00e5a0'},
  freelance:       {label:'CH.4 — CAREER',text:'Free spirit — own your time',dot:'#00e5a0'},
  business:        {label:'CH.4 — CAREER',text:'Builder mode — creating from scratch',dot:'#ffe135'},
  family:          {label:'CH.5 — PERSONAL',text:'Family first — love over everything',dot:'#ff3d5a'},
  opportunity:     {label:'FINAL — VERDICT',text:'Destiny unlocked — peak life achieved',dot:'#ffe135'},
  crisis:          {label:'FINAL — VERDICT',text:'Weathering the storm — resilience',dot:'#ff3d5a'},
};

function applyTheme(key){
  const t=CHAPTERS[key]||CHAPTERS.default;
  document.getElementById('cmarq-label').textContent=t.label;
  document.getElementById('cmarq-text').textContent=t.text;
  const dot=document.getElementById('cmarq-dot');
  dot.style.background=t.dot;
  dot.style.boxShadow=`0 0 8px ${t.dot}`;
}
applyTheme('default');

/* ─── GAME STATE ─── */
const TOTAL_STEPS = 9;
let gameMode='single', activeChar='a';
let chars={a:{state:{},trail:[],history:[]}, b:{state:{},trail:[],history:[]}};

const TRAIL_LABELS={
  background:{privileged:'🏠 Privileged',middle:'🏘️ Middle',underprivileged:'🏚️ Underdog'},
  school:{excel:'📚 Top',balanced:'⚖️ Balanced',struggle:'💪 Hustler'},
  extra:{sports:'⚽ Sports',arts:'🎨 Arts',study:'📖 Scholar',work:'💰 Work'},
  college:{top:'🏛️ Elite',regular:'🎓 College',vocational:'🔧 Skilled',work_early:'💼 Work Early'},
  career_start:{corporate:'🏢 Corp',startup:'🚀 Startup',govt:'🏛️ Govt',freelance:'💻 Free'},
  career_growth:{climb:'📈 Climb',stable:'⚖️ Stable',pivot:'🔄 Pivot',business:'🏗️ Founder'},
  relationship:{partner:'💑 Partner',single:'🧘 Solo',family_focus:'👨‍👩‍👧 Family'},
  personal:{travel:'✈️ Travel',health:'🏋️ Health',community:'🤝 Giver',creative:'🎭 Create'},
  event:{crisis:'🌊 Crisis',opportunity:'🌟 Seized',loss:'🕊️ Loss',move:'🗺️ Moved'}
};

// Suggestions based on choices
const SUGGESTIONS = {
  background_privileged: "💡 <b>You have a head start</b> — statistically, privileged backgrounds are 3× more likely to reach top colleges even with average grades.",
  background_underprivileged: "💡 <b>The uphill path</b> — studies show underprivileged students need to outperform privileged peers by ~30% to access the same opportunities.",
  school_struggle: "💡 <b>Recovery is possible</b> — many successful people had rough school years. Career pivots and vocational tracks can fully compensate.",
  school_excel: "💡 <b>Academic edge</b> — top school performance is the single highest-leverage move regardless of background.",
  college_top: "💡 <b>Network > Degree</b> — top college grads report that alumni networks account for 60–70% of their career advantage.",
  college_work_early: "💡 <b>Experience compounds</b> — working early sacrifices credentials but builds real-world capital that peers won't have for years.",
  career_start_startup: "💡 <b>High variance bet</b> — 90% of startups fail, but survivors gain 5–10 years of experience in 2.",
  career_growth_business: "💡 <b>Founder path</b> — highest upside but also most correlated with personal burnout. Sustainability matters.",
  event_crisis: "💡 <b>Resilience research</b> — people who face and survive a major crisis report higher life satisfaction ratings 10 years later.",
  event_opportunity: "💡 <b>Luck is prepared readiness</b> — 80% of 'lucky breaks' are opportunities recognised by people who were already building toward them.",
};

/* ─── PROGRESS — 9 STEPS FIXED ─── */
function initProgressBar(){
  const w=document.getElementById('prog-steps');
  w.innerHTML='';
  for(let i=0;i<TOTAL_STEPS;i++){
    const d=document.createElement('div');
    d.className='pstep';d.id='ps'+i;w.appendChild(d);
  }
}
initProgressBar();

function setProgress(stepNumber){
  for(let i=0;i<TOTAL_STEPS;i++){
    document.getElementById('ps'+i).classList.toggle('done',i<stepNumber);
  }
  const done=chars[activeChar].trail.length;
  document.getElementById('prog-counter').textContent=`${done} / ${TOTAL_STEPS}`;
}

function updateGameStep(){
  gameStep=Math.min(TOTAL_STEPS, chars[activeChar].trail.length);
}

function showSuggestion(key, val){
  const sk=key+'_'+val;
  const txt=SUGGESTIONS[sk];
  const bar=document.getElementById('suggestion-bar');
  const stxt=document.getElementById('sug-text');
  if(txt){ stxt.innerHTML=txt; bar.classList.add('visible'); }
  else { bar.classList.remove('visible'); }
}

/* ─── FLOW ─── */
function setMode(m){
  gameMode=m;
  document.getElementById('btn-single').classList.toggle('active',m==='single');
  document.getElementById('btn-dual').classList.toggle('active',m==='dual');
  document.getElementById('char-tabs').style.display=m==='dual'?'flex':'none';
  chars={a:{state:{},trail:[],history:[]},b:{state:{},trail:[],history:[]}};
  activeChar='a'; restart();
}

function renderTrail(){
  const w=document.getElementById('trail-wrap');
  const trail=chars[activeChar].trail;
  w.innerHTML=trail.map((t,i)=>`<div class="trail-chip ${i===trail.length-1?'chip-done':''}">${TRAIL_LABELS[t.key]?.[t.val]||t.val}</div>`).join('');
  const done=trail.length;
  document.getElementById('prog-counter').textContent=`${done} / ${TOTAL_STEPS}`;
  if(gameMode==='dual'){
    document.getElementById('tab-a-steps').textContent=`${chars.a.trail.length} / ${TOTAL_STEPS}`;
    document.getElementById('tab-b-steps').textContent=`${chars.b.trail.length} / ${TOTAL_STEPS}`;
  }
}

function goBack(){
  const c=chars[activeChar];
  if(!c.history.length) return;
  const prev=c.history.pop(); c.state=prev.state; c.trail=prev.trail;
  renderTrail(); updateCharTabs(); updateGameStep();
  document.getElementById('suggestion-bar').classList.remove('visible');
  nextStep();
}

function updateCharTabs(){
  if(gameMode!=='dual') return;
  document.getElementById('tab-a-steps').textContent=`${chars.a.trail.length} / ${TOTAL_STEPS}`;
  document.getElementById('tab-b-steps').textContent=`${chars.b.trail.length} / ${TOTAL_STEPS}`;
  document.getElementById('tab-a').classList.toggle('active-tab',activeChar==='a');
  document.getElementById('tab-b').classList.toggle('active-tab',activeChar==='b');
  document.getElementById('tab-a').classList.toggle('done-tab',isComplete('a')&&activeChar!=='a');
  document.getElementById('tab-b').classList.toggle('done-tab',isComplete('b')&&activeChar!=='b');
}

function isComplete(id){ const s=chars[id].state; return !!(s.background&&s.school&&s.extra&&s.college&&s.career_start&&s.career_growth&&s.relationship&&s.personal&&s.event); }

function setCard(label,icon,title,sub){
  document.getElementById('qlabel').textContent=label;
  document.getElementById('qicon').textContent=icon;
  document.getElementById('qtitle').textContent=title;
  document.getElementById('qsub').textContent=sub;
  const card=document.getElementById('qcard');
  card.className='card'+(gameMode==='dual'?` card-char-${activeChar}`:'');
  card.style.animation='none'; requestAnimationFrame(()=>{card.style.animation='';});
}

function renderChoices(choices){
  const w=document.getElementById('choices-wrap');
  const ci=gameMode==='dual'?`<span class="char-indicator ci-${activeChar}">CHAR ${activeChar.toUpperCase()}</span>`:'';
  const extra=gameMode==='dual'?`char-${activeChar}-choice `:'';
  w.innerHTML=choices.map((c,i)=>`
    <div class="choice ${extra}glow-${c.glow||'yellow'}" onclick="pick('${c.key}','${c.val}','${c.theme||''}')" style="animation-delay:${i*0.06}s">
      ${ci}
      <span class="c-emoji">${c.emoji}</span>
      <div class="c-title">${c.title}</div>
      <div class="c-desc">${c.desc}</div>
      <span class="c-tag tag-${c.tag||'yellow'}">${c.tagLabel}</span>
    </div>`).join('');
}

function pick(key,val,theme){
  const c=chars[activeChar];
  c.history.push({state:JSON.parse(JSON.stringify(c.state)),trail:JSON.parse(JSON.stringify(c.trail))});
  c.state[key]=val; c.trail.push({key,val});
  if(theme) applyTheme(theme);
  renderTrail(); updateCharTabs(); updateGameStep();
  showSuggestion(key,val);
  document.getElementById('back-btn').style.display='flex';
  if(gameMode==='dual'&&isComplete('a')&&!isComplete('b')&&activeChar==='a'){
    activeChar='b'; chars.b={state:{},trail:[],history:[]};
    applyTheme('default'); renderTrail(); updateCharTabs(); showCharSwitchBanner(); return;
  }
  nextStep();
}

function showCharSwitchBanner(){
  document.getElementById('choices-wrap').innerHTML='';
  const qcard=document.getElementById('qcard');
  qcard.className='card card-char-b';
  document.getElementById('qlabel').textContent='CHARACTER B BEGINS';
  document.getElementById('qicon').textContent='🟠';
  document.getElementById('qtitle').textContent='Now play as Character B';
  document.getElementById('qsub').textContent="Character A's journey is sealed. Make different choices — see how far outcomes diverge.";
  document.getElementById('back-btn').style.display='none';
  document.getElementById('suggestion-bar').classList.remove('visible');
  setTimeout(()=>{nextStep();},1800);
}

function nextStep(){
  const s=chars[activeChar].state;
  if(!s.background)    return showBackground();
  if(!s.school)        return showSchool();
  if(!s.extra)         return showExtra();
  if(!s.college)       return showCollege();
  if(!s.career_start)  return showCareerStart();
  if(!s.career_growth) return showCareerGrowth();
  if(!s.relationship)  return showRelationship();
  if(!s.personal)      return showPersonal();
  if(!s.event)         return showEvent();
  if(gameMode==='dual') showComparison(); else showFinal();
}

// ── CHAPTERS ──
function showBackground(){
  setProgress(0);
  setCard('CHAPTER 1 · ORIGINS','🌱','Where does your story begin?','Your background sets the stage — every door ahead is shaped by this first truth.');
  renderChoices([
    {key:'background',val:'privileged',theme:'privileged',emoji:'🏠',title:'Privileged',desc:'Stable family, top school, full support system',tag:'green',glow:'green',tagLabel:'Head Start'},
    {key:'background',val:'middle',theme:'middle',emoji:'🏘️',title:'Middle Class',desc:'Average resources — hard work determines your rise',tag:'blue',glow:'blue',tagLabel:'Balanced'},
    {key:'background',val:'underprivileged',theme:'underprivileged',emoji:'🏚️',title:'Underdog',desc:'Tough start, limited means — but infinite hunger',tag:'red',glow:'red',tagLabel:'Resilient'},
  ]);
}
function showSchool(){
  setProgress(1);
  const s=chars[activeChar].state;
  const cfgs={privileged:{q:'Your school has everything. How do you show up?',sub:'Tutors, labs, connections — what do you make of it?'},middle:{q:'School is fair but not exceptional. Your move?',sub:'No silver spoon — just your effort and attitude.'},underprivileged:{q:'School is tough. Resources are scarce. What drives you?',sub:'Every textbook matters. Every grade is earned twice over.'}};
  const cfg=cfgs[s.background];
  setCard('CHAPTER 2 · SCHOOL','🏫',cfg.q,cfg.sub);
  renderChoices([
    {key:'school',val:'excel',theme:'excel',emoji:'🔥',title:s.background==='underprivileged'?'Fight Through':'Maximize It',desc:s.background==='privileged'?'Top grades, tutors, perfect scores':'Self-study, iron discipline, scholarship eyes',tag:'green',glow:'green',tagLabel:s.background==='underprivileged'?'Warrior':'Overachiever'},
    {key:'school',val:'balanced',theme:'balanced',emoji:'⚖️',title:'Find Balance',desc:'Good grades, friends, some hobbies — stay sane',tag:'blue',glow:'blue',tagLabel:'Grounded'},
    {key:'school',val:'struggle',theme:'struggle',emoji:s.background==='underprivileged'?'🏭':'🎮',title:s.background==='underprivileged'?'Work to Survive':'Coast Along',desc:s.background==='underprivileged'?'Family needs you. Studies take a hit.':'Lean on advantages. Minimal effort.',tag:s.background==='underprivileged'?'red':'yellow',glow:s.background==='underprivileged'?'red':'yellow',tagLabel:s.background==='underprivileged'?'Sacrifice':'Complacent'},
  ]);
}
function showExtra(){
  setProgress(2);
  setCard('CHAPTER 2 · INTERESTS','🎯','What do you do outside class?','Beyond curriculum — this shapes who you become.');
  const choices=[
    {key:'extra',val:'sports',emoji:'⚽',title:'Sports & Fitness',desc:'Teamwork, discipline, possible scholarships',tag:'blue',glow:'blue',tagLabel:'Athlete'},
    {key:'extra',val:'arts',emoji:'🎨',title:'Arts & Music',desc:'Creative edge, unique portfolio, passion',tag:'purple',glow:'purple',tagLabel:'Creative'},
    {key:'extra',val:'study',emoji:'📖',title:'Competitive Study',desc:'Olympiads, entrance prep, academic edge',tag:'green',glow:'green',tagLabel:'Scholar'},
  ];
  const s=chars[activeChar].state;
  if(s.school==='struggle'||s.background==='underprivileged') choices.push({key:'extra',val:'work',emoji:'💰',title:'Part-Time Job',desc:'Earn, grow up fast, real-world skills',tag:'yellow',glow:'yellow',tagLabel:'Hustler'});
  renderChoices(choices);
}
function showCollege(){
  setProgress(3);
  const s=chars[activeChar].state;
  const strong=s.school==='excel',priv=s.background==='privileged';
  let q,sub;
  if(strong&&priv){q='Every door is open. Which do you walk through?';sub='Top grades + resources = maximum choice.';}
  else if(strong){q='Your hard work earned you options. Choose wisely.';sub='Merit opened these doors — you earned them.';}
  else{q='Not the strongest start. But there is still a path.';sub='Character, not credentials, defines what comes next.';}
  setCard('CHAPTER 3 · AFTER SCHOOL','🎓',q,sub);
  let choices=[];
  if(strong){choices=[{key:'college',val:'top',theme:'top_college',emoji:'🏛️',title:'Top College',desc:priv?'IIT/IIM/Ivy — elite network, premium future':'Scholarship to top college — earned not bought',tag:'yellow',glow:'yellow',tagLabel:'Elite Track'},{key:'college',val:'regular',theme:'middle',emoji:'🎓',title:priv?'Local College':'Affordable College',desc:'Good degree, manageable cost, solid outcome',tag:'blue',glow:'blue',tagLabel:'Smart Choice'},{key:'college',val:'vocational',theme:'vocational',emoji:'🔧',title:'Skill Course',desc:'Coding bootcamp, design, trade — fast entry',tag:'purple',glow:'purple',tagLabel:'Fast Track'}];}
  else{choices=[{key:'college',val:'regular',theme:'middle',emoji:'🎓',title:'Night / Part-Time College',desc:'Study while working — slow but steady wins',tag:'blue',glow:'blue',tagLabel:'Determined'},{key:'college',val:'vocational',theme:'vocational',emoji:'🔧',title:'Vocational / Trade',desc:'Earn faster, practical skills, real demand',tag:'yellow',glow:'yellow',tagLabel:'Practical'},{key:'college',val:'work_early',theme:'work_early',emoji:'💼',title:'Start Working',desc:'Dive into the workforce — learn on the job',tag:'red',glow:'red',tagLabel:'Real World'}];}
  renderChoices(choices);
}
function showCareerStart(){
  setProgress(4);
  const s=chars[activeChar].state;
  let choices=[],sub='Your education and background open specific doors.';
  if(s.college==='top'){sub='Top college opens premium doors — pick your arena.';choices=[{key:'career_start',val:'corporate',theme:'corporate',emoji:'🏢',title:'Big MNC/Corp',desc:'Fortune 500, high salary, structured growth',tag:'blue',glow:'blue',tagLabel:'₹₹₹'},{key:'career_start',val:'startup',theme:'startup',emoji:'🚀',title:'Hot Startup',desc:'Equity, speed, high risk — high upside',tag:'purple',glow:'purple',tagLabel:'High Stakes'},{key:'career_start',val:'govt',theme:'govt',emoji:'🏛️',title:'Civil Services',desc:'UPSC/Government — power and security',tag:'green',glow:'green',tagLabel:'Secure'}];}
  else if(s.college==='vocational'||s.college==='work_early'){sub='Skills over degrees — the practical track.';choices=[{key:'career_start',val:'freelance',theme:'freelance',emoji:'💻',title:'Go Freelance',desc:'Build your own client base from day one',tag:'green',glow:'green',tagLabel:'Free'},{key:'career_start',val:'startup',theme:'startup',emoji:'🚀',title:'Join a Startup',desc:'Wear many hats, learn fast, grow quick',tag:'purple',glow:'purple',tagLabel:'Scrappy'},{key:'career_start',val:'corporate',theme:'corporate',emoji:'🏢',title:'Entry Level Corp',desc:'Steady income, climb slowly from within',tag:'blue',glow:'blue',tagLabel:'Stable'}];}
  else{choices=[{key:'career_start',val:'corporate',theme:'corporate',emoji:'🏢',title:'Corporate Job',desc:'Mid-tier firm, decent salary, structure',tag:'blue',glow:'blue',tagLabel:'Steady'},{key:'career_start',val:'govt',theme:'govt',emoji:'🏛️',title:'Government Job',desc:'Security, pension, social respect',tag:'green',glow:'green',tagLabel:'Safe'},{key:'career_start',val:'startup',theme:'startup',emoji:'🚀',title:'Startup',desc:'Risk it for bigger, faster gains',tag:'purple',glow:'purple',tagLabel:'Bold'},{key:'career_start',val:'freelance',theme:'freelance',emoji:'💻',title:'Self-Employed',desc:'Start solo, build your own thing',tag:'yellow',glow:'yellow',tagLabel:'Independent'}];}
  setCard('CHAPTER 4 · CAREER BEGINS','💼','Your career begins. Where do you land?',sub);
  renderChoices(choices);
}
function showCareerGrowth(){
  setProgress(5);
  const s=chars[activeChar].state;
  setCard('CHAPTER 4 · CAREER GROWTH','📈','5 years in — how do you play it?',`Started in ${s.career_start}. Now define your trajectory.`);
  let choices=[];
  if(s.career_start==='corporate'){choices=[{key:'career_growth',val:'climb',theme:'top_college',emoji:'📈',title:'Climb the Ladder',desc:'Promotions, politics, leadership — relentless',tag:'green',glow:'green',tagLabel:'Ambitious'},{key:'career_growth',val:'stable',theme:'balanced',emoji:'⚖️',title:'Work-Life Balance',desc:'Good pay, protect your time and energy',tag:'blue',glow:'blue',tagLabel:'Balanced'},{key:'career_growth',val:'pivot',theme:'vocational',emoji:'🔄',title:'Career Pivot',desc:'Upskill aggressively, jump industries',tag:'yellow',glow:'yellow',tagLabel:'Brave'},{key:'career_growth',val:'business',theme:'business',emoji:'🏗️',title:'Start a Business',desc:'Build while employed, then take the leap',tag:'purple',glow:'purple',tagLabel:'Founder'}];}
  else if(s.career_start==='startup'){choices=[{key:'career_growth',val:'climb',theme:'startup',emoji:'🚀',title:'Go All-In',desc:"Bet everything on the startup's success",tag:'yellow',glow:'yellow',tagLabel:'All-In'},{key:'career_growth',val:'business',theme:'business',emoji:'🏗️',title:'Start Your Own',desc:'Use startup knowledge to build yours',tag:'green',glow:'green',tagLabel:'Founder'},{key:'career_growth',val:'pivot',theme:'corporate',emoji:'🔄',title:'Join Big Co.',desc:'Cash in experience, get stability + salary',tag:'blue',glow:'blue',tagLabel:'Pivot'},{key:'career_growth',val:'stable',theme:'balanced',emoji:'😮‍💨',title:'Step Back',desc:'Burnout is real — recharge and recalibrate',tag:'red',glow:'red',tagLabel:'Recharge'}];}
  else if(s.career_start==='freelance'){choices=[{key:'career_growth',val:'business',theme:'business',emoji:'🏗️',title:'Build an Agency',desc:'Hire people, systemise, scale your work',tag:'green',glow:'green',tagLabel:'Scale Up'},{key:'career_growth',val:'stable',theme:'freelance',emoji:'⚖️',title:'Stay Freelance',desc:'Steady clients, freedom, solid income',tag:'blue',glow:'blue',tagLabel:'Freedom'},{key:'career_growth',val:'pivot',theme:'corporate',emoji:'🔄',title:'Go Corporate',desc:'Trade freedom for a stable paycheck',tag:'yellow',glow:'yellow',tagLabel:'Stability'}];}
  else{choices=[{key:'career_growth',val:'climb',theme:'top_college',emoji:'📈',title:'Get Promoted',desc:'Ace exams, move up the ranks',tag:'blue',glow:'blue',tagLabel:'Dedicated'},{key:'career_growth',val:'stable',theme:'balanced',emoji:'⚖️',title:'Enjoy Security',desc:'Job security + real personal time',tag:'green',glow:'green',tagLabel:'Content'},{key:'career_growth',val:'business',theme:'business',emoji:'🏗️',title:'Side Hustle',desc:'Build something while your job stays safe',tag:'purple',glow:'purple',tagLabel:'Smart'}];}
  renderChoices(choices);
}
function showRelationship(){
  setProgress(6);
  const s=chars[activeChar].state;
  const busy=s.career_growth==='climb'||s.career_growth==='business';
  setCard('CHAPTER 5 · PERSONAL LIFE','❤️','What does your heart choose?',busy?'Ambition has consumed you — but life beyond work calls.':'Stability creates space for people who matter.');
  renderChoices([
    {key:'relationship',val:'partner',theme:'family',emoji:'💑',title:'Committed Partner',desc:'Long-term love — grow together through it all',tag:'purple',glow:'purple',tagLabel:'Together'},
    {key:'relationship',val:'single',emoji:'🧘',title:'Solo Life',desc:'Independence, self-discovery, zero compromise',tag:'blue',glow:'blue',tagLabel:'Free Spirit'},
    {key:'relationship',val:'family_focus',theme:'family',emoji:'👨‍👩‍👧',title:'Start a Family',desc:'Partner, children, a home — family first',tag:'green',glow:'green',tagLabel:'Family'},
  ]);
}
function showPersonal(){
  setProgress(7);
  const s=chars[activeChar].state;
  const sub=s.relationship==='family_focus'?'Between parenting and life, you still carve out space for…':'Beyond career and relationships — what fuels your soul?';
  setCard('CHAPTER 5 · GROWTH','✨','How do you grow as a person?',sub);
  const choices=[
    {key:'personal',val:'health',theme:'excel',emoji:'🏋️',title:'Health & Wellbeing',desc:'Mind, body, and spirit — your greatest asset',tag:'green',glow:'green',tagLabel:'Vital'},
    {key:'personal',val:'community',emoji:'🤝',title:'Give Back',desc:'Mentor, volunteer, build something beyond yourself',tag:'purple',glow:'purple',tagLabel:'Purpose'},
    {key:'personal',val:'creative',emoji:'🎭',title:'Creative Pursuits',desc:'Music, writing, art — passion over profit',tag:'yellow',glow:'yellow',tagLabel:'Artful'},
  ];
  if(s.relationship!=='family_focus') choices.unshift({key:'personal',val:'travel',emoji:'✈️',title:'Explore the World',desc:'New cultures, new perspectives, stories forever',tag:'blue',glow:'blue',tagLabel:'Explorer'});
  renderChoices(choices);
}
function showEvent(){
  setProgress(8);
  const s=chars[activeChar].state;
  const isHigh=(s.college==='top'&&s.career_growth==='climb')||s.career_growth==='business';
  const isLow=s.school==='struggle'&&(s.college==='work_early'||s.college==='vocational');
  let q,sub,choices;
  if(isHigh){q='From strength, life sends a curveball.';sub='Your resources help — but wisdom matters more.';choices=[{key:'event',val:'crisis',theme:'crisis',emoji:'📉',title:'Market Crash / Layoff',desc:'Business takes a hit. Pivot or rebuild?',tag:'red',glow:'red',tagLabel:'Setback'},{key:'event',val:'opportunity',theme:'opportunity',emoji:'🌟',title:'Big Opportunity',desc:'Acquisition, breakthrough partnership, IPO',tag:'yellow',glow:'yellow',tagLabel:'Windfall'},{key:'event',val:'loss',emoji:'🕊️',title:'Family Crisis',desc:'Health emergency — priorities permanently shift',tag:'purple',glow:'purple',tagLabel:'Perspective'}];}
  else if(isLow){q="Still building — life doesn't wait.";sub='How you respond now will define your next decade.';choices=[{key:'event',val:'crisis',theme:'crisis',emoji:'🌊',title:'Financial Crisis',desc:'Debt, job loss — survive and adapt',tag:'red',glow:'red',tagLabel:'Tough'},{key:'event',val:'opportunity',theme:'opportunity',emoji:'🌟',title:'Lucky Break',desc:'Right person sees your potential at the right time',tag:'green',glow:'green',tagLabel:'Turning Point'},{key:'event',val:'move',emoji:'🗺️',title:'Relocate',desc:'New city, fresh start, blank slate',tag:'blue',glow:'blue',tagLabel:'New Chapter'}];}
  else{q='Mid-journey — life sends its biggest test.';sub='Your path shapes how hard this hits.';choices=[{key:'event',val:'crisis',theme:'crisis',emoji:'🌊',title:'Health Crisis',desc:'You or someone close — everything changes',tag:'red',glow:'red',tagLabel:'Wake Up'},{key:'event',val:'opportunity',theme:'opportunity',emoji:'🌟',title:'Dream Opportunity',desc:'Job abroad, breakthrough deal, or big break',tag:'green',glow:'green',tagLabel:'Leap'},{key:'event',val:'loss',emoji:'🕊️',title:'Personal Loss',desc:'Grief that permanently reshapes your worldview',tag:'yellow',glow:'yellow',tagLabel:'Growth'},{key:'event',val:'move',emoji:'🗺️',title:'Relocate Abroad',desc:'Move countries for a radically fresh start',tag:'blue',glow:'blue',tagLabel:'Adventure'}];}
  setCard('CHAPTER 6 · LIFE EVENT','⚡',q,sub);
  renderChoices(choices);
}

/* ─── SCORING ─── */
function calcScore(s){let sc=0;if(s.background==='privileged')sc+=20;if(s.background==='middle')sc+=10;if(s.school==='excel')sc+=25;if(s.school==='balanced')sc+=12;if(s.extra==='study')sc+=10;if(s.extra==='work')sc+=7;if(s.college==='top')sc+=20;if(s.college==='regular')sc+=12;if(s.college==='vocational')sc+=10;if(s.career_growth==='business')sc+=20;if(s.career_growth==='climb')sc+=15;if(s.event==='opportunity')sc+=15;if(s.personal==='health')sc+=8;if(s.relationship==='family_focus')sc+=10;return Math.min(100,sc);}
function calcHappy(s){return Math.min(100,35+(s.personal==='health'?20:10)+(s.relationship==='family_focus'?15:5)+(s.event==='opportunity'?12:0)+(s.career_growth==='stable'?10:0));}
function calcImpact(s,sc){return(s.personal==='community'||s.career_growth==='business'||s.event==='opportunity')?Math.min(100,sc+20):Math.min(100,sc-10);}
function calcWealth(s){let w=20;if(s.background==='privileged')w+=30;if(s.background==='middle')w+=15;if(s.college==='top')w+=25;if(s.career_start==='corporate')w+=20;if(s.career_start==='startup')w+=15;if(s.career_growth==='business')w+=20;if(s.career_growth==='climb')w+=15;if(s.event==='opportunity')w+=10;return Math.min(100,w);}
function calcAccess(s){let a=0;if(s.background==='privileged')a+=35;if(s.background==='middle')a+=18;if(s.college==='top')a+=25;if(s.college==='regular')a+=12;if(s.career_start==='corporate')a+=15;if(s.career_start==='govt')a+=10;return Math.min(100,a);}
function archetypeFor(sc){if(sc>=90)return{icon:'🌟',title:'THE VISIONARY'};if(sc>=75)return{icon:'🏆',title:'THE ACHIEVER'};if(sc>=55)return{icon:'⚡',title:'THE FIGHTER'};if(sc>=35)return{icon:'🌱',title:'THE GROWER'};return{icon:'🕊️',title:'THE SURVIVOR'};}

/* ─── FINAL ─── */
function showFinal(){
  document.getElementById('qcard').style.display='none';
  document.getElementById('choices-wrap').style.display='none';
  document.getElementById('connector').style.display='none';
  document.getElementById('scroll-hint').style.display='none';
  document.getElementById('back-btn').style.display='none';
  document.getElementById('suggestion-bar').classList.remove('visible');
  const fw=document.getElementById('final-wrap');
  fw.style.display='flex';
  setProgress(TOTAL_STEPS);
  const s=chars[activeChar].state;
  const score=calcScore(s),happy=calcHappy(s),impact=Math.max(0,calcImpact(s,score));
  const arch=archetypeFor(score);
  const subs={'🌟 THE VISIONARY':'Privilege met preparation. You built an extraordinary, outsized life.','🏆 THE ACHIEVER':'Smart choices and relentless effort created a life of real impact.','⚡ THE FIGHTER':'You faced real walls — and still built something that mattered.','🌱 THE GROWER':'Every struggle planted seeds. Your story is still being written.','🕊️ THE SURVIVOR':'Against enormous odds, you kept going. That alone is extraordinary.'};
  const icons2={background:'🧬',school:'🏫',extra:'🎯',college:'🎓',career_start:'💼',career_growth:'📈',relationship:'❤️',personal:'✨',event:'⚡'};
  fw.innerHTML=`<div class="final-card"><span class="final-icon">${arch.icon}</span><div class="final-title">${arch.title}</div><div class="final-sub">${subs[arch.icon+' '+arch.title]||''}</div><div class="stats-row"><div class="stat"><div class="stat-val">${score}</div><div class="stat-key">Life Score</div></div><div class="stat"><div class="stat-val">${happy}%</div><div class="stat-key">Happiness</div></div><div class="stat"><div class="stat-val">${impact}%</div><div class="stat-key">Impact</div></div></div><div class="path-log">${chars[activeChar].trail.map(t=>`<div class="path-row"><span class="pr-icon">${icons2[t.key]||'•'}</span><span class="pr-key">${t.key.replace(/_/g,' ')}</span><span class="pr-val">${TRAIL_LABELS[t.key]?.[t.val]||t.val}</span></div>`).join('')}</div><button class="replay-btn" onclick="restart()">↩ LIVE ANOTHER LIFE</button></div>`;
  if(score>=75)applyTheme('opportunity');else if(score>=50)applyTheme('balanced');else applyTheme('crisis');
}

/* ─── COMPARISON ─── */
function showComparison(){
  ['qcard','choices-wrap','connector','scroll-hint','back-btn','char-tabs','chapter-marquee','trail-wrap','progress-wrap','suggestion-bar'].forEach(id=>{
    const el=document.getElementById(id);if(el){el.style.display='none';el.classList&&el.classList.remove('visible');}
  });
  setProgress(TOTAL_STEPS);
  const cw=document.getElementById('compare-wrap');
  cw.style.display='flex';
  applyTheme('opportunity');
  const sA=chars.a.state,sB=chars.b.state;
  const scoreA=calcScore(sA),scoreB=calcScore(sB);
  const happyA=calcHappy(sA),happyB=calcHappy(sB);
  const impactA=Math.max(0,calcImpact(sA,scoreA)),impactB=Math.max(0,calcImpact(sB,scoreB));
  const wealthA=calcWealth(sA),wealthB=calcWealth(sB);
  const accessA=calcAccess(sA),accessB=calcAccess(sB);
  const archA=archetypeFor(scoreA),archB=archetypeFor(scoreB);
  const insights=[];
  if(sA.background!==sB.background){const labels={privileged:'a privileged background',middle:'a middle-class background',underprivileged:'an underprivileged background'};insights.push(`Starting point is destiny. Character A began with ${labels[sA.background]||sA.background}, Character B with ${labels[sB.background]||sB.background} — the same effort produced a ${Math.abs(scoreA-scoreB)}-point score gap. Systems reward origin, not just ambition.`);}
  if(sA.college===sB.college&&sA.school!==sB.school){insights.push(`Same college, different school journeys. When institutional access is equal, school-era effort equalizes outcomes — but getting that equal access often depends on what came before school.`);}
  if(sA.college!==sB.college){const crank={top:3,regular:2,vocational:1,work_early:0};if(crank[sA.college]!==crank[sB.college])insights.push(`College tier creates compounding privilege. Top institutions don't just teach skills — they gatekeep networks. The career paths available to each character diverged here.`);}
  if(sA.career_start!==sB.career_start){insights.push(`Same ambition, different doors. The doors each character could knock on were shaped by their degree, background, and who they knew.`);}
  if(accessA>accessB+15){insights.push(`Systemic access explains ${Math.round(accessA-accessB)}% of Character A's advantage. This gap wasn't earned — it was inherited.`);}
  else if(accessB>accessA+15){insights.push(`Character B had ${Math.round(accessB-accessA)} points less systemic access — yet still achieved ${scoreB}. That represents extraordinary effort against structural resistance.`);}
  if(scoreA!==scoreB&&sA.school===sB.school&&sA.extra===sB.extra){insights.push(`Identical effort, unequal outcomes. Same school choices, same extracurriculars — yet scores diverged by ${Math.abs(scoreA-scoreB)} points. The system amplified background, not choices.`);}
  if(insights.length===0){insights.push(`Two paths through the same world. Every chapter, each character faced structurally different versions of the same choices — gatekeeping dressed as meritocracy.`);insights.push(`The scoring system rewards compound privilege. Early advantages multiply; early disadvantages compound too.`);}
  const pathKeys=['background','school','extra','college','career_start','career_growth','relationship','personal','event'];
  const keyIcons={background:'🧬',school:'🏫',extra:'🎯',college:'🎓',career_start:'💼',career_growth:'📈',relationship:'❤️',personal:'✨',event:'⚡'};
  const pcRows=pathKeys.map(k=>{const vA=sA[k]||'—',vB=sB[k]||'—';const lA=TRAIL_LABELS[k]?.[vA]||vA,lB=TRAIL_LABELS[k]?.[vB]||vB;const diff=vA!==vB;return`<div class="pc-row"><div class="pc-key">${keyIcons[k]||''} ${k.replace(/_/g,' ')}</div><div class="pc-cell cell-a ${diff?'cell-diff-a':''}">${lA}</div><div class="pc-cell cell-b ${diff?'cell-diff-b':''}">${lB}</div></div>`;}).join('');
  function bar(a,b,key){return`<div class="stat-bar-row"><div class="sbr-label"><span class="sl-key">${key}</span><span class="sl-vals"><span class="sl-a">A: ${a}</span><span class="sl-b">B: ${b}</span></span></div><div class="sbr-track"><div class="sbr-fill fill-a" style="width:${a}%"></div></div><div class="sbr-track" style="margin-top:3px"><div class="sbr-fill fill-b" style="width:${b}%"></div></div></div>`;}
  cw.innerHTML=`<div class="compare-header"><h2>THE VERDICT</h2><p>Two lives played. The same world — built different for each of them.</p></div><div class="vs-banner"><div class="vs-col col-a"><div class="vs-icon">${archA.icon}</div><div class="vs-archetype a-color">${archA.title}</div><div class="vs-score"><span>${scoreA}</span>life score</div></div><div class="vs-divider">VS</div><div class="vs-col col-b"><div class="vs-icon">${archB.icon}</div><div class="vs-archetype b-color">${archB.title}</div><div class="vs-score"><span>${scoreB}</span>life score</div></div></div><div class="stat-bars-wrap"><h3>// Outcome Metrics</h3>${bar(scoreA,scoreB,'Life Score')}${bar(happyA,happyB,'Happiness')}${bar(impactA,impactB,'Impact')}${bar(wealthA,wealthB,'Wealth Index')}${bar(accessA,accessB,'Systemic Access')}</div><div class="path-compare"><h3>// Decision by Decision</h3><div class="pc-row" style="margin-bottom:10px"><div></div><div style="font-family:IBM Plex Mono,monospace;font-size:0.6rem;font-weight:700;color:var(--neon-y);padding:0 10px">CHAR A</div><div style="font-family:IBM Plex Mono,monospace;font-size:0.6rem;font-weight:700;color:var(--neon-r);padding:0 10px">CHAR B</div></div>${pcRows}</div><div class="insight-box"><h3>// What the system revealed</h3>${insights.map(i=>`<div class="insight-item">${i}</div>`).join('')}</div><div class="compare-btns"><button class="btn-replay replay-btn" onclick="restart()">↩ PLAY AGAIN</button><button class="btn-swap" onclick="swapAndReplay()">⇄ SWAP PATHS</button></div>`;
}
function swapAndReplay(){const tmp=chars.a;chars.a=chars.b;chars.b=tmp;showComparison();}

/* ─── RESTART ─── */
function restart(){
  chars={a:{state:{},trail:[],history:[]},b:{state:{},trail:[],history:[]}};
  activeChar='a'; gameStep=0;
  ['qcard','choices-wrap','connector','scroll-hint'].forEach(id=>{document.getElementById(id).style.display='';});
  document.getElementById('final-wrap').style.display='none';
  document.getElementById('final-wrap').innerHTML='';
  document.getElementById('compare-wrap').style.display='none';
  document.getElementById('compare-wrap').innerHTML='';
  document.getElementById('trail-wrap').innerHTML='';
  document.getElementById('trail-wrap').style.display='';
  document.getElementById('chapter-marquee').style.display='flex';
  document.getElementById('progress-wrap').style.display='flex';
  document.getElementById('back-btn').style.display='none';
  document.getElementById('suggestion-bar').classList.remove('visible');
  if(gameMode==='dual'){document.getElementById('char-tabs').style.display='flex';updateCharTabs();}
  setProgress(0);
  document.getElementById('prog-counter').textContent=`0 / ${TOTAL_STEPS}`;
  applyTheme('default');
  showBackground();
}
showBackground();
/* ─── THEME TOGGLE ─── */
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  if(document.body.classList.contains('light-theme')){
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
});