document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const next = document.getElementById('btnNext');
  const prev = document.getElementById('btnPrev');
  const bar  = document.getElementById('bar');
  const counter = document.getElementById('counter');
  let i = 0;

  function show(idx){
    i = Math.max(0, Math.min(slides.length-1, idx));
    slides.forEach((s, n)=>{
      s.classList.toggle('active', n===i);
    });
    const pct = ((i+1)/slides.length)*100;
    bar.style.width = pct + '%';
    counter.textContent = (i+1) + ' / ' + slides.length;
  }

  next.addEventListener('click', ()=>show(i+1));
  prev.addEventListener('click', ()=>show(i-1));

  window.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight' || e.key==='PageDown' || e.key===' '){
      e.preventDefault(); show(i+1);
    }
    if(e.key==='ArrowLeft'  || e.key==='PageUp'  || e.key==='Backspace'){
      e.preventDefault(); show(i-1);
    }

    function show(idx) {
  console.log("Idx:", idx); // Tambah ini
  i = Math.max(0, Math.min(slides.length-1, idx));
  slides.forEach((s, n) => {
    s.classList.toggle('active', n===i);
  });
  const pct = ((i+1)/slides.length)*100;
  bar.style.width = pct + '%';
  counter.textContent = (i+1) + ' / ' + slides.length;
    }
    
  });

  // Touch swipe support
  let sx=0, dx=0;
  const stage = document.getElementById('stage');
  stage.addEventListener('touchstart', (e)=>{sx = e.touches[0].clientX});
  stage.addEventListener('touchmove',  (e)=>{dx = e.touches[0].clientX - sx});
  stage.addEventListener('touchend',   ()=>{ if(Math.abs(dx)>40){ dx<0?show(i+1):show(i-1) } dx=0 });

  // Deep link support (?s=1..9)
  const params = new URLSearchParams(location.search);
  const start = parseInt(params.get('s')||'1',10);
  if(!isNaN(start)) show(start-1);
});
