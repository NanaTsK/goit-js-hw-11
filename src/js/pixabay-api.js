import axios from "axios";

class PixaBayAPI { 
    #BASE_URL = "https://pixabay.com/api/";
    #API_KEY = "38687572-8bc90b5796d20c3c60f436eda";

    q = null;
    page = 1;

    async fetchImages() { 
        const searchParams = new URLSearchParams({
            key: this.#API_KEY,
            q: this.q,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: this.page,
            per_page: 40,
        });

        const apiUrl = `${this.#BASE_URL}?${searchParams}`;
    console.log("API URL:", apiUrl); 

    const data = await axios.get(apiUrl);
        return data;
    }

    changePage() { 
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }

    // setTotal(total) {
    //     this.#totalPages = total;
    // }

    // hasMorePhotos() {
    //     return this.#page < Math.ceil(this.#totalPages / this.#per_page);
    // }
}

export { PixaBayAPI };


