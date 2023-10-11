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
let request;
let dataArray;
let lightbox = new SimpleLightbox('.gallery a');
Notiflix.Notify.init({
  width: '500px',
  fontSize: '15px',
  info: {
    background: '#f8a63b',
  },
});

refs.loadMore.style.display = 'none';

async function searchHandle(e) {
  e.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  scrollToTop();
  request = e.target.elements.searchQuery.value;
  if (request !== '') {
    await getPhotos(request, page).then(data => {
      dataArray = data.hits;
      totalData = data.totalHits;
      if (dataArray.length !== 0) {
        Notiflix.Notify.success(`Hooray! We found ${totalData} images.`);
        createMarkup(dataArray, refs.gallery);
        lightbox.refresh();
        refs.loadMore.style.display = 'flex';
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

async function loadMoreHandle(e) {
  e.preventDefault();
  page += 1;

  await getPhotos(request, page).then(data => {
    dataArray = data.hits;
    const totalPages = parseInt(data.totalHits / 40);
    console.log(totalPages);
    if (page <= totalPages) {
      createMarkup(dataArray, refs.gallery);
      lightbox.refresh();
      scrollToNextGroup();
    } else {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function scrollToNextGroup() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
refs.searchForm.addEventListener('submit', searchHandle);
refs.loadMore.addEventListener('click', loadMoreHandle);
