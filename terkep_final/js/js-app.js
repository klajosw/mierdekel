
// ==================== TÉRKÉP APP - TISZTA, OLVASHATÓ ====================
console.log('[APP] Indul...');

// 1. Térkép init - canvas = gyors
const map = L.map('map', { renderer: L.canvas(), zoomControl:false }).setView([47.16, 19.5], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OSM'
}).addTo(map);
L.control.zoom({position:'topright'}).addTo(map);

// 2. Klaszter csoportok kategóriánként
const COLORS = { hotels:'#2563eb', museums:'#7c3aed', monuments:'#d97706', beaches:'#0891b2', attractions:'#059669' };
const EMOJI = { hotels:'🏨', museums:'🏛️', monuments:'🏰', beaches:'🏖️', attractions:'📍' };
const clusters = {};

Object.keys(tourismData).forEach(cat=>{
    clusters[cat] = L.markerClusterGroup({
        chunkedLoading: true,
        chunkInterval: 50,
        chunkDelay: 20,
        maxClusterRadius: 80,
        disableClusteringAtZoom: 16
    });
});

// 3. Globális állapot
let allPoints = [];
Object.entries(tourismData).forEach(([cat, arr])=>{
    arr.forEach(p=> allPoints.push({...p, cat}));
});
let activeCats = new Set(['hotels']); // induláskor csak hotel - gyors

// 4. RENDER - chunkolt, nem fagyaszt
function renderCategory(cat){
    const points = tourismData[cat] || [];
    const cluster = clusters[cat];
    cluster.clearLayers();
    map.addLayer(cluster);

    let i=0;
    const CHUNK=500;
    const bar = document.getElementById('progressBar');
    const stats = document.getElementById('statLoaded');

    function addChunk(){
        const slice = points.slice(i, i+CHUNK);
        slice.forEach(p=>{
            const m = L.circleMarker([p.lat, p.lng], {
                radius:6, color:COLORS[cat], fillColor:COLORS[cat], fillOpacity:0.85, weight:2
            });
            m.bindPopup(`<b>${p.n}</b><br><small>${p.c}</small><br>${p.d||''}<br><br><a href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}" target="_blank">🧭 Útvonal</a>`);
            cluster.addLayer(m);
        });
        i+=CHUNK;
        bar.style.width = Math.round(i/points.length*100)+'%';
        stats.textContent = `${i}/${points.length}`;
        document.getElementById('statTotal').textContent = allPoints.length;
        document.getElementById('statVisible').textContent = map.getBounds ? '...' : '0';

        if(i < points.length){
            setTimeout(addChunk, 20);
        } else {
            setTimeout(()=> bar.style.width='0%', 500);
        }
    }
    addChunk();
}

function clearCategory(cat){
    map.removeLayer(clusters[cat]);
    clusters[cat].clearLayers();
}

// 5. Szűrők UI
const filterBox = document.getElementById('filters');
filterBox.innerHTML = Object.keys(tourismData).map(cat=>`
    <div class="cat-item ${activeCats.has(cat)?'active':''}" id="cat-${cat}" onclick="toggleCat('${cat}')">
        <div class="cat-left">
            <div class="cat-icon" style="background:${COLORS[cat]}18;color:${COLORS[cat]}">${EMOJI[cat]}</div>
            <span style="font-size:13px;font-weight:600">${cat}</span>
        </div>
        <span style="font-size:11px;background:#f5f5f4;padding:2px 8px;border-radius:99px">${tourismData[cat].length}</span>
    </div>
`).join('');

function toggleCat(cat){
    const el = document.getElementById(`cat-${cat}`);
    if(activeCats.has(cat)){
        activeCats.delete(cat);
        el.classList.remove('active');
        clearCategory(cat);
    } else {
        activeCats.add(cat);
        el.classList.add('active');
        renderCategory(cat);
    }
    updateList();
}

// 6. Keresés - debounce
let searchTimer;
document.getElementById('search').addEventListener('input', e=>{
    clearTimeout(searchTimer);
    searchTimer = setTimeout(()=> doSearch(e.target.value), 300);
});

function doSearch(q){
    const list = document.getElementById('list');
    if(!q || q.length<2){
        updateList(); return;
    }
    const res = allPoints.filter(p=> p.n.toLowerCase().includes(q.toLowerCase())).slice(0,100);
    list.innerHTML = res.map(p=>`
        <button class="result-card" onclick="map.flyTo([${p.lat},${p.lng}],15)">
            <div style="display:flex;gap:8px">
                <span>${EMOJI[p.cat]}</span>
                <div><b style="font-size:12px">${p.n}</b><br><small style="color:#78716c">${p.c} • ${p.cat}</small></div>
            </div>
        </button>
    `).join('');
    document.getElementById('searchMeta').textContent = `Keresés: "${q}" • ${res.length} találat`;
}

function updateList(){
    const bounds = map.getBounds();
    const visible = allPoints.filter(p=> activeCats.has(p.cat) && bounds.contains([p.lat,p.lng])).slice(0,50);
    const list = document.getElementById('list');
    list.innerHTML = visible.map(p=>`
        <button class="result-card" onclick="map.flyTo([${p.lat},${p.lng}],15)">
            <div style="display:flex;gap:8px">
                <span>${EMOJI[p.cat]}</span>
                <div><b style="font-size:12px">${p.n}</b><br><small style="color:#78716c">${p.c}</small></div>
            </div>
        </button>
    `).join('');
    document.getElementById('searchMeta').textContent = `${visible.length} a viewportban • max 50 látszik`;
    document.getElementById('statVisible').textContent = visible.length;
}

map.on('moveend', updateList);

// 7. Indítás
renderCategory('hotels');
setTimeout(updateList, 1000);

console.log('[APP] Kész. Cseréld a js/tourismData.js-t a saját 18k-s fájlodra!');
