const CACHE_NAME = 'falaquegasto-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
]

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto')
        return cache.addAll(urlsToCache)
      })
  )
  self.skipWaiting()
})

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Estratégia: Network First, fallback para Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone da resposta para salvar no cache
        const responseToCache = response.clone()
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache)
          })
        return response
      })
      .catch(() => {
        // Se a rede falhar, busca do cache
        return caches.match(event.request)
      })
  )
})
