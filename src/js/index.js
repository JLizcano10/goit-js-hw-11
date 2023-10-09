import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './pixabay-api';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', searchHandle);

function searchHandle(e) {
  e.preventDefault();
  const request = e.target.elements.searchQuery.value;
  getPhotos(request).then(data => {
    const dataArray = data.hits;
  });
}
