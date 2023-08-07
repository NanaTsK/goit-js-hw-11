export { PixaBayAPI } from "./pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// Loading.circle('Loading data, please wait...');

// Notify.success(`Hooray! We found ${data.totalHits} images.`);
// Notify.info("We're sorry, but you've reached the end of search results.");
// Notify.warning("Sorry, there are no images matching your search query. Please try again.");

  gallery = new SimpleLightbox('.gallery-link', {
                captionsData: 'alt',
                captionDelay: 250,
  });



function createMarkup(data) { 
    return data
        .map(({ 
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
            }) => `
            <div class="photo-card">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                   <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                   <b>Comments: ${comments}</b>
                </p>
                <p class="info-item">
                   <b>Downloads: ${downloads}</b>
                </p>
              </div>
            </div>
            `)
        .join("");
}

            
//* =====================================

// import { fetchBreeds, fetchCatByBreed } from "./cat-api";
// import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';

// const breedList = document.querySelector('.breed-select');
// const CatInfo = document.querySelector('.cat-info');
// const loader = document.querySelector('.loader');

// breedList.addEventListener('change', handlerSelect);


// fetchBreeds()
//     .then(data => {
//         createOptions(data.data);
//         new SlimSelect({
//             select: '.breed-select',
//         });
//         breedList.classList.remove('is-hidden');
//     })
//     .catch(error => {
//         Report.failure(
//                 'Oops! Something went wrong!',
//                 '🐾  Try reloading the page!',
//                 'OK'
//             );
//     })
//     .finally(Loading.remove());

// function createOptions(arrCats) {
//     breedList.innerHTML = arrCats
//         .map(({ id, name }) => `<option value=${id}>${name}</option>`)
//         .join('');
// }

// function createCard(selectedCat) {
//     CatInfo.innerHTML = `
//     <article class="flex-container">
//   <img
//     src="${selectedCat.url}"
//     alt="${selectedCat.breeds[0].name} 🐈"
//     width="400"
//     height="auto"/>
//   <div class="cat-card">
//     <h2>${selectedCat.breeds[0].name} 🐈</h2>
//     <p>${selectedCat.breeds[0].description}</p>
//     <p><b>Temperament: </b>${selectedCat.breeds[0].temperament}</p>
//   </div></article>
//     `;
// }




//* TO BE USED FOR ERROR ###    
// function handlerSelect(elem) {
//     Loading.circle('Loading data, please wait...');
//     CatInfo.innerHTML = '';
//     fetchCatByBreed(elem.target.value)
//         .then(data => {
//             createCard(...data.data);
//             CatInfo.classList.remove('is-hidden');
//         })
//         .catch(error => {
//             Report.failure(
//                 'Oops! Something went wrong!',
//                 '🐾 Try reloading the page!',
//                 'OK',
//                 {
//           plainText: 'center',
//         }
//             );
//         })
//         .finally(Loading.remove());
// }

