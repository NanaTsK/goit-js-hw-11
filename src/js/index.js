import { PixaBayAPI } from "./pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.success(`Hooray! We found ${data.totalHits} images.`);
// Notify.info("Hey, that's all we've got for your search.");
// Notify.warning("Sorry, there are no images matching your search query. Please try again.");
import { Loading } from 'notiflix/build/notiflix-loading-aio';
// Loading.circle('Loading data, please wait...');
// .finally(Loading.remove());


const notifyInit = Notify.init({
  width: '280px',
  position: 'right-bottom',
  distance: '20px',
  // timeout: 2600,
  opacity: 0.8,
  fontSize: '20px',
  borderRadius: '50px 10px',
  notiflixIconColor: 'rgba(0,0,0,0.6)',
  pauseOnHover: true,
});

const notifyLoadInit = Loading.init({
  backgroundColor: 'transparent',
  svgSize: '120px',
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
              Notify.info("Hey, that's all we've got for your search"), notifyInit
            }
      simplelightbox.refresh();
      addSmoothScroll();
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
            <button class="like-button button">
              <svg  
                class="like-icon"
                width="32"
                height="32"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.667" d="M27.787 6.147a7.326 7.326 0 0 0-10.373 0L16.001 7.56l-1.413-1.413a7.333 7.333 0 0 0-10.374 0 7.333 7.333 0 0 0 0 10.374l11.787 11.787 11.787-11.787a7.345 7.345 0 0 0 2.15-5.187 7.33 7.33 0 0 0-2.15-5.187z"/>
              </svg>
            </button>


        <a class="gallery__link" href="${largeImageURL}"> 
        <img
            class="gallery__image"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
            width="320"
            height="220"
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

function addSmoothScroll() { 
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

//* =====================================

const likeButton = document.querySelector('.like-button');

likeButton.addEventListener('click', () => {
  likeButton.classList.toggle('clicked');
  // Perform additional actions, such as adding to a list of liked photos
});

//* =====================================
//* Notyfy FOR ERROR ###    

 // .catch(error => {
  //           Report.failure(
  //               'Oops! Something went wrong!',
  //               '🐾 Try reloading the page!',
  //               'OK',
  //               {
  //               plainText: 'center',}
  //           );
  //       // Loading.remove();
  //       })

//* =====================================

