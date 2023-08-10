import { PixaBayAPI } from "./pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Loading } from 'notiflix/build/notiflix-loading-aio';
// Loading.circle('Loading data, please wait...');
// .finally(Loading.remove());

// Notify.success(`Hooray! We found ${data.totalHits} images.`);
// Notify.info("Hey, you've reached the end of search results.");
// Notify.warning("Sorry, there are no images matching your search query. Please try again.");


const notifyInit = Notify.init({
  width: '280px',
  position: 'right-bottom',
  distance: '20px',
  timeout: 2000,
  opacity: 0.8,
  fontSize: '20px',
  borderRadius: '50px 10px',
  pauseOnHover: true,
});

const notifyLoadInit = Loading.init({
  // className: 'notiflix-loading',
  // backgroundColor: 'rgba(0,0,0,0.8)',
  // backgroundColor: 'rgba(238,238,238, 0.8)',
  backgroundColor: 'transparent',
  // svgSize: '80px',
  // svgColor: '#32c682',
  // messageColor: '#dcdcdc',
});


const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const target = document.querySelector(".js-guard");
const btnUp = document.querySelector(".btn-up");
const PixaBayAPIInstance = new PixaBayAPI();

const simplelightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
console.log("SimpleLightbox initialized"); 

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

window.addEventListener("scroll", onScroll);
btnUp.addEventListener("click", scrollToTop);
searchForm.addEventListener("submit", handlerSearchForm);

function handlerSearchForm(evt) { 
    evt.preventDefault();

    observer.unobserve(target);

    gallery.innerHTML = "";
    const searchQuery = evt.currentTarget.elements["searchQuery"].value.trim();
        PixaBayAPIInstance.q = searchQuery;
  searchPhotos();
  searchForm.reset(); //*
}

async function searchPhotos() {

    try {
        Loading.circle(notifyLoadInit);
        const response = await PixaBayAPIInstance.fetchImages();
        console.log("API Response:", response.data);
        const images = response.data.hits;
        const markup = createMarkup(images);
        gallery.insertAdjacentHTML("beforeend", markup);

        if (images.length < 1) {
            Notify.warning("Sorry, there are no images matching your search query. Please try again.", notifyInit);
          searchForm.reset(); //*
          return;
        } else { Notify.success(`Hooray! We found ${response.data.totalHits} images.`), notifyInit }
        
        observer.observe(target);

        searchForm.reset();
        simplelightbox.refresh();
        Loading.remove();

    } catch (error) {
        console.error("Error fetching images:", error);
        
    } finally {Loading.remove(); }
}

async function searchMorePhotos() {
    try { 
        // Loading.circle(notifyLoadInit);
        PixaBayAPIInstance.changePage();
        const response = await PixaBayAPIInstance.fetchImages();
        const images = response.data.hits;
        const markup = createMarkup(images);
        gallery.insertAdjacentHTML("beforeend", markup);

        if (PixaBayAPIInstance.page * 40 >= response.data.totalHits) { 
            observer.unobserve(target);

                // Notify.info("Hey, you've reached the end of search results"), notifyInit
              Notify.info("Hey, that's all we've got for your search"), notifyInit
            }
        simplelightbox.refresh();
        // Loading.remove();

    } catch (error) { 
        console.error("Error fetching images:", error);
        // Loading.remove();
}
}

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

function onScroll() { 
  btnUp.classList.toggle('hidden', window.scrollY > 800);
}
function scrollToTop() { 
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}


//* =====================================


// Set up Intersection Observer for infinite scrolling

// const options = {
//   root: null,
//   rootMargin: "400px",
//   threshold: 1.0,
// };
// const observer = new IntersectionObserver(entries => {
//   if (entries[0].isIntersecting) {
//     searchMorePhotos();
//   }
// }, options);

// observer.observe(target);

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

