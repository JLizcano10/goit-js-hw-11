import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './pixabay-api';
import { createMarkup } from './createMarkup';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
let page;

function searchHandle(e) {
  e.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  const request = e.target.elements.searchQuery.value;
  if (request !== '') {
    getPhotos(request, page).then(data => {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      const dataArray = data.hits;
      if (dataArray.length !== 0) {
        createMarkup(dataArray, refs.gallery);
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
function loadMoreHandle() {
  console.log('alo?');
}
refs.searchForm.addEventListener('submit', searchHandle);
refs.loadMore.addEventListener('submit', loadMoreHandle);
