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
