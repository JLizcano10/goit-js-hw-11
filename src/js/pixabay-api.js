import axios from 'axios';
import Notiflix from 'notiflix';
const url = 'https://pixabay.com/api/?key=39922644-bcfb57c4c3a31264e272bb894';
async function getPhotos(request) {
  try {
    const response = await axios.get(url, {
      q: request,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    });

    const photos = await response.data;
    console.log(photos);
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

export { getPhotos };
