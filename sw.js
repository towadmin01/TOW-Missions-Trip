// TOW Mission Treasurer: lets treasurer.html open with no internet
const C='tow-treasurer-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['treasurer.html'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(u.pathname.endsWith('treasurer.html')){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put('treasurer.html',c));return r}).catch(()=>caches.match('treasurer.html')));
  }
});
