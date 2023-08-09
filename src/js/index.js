import { PixaBayAPI } from "./pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// Loading.circle('Loading data, please wait...');

// Notify.success(`Hooray! We found ${data.totalHits} images.`);
// Notify.info("We're sorry, but you've reached the end of search results.");
// Notify.warning("Sorry, there are no images matching your search query. Please try again.");

// export const notifyInit = {
//   width: '250px',
//   position: 'right-bottom',
//   distance: '20px',
//   timeout: 1500,
//   opacity: 0.8,
//   fontSize: '16px',
//   borderRadius: '50px',
// };

// } else
//           Notify.info(
//             "We're sorry, but you've reached the end of search results.",
//             notifyInit
//           );

const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const target = document.querySelector(".js-guard");
const PixaBayAPIInstance = new PixaBayAPI();

const simplelightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
console.log("SimpleLightbox initialized"); 

// const gallery = new SimpleLightbox('.gallery-link', {
                // captionsData: 'alt',
                // captionDelay: 250,
//   });


searchForm.addEventListener("submit", handlerSearchForm);

function handlerSearchForm(evt) { 
    evt.preventDefault();

    gallery.innerHTML = "";
    const searchQuery = evt.currentTarget.elements["searchQuery"].value.trim();
        PixaBayAPIInstance.q = searchQuery;
      searchPhotos();
}

async function searchPhotos() {

    try {
        const response = await PixaBayAPIInstance.fetchImages();
        console.log("API Response:", response.data); // Add this line        
        const images = response.data.hits;
        const markup = createMarkup(images);
        gallery.insertAdjacentHTML("beforeend", markup);

        simplelightbox.refresh();

    } catch (error) { 
        console.error("Error fetching images:", error);
}
}

async function searchMorePhotos() {
    try { 
        PixaBayAPIInstance.changePage();
        const response = await PixaBayAPIInstance.fetchImages();
        const images = response.data.hits;
        const markup = createMarkup(images);
        gallery.insertAdjacentHTML("beforeend", markup);

        simplelightbox.refresh();

    } catch (error) { 
    console.error("Error fetching images:", error);
}
}


// function createMarkup(data) { 
//     return data
//         .map(({ 
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads
//             }) => `
//            <a class="gallery__link" href="${largeImageURL}">
//                 <div class="photo-card gallery__item">
//               <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width='320' height='200' />
//               <div class="info">
//                 <p class="info-item">
//                    <b>Likes: ${likes}</b>
//                 </p>
//                 <p class="info-item">
//                 <b>Views: ${views}</b>
//                 </p>
//                 <p class="info-item">
//                    <b>Comments: ${comments}</b>
//                 </p>
//                 <p class="info-item">
//                    <b>Downloads: ${downloads}</b>
//                 </p>
//               </div>
//             </div>
//             </a>
//             `)
//         .join("");
// }

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
        <div class="photo-card gallery__item">
            <a class="gallery__link" href="${largeImageURL}">
    <img
      class="gallery__image"
      src="${webformatURL}"
      alt="${tags}"
      loading="lazy"
      width="360"
      height="260"
    />
  
  <div class="info">
    <div class="info-left">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
    </div>
    <div class="info-right">
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>
  </a>
</div>
            `)
        .join("");
}

// <a href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy" /></a>

// <a href='${largeImageURL}' class="card-link js-card-link"></a>

// Set up Intersection Observer for infinite scrolling

const options = {
  root: null,
  rootMargin: "400px",
  threshold: 1.0,
};
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    searchMorePhotos();
  }
}, options);

observer.observe(target);

// let observer = new IntersectionObserver(onLoad, options);
// function onLoad(entries, observer) { 

//     entries.forEach((entry) => {
//         if (entry.isIntersecting) { 
//             currentPage += 1; 
//             getTrending(currentPage)
//                .then(data => { 
//                    list.insertAdjacentHTML("beforeend", createMarkup(data.results))
//                 //    if (data.page === data.total_pages) {    <=THIS IS NOT WORKING AS ONLY 500 PAGES ARE LOADING INSTEAD OF 1000
//                    if (data.page === data.total_pages/2) { 
//                        observer.unobserve(target);
//                    }
//     })
//     .catch(err => console.log(err));
//         }
//     })
// }

// console.log(createMarkup(data));
// console.log(createMarkup);

//* =====================================






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

