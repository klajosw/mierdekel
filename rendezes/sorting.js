/* Sorting Algorithm Visualizer 3.0
   Fix: az algoritmusválasztó valóban az aktuális algoritmust,
   leírást, pszeudokódot és vizualizációt használja.
*/

const $ = id => document.getElementById(id);

const ALGORITHMS = {
  bubble:{title:"Buborékrendezés",subtitle:"Szomszédos elemek összehasonlítása és szükség szerinti cseréje.",best:"O(n)",average:"O(n²)",worst:"O(n²)",memory:"O(1)",
    text:"A Bubble Sort végigjárja a tömböt, és minden szomszédos párt összehasonlít. Ha rossz sorrendben vannak, felcseréli őket. Egy menet végére a legnagyobb még rendezetlen elem a helyére kerül.",
    pseudo:"for end = n-1 ... 1\\n  for j = 0 ... end-1\\n    ha A[j] > A[j+1]\\n      csere(A[j], A[j+1])"},
  exchange:{title:"Egyszerű cserés rendezés",subtitle:"Az elemek páronkénti összehasonlításával közvetlenül cserél.",best:"O(n²)",average:"O(n²)",worst:"O(n²)",memory:"O(1)",
    text:"Minden pozícióhoz összeveti az utána következő elemeket. Ha kisebb értéket talál, közvetlenül cserél. Egyszerű, de nagy tömböknél sok összehasonlítást végez.",
    pseudo:"for i = 0 ... n-2\\n  for j = i+1 ... n-1\\n    ha A[i] > A[j]\\n      csere(A[i], A[j])"},
  insertion:{title:"Beszúrásos rendezés",subtitle:"Az új elemeket a már rendezett bal oldali részbe illeszti.",best:"O(n)",average:"O(n²)",worst:"O(n²)",memory:"O(1)",
    text:"Úgy működik, mint amikor kártyákat rendezünk a kezünkben: a következő elemet kivesszük, a nagyobbakat jobbra toljuk, majd az elemet a megfelelő helyre tesszük.",
    pseudo:"for i = 1 ... n-1\\n  key = A[i]\\n  amíg a bal oldali elem nagyobb\\n    jobbra tolás\\n  key beszúrása"},
  selection:{title:"Kiválasztásos rendezés",subtitle:"A rendezetlen rész minimumát keresi meg, majd a helyére teszi.",best:"O(n²)",average:"O(n²)",worst:"O(n²)",memory:"O(1)",
    text:"Minden körben megkeresi a legkisebb elemet a még rendezetlen részben, majd az első rendezetlen pozícióval cseréli. Kevés cserét, de sok összehasonlítást végez.",
    pseudo:"for i = 0 ... n-2\\n  min = i\\n  keresd meg a minimumot\\n  csere(A[i], A[min])"},
  quick:{title:"Gyorsrendezés · QuickSort",subtitle:"Pivot választása, partícionálás, majd rekurzív rendezés.",best:"O(n log n)",average:"O(n log n)",worst:"O(n²)",memory:"O(log n)*",
    text:"Egy pivot köré particionálja a tömböt: a kisebb elemek egyik, a nagyobbak másik oldalra kerülnek. Ezután a két részt külön rendezi. Jó pivotválasztással nagyon gyors.",
    pseudo:"QuickSort(A, low, high)\\n  pivot kiválasztása\\n  partícionálás pivot körül\\n  QuickSort(bal rész)\\n  QuickSort(jobb rész)"},
  merge:{title:"Összefésüléses rendezés · Merge Sort",subtitle:"Felosztja a tömböt, majd a rendezett részeket összefésüli.",best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",memory:"O(n)",
    text:"A Divide and Conquer elvet használja: a tömböt kisebb részekre bontja, majd a rendezett részeket összeilleszti. A futási ideje stabilan O(n log n).",
    pseudo:"ha n <= 1: kész\\nfelezd a tömböt\\nMergeSort(bal)\\nMergeSort(jobb)\\nmerge(bal, jobb)"},
  heap:{title:"Kupacrendezés · Heap Sort",subtitle:"Maximum-kupacot épít, majd a legnagyobb elemeket a végére teszi.",best:"O(n log n)",average:"O(n log n)",worst:"O(n log n)",memory:"O(1)",
    text:"Maximum-kupacot épít, amelynek tetején a legnagyobb elem áll. Ezt a végére cseréli, majd helyreállítja a kupacot. Garantáltan O(n log n).",
    pseudo:"maximum-kupac építése\\nfor end = n-1 ... 1\\n  csere(A[0], A[end])\\n  siftDown(A, 0, end)"},
  shell:{title:"Shell Sort",subtitle:"Az Insertion Sortot nagyobb távolságú összehasonlításokkal gyorsítja.",best:"O(n log n)*",average:"≈ O(n^1.5)*",worst:"O(n²)*",memory:"O(1)",
    text:"A Shell Sort először egymástól távolabb lévő elemeket rendez, majd fokozatosan csökkenti a gap értékét. Az utolsó kör egy Insertion Sort, de addigra a tömb már közel rendezett.",
    pseudo:"gap = n/2\\namíg gap > 0\\n  gap szerinti insertion sort\\n  gap = gap/2"},
  counting:{title:"Számláló rendezés · Counting Sort",subtitle:"Az értékek gyakoriságát számolja meg, majd ezekből építi fel a sorrendet.",best:"O(n+k)",average:"O(n+k)",worst:"O(n+k)",memory:"O(k)",
    text:"Nem összehasonlítással rendez. Megszámolja, hogy az egyes értékek hányszor szerepelnek, majd a gyakoriságok alapján írja vissza az elemeket. A módszer akkor hatékony, ha az értéktartomány nem túl nagy.",
    pseudo:"count[x] = 0 minden x-re\\nfor x in A: count[x]++\\nfor x növekvő sorrendben\\n  írd vissza count[x] darabszor"},
  cocktail:{title:"Kétirányú buborékrendezés · Cocktail Sort",subtitle:"Balról jobbra, majd jobbról balra is buborékoltat.",best:"O(n)",average:"O(n²)",worst:"O(n²)",memory:"O(1)",
    text:"A Cocktail Sort a Bubble Sort kétirányú változata. Egy menetben a nagy elemek jobbra, majd a kis elemek balra vándorolnak. Ez segíthet bizonyos „rossz irányban” elhelyezkedő elemek gyors mozgatásában.",
    pseudo:"left = 0, right = n-1\\namíg left < right\\n  bal → jobb buborékolás\\n  jobb → bal buborékolás"},
  gnome:{title:"Gnome Sort",subtitle:"Egyszerű módszer: ha rossz a sorrend, visszalép; ha jó, előrelép.",best:"O(n)",average:"O(n²)",worst:"O(n²)",memory:"O(1)",
    text:"A Gnome Sort a kertitörpe-logikát követi: ha két szomszédos elem jó sorrendben van, előrelép; ha nem, cserél és visszalép egyet. Meglepően szemléletes algoritmus.",
    pseudo:"i = 1\\namíg i < n\\n  ha A[i-1] <= A[i]: i++\\n  különben csere és i--"},
  radix:{title:"Radix Sort",subtitle:"A számjegyek helyiértékei szerint rendez, összehasonlítás nélkül.",best:"O(d·(n+k))",average:"O(d·(n+k))",worst:"O(d·(n+k))",memory:"O(n+k)",
    text:"Az egész számokat számjegyről számjegyre rendezi, jellemzően stabil Counting Sort segítségével. Először az egyesek, majd a tízesek, százasok stb. helyiértéke kerül sorra.",
    pseudo:"exp = 1\\namíg max/exp > 0\\n  Counting Sort az exp helyiértéken\\n  exp *= 10"},
  bucket:{title:"Bucket Sort",subtitle:"Az értékeket vödrökbe osztja, majd a vödröket külön rendezi.",best:"O(n+k)",average:"O(n+k)",worst:"O(n²)",memory:"O(n+k)",
    text:"Az értékeket több tartományba, úgynevezett bucketekbe osztja. A bucketek külön-külön rendezhetők, majd egymás után kiolvasva adják a végeredményt. Egyenletes eloszlásnál különösen hatékony lehet.",
    pseudo:"bucketek létrehozása\\nfor x in A: helyezd bucketbe\\nminden bucket rendezése\\nbucketek összefűzése"},
  tim:{title:"Tim Sort · egyszerűsített",subtitle:"Run-ok felismerése és összefésülése; a valós TimSort ennél összetettebb.",best:"O(n)",average:"O(n log n)",worst:"O(n log n)",memory:"O(n)",
    text:"Az oktatási változat rövid, már rendezett szakaszokra (runokra) bont, ezeket Insertion Sorttal rendezi, majd Merge Sort-szerűen összefésüli. A Python és Java ökoszisztémában ismert TimSort ennél sokkal kifinomultabb.",
    pseudo:"runok létrehozása\\nrunok rendezése insertion sorttal\\namíg több run van:\\n  két szomszédos run összefésülése"}
};

let values=[], events=[], cursor=0, running=false, paused=false, timer=null;
let comparisons=0, swaps=0, steps=0, sortedSet=new Set();
let startedAt=0, elapsedBeforePause=0, soundOn=true, audioCtx=null;

function randomArray(n, mode){
  let a=Array.from({length:n},(_,i)=>i+1);
  if(mode==="reversed") return a.reverse();
  for(let i=n-1;i>0;i--){
    if(mode==="nearly" && Math.random()<.78) continue;
    if(mode==="few" && Math.random()<.94) continue;
    const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];
  }
  if(mode==="few") for(let k=0;k<Math.max(2,Math.floor(n*.08));k++){
    const i=Math.floor(Math.random()*n),j=Math.floor(Math.random()*n);[a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function snapshot(type, data={}, aRef){
  events.push({type, values:[...(aRef||values)], ...data});
}
function compare(a,b,arr){ snapshot("compare",{a,b},arr); }
function swap(a,b,arr){ [arr[a],arr[b]]=[arr[b],arr[a]]; snapshot("swap",{a,b},arr); }
function mark(i,arr){ snapshot("sorted",{i},arr); }
function pivot(i,arr){ snapshot("pivot",{i},arr); }
function write(i,arr){ snapshot("write",{i},arr); }

function bubble(a){
  for(let end=a.length-1;end>0;end--){let changed=false;
    for(let j=0;j<end;j++){compare(j,j+1,a);if(a[j]>a[j+1]){swap(j,j+1,a);changed=true;}}
    mark(end,a);if(!changed)break;
  } for(let i=0;i<a.length;i++)mark(i,a);
}
function exchange(a){
  for(let i=0;i<a.length-1;i++){for(let j=i+1;j<a.length;j++){compare(i,j,a);if(a[i]>a[j])swap(i,j,a);}mark(i,a);}
  mark(a.length-1,a);
}
function insertion(a){
  mark(0,a);
  for(let i=1;i<a.length;i++){let j=i;
    while(j>0){compare(j-1,j,a);if(a[j-1]<=a[j])break;swap(j-1,j,a);j--;}mark(i,a);
  }
}
function selection(a){
  for(let i=0;i<a.length-1;i++){let min=i;pivot(min,a);
    for(let j=i+1;j<a.length;j++){compare(min,j,a);if(a[j]<a[min]){min=j;pivot(min,a);}}
    if(min!==i)swap(i,min,a);mark(i,a);
  }mark(a.length-1,a);
}
function quick(a){
  function part(l,r){const p=a[r];pivot(r,a);let i=l;
    for(let j=l;j<r;j++){compare(j,r,a);if(a[j]<p){if(i!==j)swap(i,j,a);i++;}}
    if(i!==r)swap(i,r,a);mark(i,a);return i;
  }
  function q(l,r){if(l>r)return;if(l===r){mark(l,a);return;}const p=part(l,r);q(l,p-1);q(p+1,r);}
  q(0,a.length-1);for(let i=0;i<a.length;i++)mark(i,a);
}
function merge(a){
  function ms(l,r){if(l>=r){if(l===r)mark(l,a);return;}const m=Math.floor((l+r)/2);ms(l,m);ms(m+1,r);
    let t=[],i=l,j=m+1;
    while(i<=m&&j<=r){compare(i,j,a);if(a[i]<=a[j])t.push(a[i++]);else t.push(a[j++]);}
    while(i<=m)t.push(a[i++]);while(j<=r)t.push(a[j++]);
    for(let k=0;k<t.length;k++){a[l+k]=t[k];write(l+k,a);}
  } ms(0,a.length-1);for(let i=0;i<a.length;i++)mark(i,a);
}
function heap(a){
  function down(root,size){while(true){let c=root*2+1,b=root;if(c>=size)break;compare(c,b,a);if(a[c]>a[b])b=c;
    if(c+1<size){compare(c+1,b,a);if(a[c+1]>a[b])b=c+1;}if(b===root)break;swap(root,b,a);root=b;}}
  for(let i=Math.floor(a.length/2)-1;i>=0;i--)down(i,a.length);
  for(let e=a.length-1;e>0;e--){swap(0,e,a);mark(e,a);down(0,e);}mark(0,a);
}
function shell(a){
  for(let gap=Math.floor(a.length/2);gap>0;gap=Math.floor(gap/2)){for(let i=gap;i<a.length;i++){
    let j=i;while(j>=gap){compare(j-gap,j,a);if(a[j-gap]<=a[j])break;swap(j-gap,j,a);j-=gap;}
  }}for(let i=0;i<a.length;i++)mark(i,a);
}
function counting(a){
  const min=Math.min(...a),max=Math.max(...a),count=new Array(max-min+1).fill(0);
  for(let i=0;i<a.length;i++){const idx=a[i]-min;count[idx]++;write(i,a);}
  let pos=0;for(let c=0;c<count.length;c++)while(count[c]-- > 0){a[pos]=c+min;write(pos,a);pos++;}
  for(let i=0;i<a.length;i++)mark(i,a);
}
function cocktail(a){
  let left=0,right=a.length-1;
  while(left<right){let changed=false;
    for(let j=left;j<right;j++){compare(j,j+1,a);if(a[j]>a[j+1]){swap(j,j+1,a);changed=true;}}
    mark(right,a);right--;if(!changed)break;
    for(let j=right;j>left;j--){compare(j-1,j,a);if(a[j-1]>a[j]){swap(j-1,j,a);changed=true;}}
    mark(left,a);left++;if(!changed)break;
  }for(let i=0;i<a.length;i++)mark(i,a);
}
function gnome(a){
  let i=1;while(i<a.length){if(i===0)i=1;compare(i-1,i,a);
    if(a[i-1]<=a[i])i++;else{swap(i-1,i,a);i--;}}
  for(let k=0;k<a.length;k++)mark(k,a);
}
function radix(a){
  const max=Math.max(...a);
  for(let exp=1;Math.floor(max/exp)>0;exp*=10){
    const out=new Array(a.length),count=new Array(10).fill(0);
    for(let i=0;i<a.length;i++){const d=Math.floor(a[i]/exp)%10;count[d]++;write(i,a);}
    for(let i=1;i<10;i++)count[i]+=count[i-1];
    for(let i=a.length-1;i>=0;i--){const d=Math.floor(a[i]/exp)%10;out[--count[d]]=a[i];}
    for(let i=0;i<a.length;i++){a[i]=out[i];write(i,a);}
  }for(let i=0;i<a.length;i++)mark(i,a);
}
function bucket(a){
  const min=Math.min(...a),max=Math.max(...a),n=a.length,buckets=Array.from({length:Math.max(1,Math.ceil(Math.sqrt(n)))},()=>[]);
  const range=max-min+1;
  for(let i=0;i<n;i++){let b=Math.min(buckets.length-1,Math.floor((a[i]-min)/range*buckets.length));buckets[b].push(a[i]);write(i,a);}
  let pos=0;
  for(const b of buckets){b.sort((x,y)=>x-y);for(const v of b){a[pos++]=v;write(pos-1,a);}}
  for(let i=0;i<n;i++)mark(i,a);
}
function tim(a){
  const RUN=8,runs=[];
  for(let start=0;start<a.length;start+=RUN){
    let end=Math.min(start+RUN,a.length);
    for(let i=start+1;i<end;i++){let j=i;while(j>start){compare(j-1,j,a);if(a[j-1]<=a[j])break;swap(j-1,j,a);j--;}}
    runs.push([start,end-1]);for(let i=start;i<end;i++)mark(i,a);
  }
  function mergeRange(l,m,r){let t=[],i=l,j=m+1;
    while(i<=m&&j<=r){compare(i,j,a);if(a[i]<=a[j])t.push(a[i++]);else t.push(a[j++]);}
    while(i<=m)t.push(a[i++]);while(j<=r)t.push(a[j++]);
    for(let k=0;k<t.length;k++){a[l+k]=t[k];write(l+k,a);}
  }
  while(runs.length>1){const next=[];for(let i=0;i<runs.length;i+=2){
    if(i+1>=runs.length){next.push(runs[i]);continue;}
    const l=runs[i][0],m=runs[i][1],r=runs[i+1][1];mergeRange(l,m,r);next.push([l,r]);
  }runs.splice(0,runs.length,...next);}
  for(let i=0;i<a.length;i++)mark(i,a);
}

function buildEvents(){
  const alg=$("algorithm").value;
  const fn={bubble,exchange,insertion,selection,quick,merge,heap,shell,counting,cocktail,gnome,radix,bucket,tim}[alg];
  events=[];cursor=0;sortedSet=new Set();
  const work=[...values]; snapshot("init",{},work);
  fn(work);
}

function render(){
  const bars=$("bars");bars.innerHTML="";
  const max=Math.max(...values,1);
  values.forEach((v,i)=>{
    const el=document.createElement("div");el.className="bar";
    el.style.height=`${Math.max(2,v/max*100)}%`;el.dataset.value=v;
    if(values.length<=45)el.style.setProperty("--label-opacity",".75");
    if(currentCompare.includes(i))el.classList.add("comparing");
    if(currentSwap.includes(i))el.classList.add("swapping");
    if(currentPivot.includes(i))el.classList.add("pivot");
    if(sortedSet.has(i))el.classList.add("sorted");
    bars.appendChild(el);
  });
}
let currentCompare=[],currentSwap=[],currentPivot=[];

function getElapsed(){if(!startedAt)return 0;return running?elapsedBeforePause+performance.now()-startedAt:elapsedBeforePause;}
function updateStats(){
  $("comparisons").textContent=comparisons.toLocaleString("hu-HU");
  $("swaps").textContent=swaps.toLocaleString("hu-HU");
  $("steps").textContent=steps.toLocaleString("hu-HU");
  $("elapsed").textContent=(getElapsed()/1000).toFixed(2)+" s";
  $("progressBar").style.width=`${events.length?cursor/events.length*100:0}%`;
}
function beep(type,value=50){
  if(!soundOn)return;
  try{
    audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==="suspended")audioCtx.resume();
    const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
    const freq={compare:180,swap:300,write:240,pivot:420,sorted:620,init:110}[type]||220;
    osc.frequency.value=freq+(value||0)*2;osc.type="sine";gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.045,audioCtx.currentTime+.008);
    gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.07);
    osc.connect(gain).connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+.075);
  }catch(e){}
}
function executeNext(){
  if(cursor>=events.length){finish();return;}
  const e=events[cursor++];values=[...e.values];
  currentCompare=[];currentSwap=[];currentPivot=[];
  if(e.type==="compare"){currentCompare=[e.a,e.b];comparisons++;}
  if(e.type==="swap"){currentSwap=[e.a,e.b];swaps++;}
  if(e.type==="pivot"){currentPivot=[e.i];}
  if(e.type==="sorted")sortedSet.add(e.i);
  steps++;beep(e.type,values[e.i]||values[e.a]||50);
  const msg={init:"Kezdeti állapot.",compare:"Összehasonlítás folyik.",swap:"Csere történt.",write:"Érték áthelyezése / visszaírása.",pivot:"Pivot kiválasztva.",sorted:"Az elem végleges helyére került."};
  $("stepMessage").textContent=msg[e.type]||"Algoritmuslépés.";
  render();updateStats();
  if(cursor>=events.length)finish();
}
function delay(){return Math.max(8,510-(+$("speed").value)*4.9);}
function loop(){if(!running||paused)return;executeNext();if(running&&!paused)timer=setTimeout(loop,delay());}
function start(){
  if(cursor>=events.length)reset();
  if(!startedAt)startedAt=performance.now();else if(paused)startedAt=performance.now();
  running=true;paused=false;beep("init",30);
  $("statusText").textContent="Fut";$("statusDot").style.background="var(--accent)";
  $("start").disabled=true;$("pause").disabled=false;$("step").disabled=true;
  timer=setTimeout(loop,delay());
}
function pause(){
  if(!running)return;clearTimeout(timer);elapsedBeforePause=getElapsed();running=false;paused=true;
  $("statusText").textContent="Szünet";$("statusDot").style.background="var(--compare)";
  $("start").disabled=false;$("pause").disabled=true;$("step").disabled=false;
}
function finish(){
  clearTimeout(timer);running=false;paused=false;cursor=events.length;
  for(let i=0;i<values.length;i++)sortedSet.add(i);currentCompare=[];currentSwap=[];currentPivot=[];
  render();updateStats();$("statusText").textContent="Kész";$("statusDot").style.background="var(--sorted)";
  $("stepMessage").textContent="✓ A sorozat rendezve.";beep("sorted",80);
  $("start").disabled=false;$("pause").disabled=true;$("step").disabled=true;
}
function reset(){
  clearTimeout(timer);running=false;paused=false;cursor=0;comparisons=0;swaps=0;steps=0;sortedSet=new Set();
  currentCompare=[];currentSwap=[];currentPivot=[];startedAt=0;elapsedBeforePause=0;
  values=randomArray(+$("size").value,$("distribution").value);buildEvents();render();updateStats();
  $("statusText").textContent="Készen áll";$("statusDot").style.background="var(--sorted)";
  $("stepMessage").textContent="Válassz algoritmust, majd indítsd el vagy lépj egyet.";
  $("start").disabled=false;$("pause").disabled=true;$("step").disabled=false;
}
function updateInfo(){
  const d=ALGORITHMS[$("algorithm").value] || ALGORITHMS.bubble;
  $("algorithmTitle").textContent=d.title;$("algorithmSubtitle").textContent=d.subtitle;
  $("infoTitle").textContent=d.title;$("infoText").textContent=d.text;
  $("best").textContent=d.best;$("average").textContent=d.average;$("worst").textContent=d.worst;$("memory").textContent=d.memory;
  $("pseudo").textContent=d.pseudo;
}

$("algorithm").addEventListener("change",()=>{updateInfo();reset();});
$("size").addEventListener("input",()=>{$("sizeValue").textContent=$("size").value;reset();});
$("speed").addEventListener("input",()=>{$("speedValue").textContent=$("speed").value+"%";});
$("distribution").addEventListener("change",reset);
$("start").addEventListener("click",start);
$("pause").addEventListener("click",pause);
$("step").addEventListener("click",()=>{if(!running)executeNext();});
$("shuffle").addEventListener("click",reset);
$("reset").addEventListener("click",reset);
$("sound").addEventListener("click",()=>{
  soundOn=!soundOn;$("sound").textContent=soundOn?"🔊 Hang: BE":"🔇 Hang: KI";
  if(soundOn)beep("init",40);
});

updateInfo();reset();
