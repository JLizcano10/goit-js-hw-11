import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './pixabay-api';
import { createMarkup } from './createMarkup';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', searchHandle);

function searchHandle(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  const request = e.target.elements.searchQuery.value;
  getPhotos(request).then(data => {
    const dataArray = data.hits;
    if (dataArray.length !== 0) {
      createMarkup(dataArray, refs.gallery);
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  });
}
