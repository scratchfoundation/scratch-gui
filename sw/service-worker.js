/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["blocks-only.html","3b0298dccdd879494a55b76f3790789a"],["index.html","5f273036986d574ab9f3eb0d7873e809"],["lib.min.js","313f1e8e01b47bbe6ebd793cbb579f36"],["player.html","bbf74b1474f9fe91f44c2d62734fe7e1"],["static/blocks-media/1x1.gif","4b252c2abb0553eeb61ed061862f7540"],["static/blocks-media/click.mp3","f71910b391538a67231e088bba0d47eb"],["static/blocks-media/click.ogg","abef65ecb98a4828172f263fd5ff7064"],["static/blocks-media/click.wav","39c900d2154fec42201e998bcf305a4f"],["static/blocks-media/delete.mp3","611d9f6a9392bb80d2000e143aa64323"],["static/blocks-media/delete.ogg","404bc7b7f1119d2eae0532a228814cf3"],["static/blocks-media/delete.wav","f079a6272c75b7ddce61f72a98a07731"],["static/blocks-media/dropdown-arrow-dark.svg","000650484bd9fc536153dc5d7d064996"],["static/blocks-media/dropdown-arrow.svg","be850da552699b8705b5902cb59c6d37"],["static/blocks-media/green-flag.svg","6a025d288965050155abca89738f6b10"],["static/blocks-media/handclosed.cur","6b45ea439228cba3afaa23022f1246a2"],["static/blocks-media/handdelete.cur","b0b4b0b44ed0136f7899c8b2957ca68f"],["static/blocks-media/handopen.cur","505cbb975d6102c374ec64aa92397051"],["static/blocks-media/icons/arrow.svg","e349301923b796d8dd6b56b6203c5188"],["static/blocks-media/icons/control_forever.svg","11e7bf044cf13076eb1f9f63309017cc"],["static/blocks-media/icons/control_repeat.svg","35db6c180f639644f5bbd79d658eaf64"],["static/blocks-media/icons/control_stop.svg","0a513fecbaa8fb54d5d105d529f158c6"],["static/blocks-media/icons/control_wait.svg","55c2a2baaf2a4508b7d883a71e6606fe"],["static/blocks-media/icons/event_broadcast_blue.svg","66d4fdeb552c48adb936dd134f9a7cc3"],["static/blocks-media/icons/event_broadcast_coral.svg","1c866d5fc9b809e085f815d4cc528c3d"],["static/blocks-media/icons/event_broadcast_green.svg","07fc1baf5962aa6035c259dedfbdf10b"],["static/blocks-media/icons/event_broadcast_magenta.svg","4288ba3e3534c6c3bf065f888c74276a"],["static/blocks-media/icons/event_broadcast_orange.svg","fe7e38133cf1be78f504777da6864807"],["static/blocks-media/icons/event_broadcast_purple.svg","97e3a8d9596074ccb0f02f888e290920"],["static/blocks-media/icons/event_when-broadcast-received_blue.svg","a1c3ec8129337cdc6a0e00d51ba75b75"],["static/blocks-media/icons/event_when-broadcast-received_coral.svg","5cddf42acdb787c2cf03bdd5c3507e16"],["static/blocks-media/icons/event_when-broadcast-received_green.svg","7fdc28bcbc5bae41c0e55e8c1009bf6a"],["static/blocks-media/icons/event_when-broadcast-received_magenta.svg","1ada6afd03b601a82d0f7650f72b39b3"],["static/blocks-media/icons/event_when-broadcast-received_orange.svg","fcd47384fbb6dc6e136a6961b042bb0e"],["static/blocks-media/icons/event_when-broadcast-received_purple.svg","0da127529cc813e1f615b87cdcf87d28"],["static/blocks-media/icons/event_whenflagclicked.svg","b93d2d06ce25b6a10a8af6caac0890f3"],["static/blocks-media/icons/set-led_blue.svg","64e271cacd79c04f51e4140976ed69aa"],["static/blocks-media/icons/set-led_coral.svg","0f819c06f38eec93562e8a7e0390aa8d"],["static/blocks-media/icons/set-led_green.svg","95d552a2bf92aaf29ea7b7850efc1e78"],["static/blocks-media/icons/set-led_magenta.svg","bab1714e185b0cce2134c239d7f9dad4"],["static/blocks-media/icons/set-led_mystery.svg","7f11f033db1a2764ba822a9492113802"],["static/blocks-media/icons/set-led_orange.svg","8b9ac813216487a8c0ab20120d55e22c"],["static/blocks-media/icons/set-led_purple.svg","208edc4045ede72b45a4242e9237dde4"],["static/blocks-media/icons/set-led_white.svg","a8a2fcc4c60a3c2c4a093081568c2456"],["static/blocks-media/icons/set-led_yellow.svg","59a03bf890f2c2223b47faa092451e3c"],["static/blocks-media/icons/wedo_motor-clockwise.svg","4829ed554af2e113d3893e7ddfcacdec"],["static/blocks-media/icons/wedo_motor-counterclockwise.svg","ff174bda55c2cbd90fa98409845454eb"],["static/blocks-media/icons/wedo_motor-speed_fast.svg","c6ccc23958f6f1f63bf3da24397ce6d0"],["static/blocks-media/icons/wedo_motor-speed_med.svg","043ca7700cb3d77feb7c961e20902445"],["static/blocks-media/icons/wedo_motor-speed_slow.svg","5d36448f0913922583b23bbda55723f6"],["static/blocks-media/icons/wedo_when-distance_close.svg","a0a0a92846810f59ef052cea7335a80e"],["static/blocks-media/icons/wedo_when-tilt-backward.svg","9fbb87c4587ecaf99818cf2e32aa121c"],["static/blocks-media/icons/wedo_when-tilt-forward.svg","50ad4484043907a264ddd3d8959845c4"],["static/blocks-media/icons/wedo_when-tilt-left.svg","e37ddacb2f596649efccf371b6ea14af"],["static/blocks-media/icons/wedo_when-tilt-right.svg","1a3d9d81b6d8844a8a1442c4d2601861"],["static/blocks-media/icons/wedo_when-tilt.svg","eda90cb35927caf62a93effa8139cf1b"],["static/blocks-media/repeat.svg","faeda723162340d506d259eab15a57fc"],["static/blocks-media/rotate-left.svg","09b2fa9a323038e25e0d71f2e204c714"],["static/blocks-media/rotate-right.svg","68c6346a929214004666a69407245ce4"],["static/blocks-media/sprites.png","525a87801f9b33ec2cf606683aefed54"],["static/blocks-media/sprites.svg","911d25e52cb1d95f2d942ec5b7670d06"],["static/blocks-media/zoom-in.svg","db8254dc60f8e2b5190a2f19440ddf74"],["static/blocks-media/zoom-out.svg","6dcc03cf4f57ffe8e5738cc0fc0ca731"],["static/blocks-media/zoom-reset.svg","c70243f271cbeec1c06acbff9d525dd5"]];
var cacheName = 'sw-precache-v3-sw-precache-webpack-plugin-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







