import axios from "axios";

class PixaBayAPI { 
    #BASE_URL = "https://pixabay.com/api/";
    // #API_KEY = "38687572-8bc90b5796d20c3c60f436eda";

    q = null;
    page = 1;

    async fetchImages() { 
        const searchParams = new URLSearchParams({
            key: '38641927-f84485d6b228f5ae40ab4372b',
            // key: this.#API_KEY,
            q: this.q,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: this.page,
            per_page: 40,
        });

        const apiUrl = `${this.#BASE_URL}?${searchParams}`;
    console.log("API URL:", apiUrl); // Add this line

    const data = await axios.get(apiUrl);
        return data;
        
        // const data = await axios.get(`${this.#BASE_URL}?${searchParams}`);
        // return data;
    }

    changePage() { 
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }
}

export { PixaBayAPI };
    
    //* =====================================

// У відповіді буде масив зображень, що задовольнили критерії параметрів запиту. 
// Кожне зображення описується об'єктом, з якого тобі цікаві тільки наступні властивості:

//     webformatURL - посилання на маленьке зображення для списку карток.
//     largeImageURL - посилання на велике зображення.
//     tags - рядок з описом зображення. Підійде для атрибуту alt.
//     likes - кількість лайків.
//     views - кількість переглядів.
//     comments - кількість коментарів.
//     downloads - кількість завантажень.





