(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const isProd = window.location.origin.includes('hotels-booking-engine');
const basePath = isProd ? '/documentation' : '';
const isRoomDetail = window.location.href.includes('/room-detail/');

// Events Room List
window.addEventListener('qwRoomListClickRoom', (e) => {
  console.log(e.detail.type);
  if (e.detail.type === 'changeDate') {
    window.location.href = `${basePath}/calendar`;
    return;
  }

  window.location.href = `${basePath}/room-detail?id=${e.detail.room.roomId}`;
});


//Events Room Detail
window.addEventListener('qwRoomDetailAddAnotherRoom', () => {
  window.location.href = `${basePath}/`;
});
window.addEventListener('qwRoomDetailProceed', () => {
  window.location.href = `${basePath}/basket`;
});

document.addEventListener('DOMContentLoaded', () => {
  if (isRoomDetail) {
    //Inject qw-room-detail
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');
    const sectionEl = document.querySelector('section');
    const qwRoomDetailElement = document.createElement('qw-room-detail');
    const qwRoomDetailElementLoading = document.createElement('div');
    qwRoomDetailElement.setAttribute('qw-room-detail-id', roomId);
    qwRoomDetailElementLoading.setAttribute('slot', 'qwRoomDetailLoading');
    sectionEl.appendChild(qwRoomDetailElement);
  }
});

},{}]},{},[1]);
