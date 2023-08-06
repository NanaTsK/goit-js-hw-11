// import { fetchBreeds, fetchCatByBreed } from "./cat-api";
// import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';

// const breedList = document.querySelector('.breed-select');
// const CatInfo = document.querySelector('.cat-info');
// const loader = document.querySelector('.loader');

// breedList.addEventListener('change', handlerSelect);

// Loading.circle('Loading data, please wait...');

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

