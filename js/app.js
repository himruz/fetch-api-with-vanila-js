// load category name 

const loadCategoryName = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    } catch (error) {
        console.log(error)
    }

}
// display category name 
const displayCategory = (categories) => {
    const ul = document.getElementById('category-ul');

    categories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('nav-item', 'menu-items', 'ms-3');
        li.innerHTML = `<a onclick="loadNews('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>`;
        ul.appendChild(li)
    });
}

// load news on diffirent category

const loadNews = async (category_id) => {
    try {
        toggleSpinner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);

    } catch (error) {
        console.log(error)
    }

}
const loadDefaultNews = async () => {
    try {
        toggleSpinner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/08`
        const res = await fetch(url);
        const data = await res.json();
        displayDefaultNews(data.data);

    } catch (error) {
        console.log(error)
    }

}

const displayDefaultNews = (newses) => {

    newses.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    const cardParent = document.getElementById('card-parent');
    cardParent.innerHTML = '';
    const found = document.getElementById('found')


    newses.forEach(news => {
        const createNewsDiv = document.createElement('div');
        createNewsDiv.classList.add('card', 'mb-5', 'p-3', 'shadow', 'mt-5');
        createNewsDiv.style.maxWidth = '1000px';
        createNewsDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
        <img src="${news.image_url}" class="img-fluid rounded" alt="..." style="height:100%">
    </div>
    <div class="col-md-8">
        <div class="card-body p-5">
            <h5 class="card-title mb-3">${news.title}</h5>
            <p class="card-text">${news.details.slice(0, 300)}...</p>
           
            <div class="news-meta mt-5 d-flex justify-content-between">
                <div class="author-info d-flex">
                    <div class="author-img me-3">
                        <img src="${news.author.img}" class="img-fluid rounded" width="40"
                            height="24" alt="">
                    </div>
                    <div class="author-name">
                        <p>${news.author.name ? news.author.name : 'No Data Found'}</p>
                        <p>${news.author.published_date ? news.author.published_date : 'No Storage  Found'}</p>
                    </div>
                </div>
                <div class="news-view d-flex">
                    <div class="view-icon me-3">
                        <span><i class="fa-regular fa-eye"></i></span>
                    </div>
                    <div class="view-count">
                        <p>${news.total_view ? news.total_view : 'No data found'}</p>
                    </div>
                </div>
                <div class="news-ratings">
                    <span><i class="fa-solid fa-star-half-stroke"></i></span>
                    <span><i class="fa-solid fa-star-half-stroke"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                </div>
                <div class="click-details">
                    <button onclick="loadDetails('${news._id}')" type="button" class="click-details" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                </div>
            </div>
        </div>
    </div>
    </div>  
        `
        cardParent.appendChild(createNewsDiv);
    });
    toggleSpinner(false);
}

// display news on diffirent category

const displayNews = (newses) => {
    newses.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    const cardParent = document.getElementById('card-parent');
    cardParent.innerHTML = '';
    const found = document.getElementById('found')
    if (newses.length > 0) {
        found.classList.remove('d-none')
        const heading = document.getElementById('heading');
        heading.innerText = `${newses.length} Items Found`
    } else {
        found.classList.remove('d-none')
        const heading = document.getElementById('heading');
        heading.innerText = `No Items Found`
    }

    newses.forEach(news => {

        const createNewsDiv = document.createElement('div');
        createNewsDiv.classList.add('card', 'mb-5', 'p-3', 'shadow', 'mt-5');
        createNewsDiv.style.maxWidth = '1000px';
        createNewsDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
        <img src="${news.image_url}" class="img-fluid rounded" alt="..." style="height:100%">
    </div>
    <div class="col-md-8">
        <div class="card-body p-5">
            <h5 class="card-title mb-3">${news.title}</h5>
            <p class="card-text">${news.details.slice(0, 300)}...</p>
           
            <div class="news-meta mt-5 d-flex justify-content-between">
                <div class="author-info d-flex flex-sm-column">
                    <div class="author-img me-3">
                        <img src="${news.author.img}" class="img-fluid rounded" width="40"
                            height="24" alt="">
                    </div>
                    <div class="author-name">
                        <p>${news.author.name ? news.author.name : 'No Data Found'}</p>
                        <p>${news.author.published_date ? news.author.published_date : 'No Storage  Found'}</p>
                    </div>
                </div>
                <div class="news-view d-flex">
                    <div class="view-icon me-3">
                        <span><i class="fa-regular fa-eye"></i></span>
                    </div>
                    <div class="view-count">
                        <p>${news.total_view ? news.total_view : 'No data found'}</p>
                    </div>
                </div>
                <div class="news-ratings">
                    <span><i class="fa-solid fa-star-half-stroke"></i></span>
                    <span><i class="fa-solid fa-star-half-stroke"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                </div>
                <div class="click-details">
                    <button onclick="loadDetails('${news._id}')" type="button" class="click-details" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                </div>
            </div>
        </div>
    </div>
    </div>  
        `
        cardParent.appendChild(createNewsDiv);
    });
    toggleSpinner(false);
}

const loadDetails = async (news_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`
        const res = await fetch(url);
        const data = await res.json()
        displayNewsDetails(data.data)

    } catch (error) {
        console.log(error)
    }

}

const displayNewsDetails = newsDetails => {
    const newsTitle = document.getElementById('exampleModalLabel');
    newsTitle.innerText = newsDetails[0].title;
    const newsImg = document.getElementById('news-img');
    newsImg.classList.add('img-fluid');
    newsImg.src = newsDetails[0].image_url;
    const newsDesc = document.getElementById('desc');
    newsDesc.innerText = newsDetails[0].details;


}

const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('loader');
    if (isLoading) {
        loadingSection.classList.remove('d-none')
    } else {
        loadingSection.classList.add('d-none')
    }
}



loadCategoryName('');

loadDefaultNews();