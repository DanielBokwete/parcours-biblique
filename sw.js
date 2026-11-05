/* Parcours Biblique : service worker minimal.
   Les pages sont toujours demandées au réseau d'abord (pour avoir la dernière version) ;
   la copie en cache ne sert que si le téléphone est hors ligne. Supabase n'est jamais mis en cache. */
const C="pb-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["/","/manifest.webmanifest","/icons/icon-192.png"])).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.hostname.endsWith("supabase.co"))return;
  if(r.mode==="navigate"){if(u.pathname!=="/"&&u.pathname!=="/index.html")return;
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put("/",cp));}return res;}).catch(()=>caches.match("/")));return;}
  if(u.origin===location.origin&&/\/(bible-lsg\.json|icons\/)/.test(u.pathname)){e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res;})));return;}
  if(/cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.hostname)){e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res;})));}});
