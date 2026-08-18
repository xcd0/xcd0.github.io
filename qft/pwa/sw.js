const CACHE = "qft-pwa-1.1.0-d4f0995807695542";
const VERSION = "d4f0995807695542";
const ASSETS = ["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./version.json","./THIRD_PARTY_LICENSES.txt","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png"];
const assetUrl = (asset) => new URL(asset, self.registration.scope).href;

self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS.map(assetUrl)))));
self.addEventListener("activate", (event) => event.waitUntil((async () => {
	for (const name of await caches.keys()) if (name.startsWith("qft-") && name !== CACHE) await caches.delete(name);
	await self.clients.claim();
})()));
self.addEventListener("message", (event) => {
	if (event.data?.type === "QFT_ACTIVATE_UPDATE") {
		event.waitUntil(self.skipWaiting());
		return;
	}
	if (event.data?.type !== "QFT_PWA_STATUS") return;
	event.waitUntil((async () => {
		const cache = await caches.open(CACHE);
		const missing = [];
		for (const asset of ASSETS) if (!await cache.match(assetUrl(asset))) missing.push(asset);
		const response = { ready: missing.length === 0, cache: CACHE, version: VERSION, missing };
		if (event.ports[0]) event.ports[0].postMessage(response);
		else event.source?.postMessage(response);
	})());
});
self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
	event.respondWith((async () => {
		const cached = await caches.match(event.request);
		if (cached) return cached;
		try {
			const response = await fetch(event.request);
			if (response.ok) {
				const cache = await caches.open(CACHE);
				await cache.put(event.request, response.clone());
			}
			return response;
		} catch (reason) {
			if (event.request.mode === "navigate") {
				const fallback = await caches.match(assetUrl("./index.html"));
				if (fallback) return fallback;
			}
			throw reason;
		}
	})());
});
