"use strict";var precacheConfig=[["/index.html","839088cdfbb7467caa24afdf7889c936"],["/static/css/app.css","381676684074d8bec20d749444c56184"],["/static/css/content.css","5c08f7a0d9e456fd6384ac9e4baf8ed4"],["/static/js/app.js","fb7d79a838eb9402e325485cdda2f8de"],["/static/js/content.js","268d2c52daae68a3ec479c1d6214f021"],["/static/media/10_of_clubs.7fb1f45b.png","7fb1f45b710e0d1ca186dd79c7d1113e"],["/static/media/10_of_diamonds.d1be977d.png","d1be977d1098848d2f91996a9d630e20"],["/static/media/10_of_hearts.4f45bcb3.png","4f45bcb3d89cfcb01905b915e697ce91"],["/static/media/10_of_spades.624c5f7c.png","624c5f7cc89fe2b9da0b3bf35b3e0858"],["/static/media/6_of_diamonds.bb79bb65.png","bb79bb6542ee263255d4c1cdcf7f9326"],["/static/media/6_of_hearts.dc88aca8.png","dc88aca87d82dcf30f8f802839e46b44"],["/static/media/7_of_diamonds.4c293cda.png","4c293cdaab68eb4b240d570899f0853c"],["/static/media/7_of_hearts.a8c6948d.png","a8c6948d111a267ccb3b83c98461b312"],["/static/media/8_of_clubs.63fcb3c2.png","63fcb3c204975ad08205996e2824c127"],["/static/media/8_of_diamonds.82c8f08f.png","82c8f08fdbb622af31f6c4e3cf10c4f0"],["/static/media/8_of_hearts.75da1f95.png","75da1f9567d3092e0fdce616f46bf289"],["/static/media/8_of_spades.085e3ca3.png","085e3ca3e6bea378c0f8a3fcaf6f5416"],["/static/media/9_of_clubs.73462a18.png","73462a18ea651937ca04137797be99ac"],["/static/media/9_of_diamonds.6bc3ba13.png","6bc3ba1343500526ccc837651d3c963f"],["/static/media/9_of_hearts.86d439cf.png","86d439cf96b38d90d9af95b429dcb509"],["/static/media/9_of_spades.9a051788.png","9a05178883f2308f91886fdd2ac87e40"],["/static/media/ace_of_clubs.57e70271.png","57e702715bb2b17fdb98490e2f207c78"],["/static/media/ace_of_diamonds.ce5bc5de.png","ce5bc5de8c7c718e2ae1698a9fe143a5"],["/static/media/ace_of_hearts.1fcff170.png","1fcff170d8dae28c874e292a9f7f5e1c"],["/static/media/ace_of_spades.9d2f7fb7.png","9d2f7fb753d727c6c794991dac5589f4"],["/static/media/back@2x.e7051d9e.png","e7051d9e94efc4a49e18e71fa5422d8d"],["/static/media/black_joker.8e78fe87.png","8e78fe87e9d3e05e070d0c937e67214c"],["/static/media/info-icon-5.29857578.png","298575789e5b3bead6ae3016947d700c"],["/static/media/jack_of_clubs.d6d61a82.png","d6d61a82d0c1d41c2d9243aeb5090ad8"],["/static/media/jack_of_diamonds.f4f1c70b.png","f4f1c70bea52aa9b7633330730b8d720"],["/static/media/jack_of_hearts.f634cf97.png","f634cf976686fc790a45ddf118c39610"],["/static/media/jack_of_spades.43030464.png","43030464716ef1c7ab056eedabbfd914"],["/static/media/king_of_clubs.7c086040.png","7c08604030c80100031a2c9a2d51058b"],["/static/media/king_of_diamonds.6547e008.png","6547e008b50fc870bf7ab54b524a6f72"],["/static/media/king_of_hearts.a1e12437.png","a1e1243727b63c3aeb0bcc2cdd120c1f"],["/static/media/king_of_spades.311032ee.png","311032ee0effc346a912adad67d50e0e"],["/static/media/queen_of_clubs.c8485ac9.png","c8485ac99e53544715f62be0c2149a61"],["/static/media/queen_of_diamonds.06641f15.png","06641f15288cb587249e4f2736908f42"],["/static/media/queen_of_hearts.349cb8ff.png","349cb8fff708fd11615781973d29695c"],["/static/media/queen_of_spades.180d1f0d.png","180d1f0d5d4f6aa019e589506c04f227"],["/static/media/red_joker.d55a4ada.png","d55a4ada1cb2c5c393369a6c6d994e9b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,c,t){var n=new URL(e);return t&&n.pathname.match(t)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,c){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return c.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),n=createCacheKey(t,hashParamName,c,/\.\w{8}\./);return[t.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(t){return setOfCachedUrls(t).then(function(c){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!c.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return t.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var c=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!c.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,c=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),t="index.html";(e=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,t),e=urlsToCacheKeys.has(c));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(c=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(c)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});