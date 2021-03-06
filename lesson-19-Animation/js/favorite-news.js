//Init UI
const ui = new UI();
//Init Auth
const auth = new Auth();
//Init favorite news
const news = new FavoriteNews();
//Init news-store
const newsStore = NewsStore.getInstance();
const alert = new Alert();
const anmNews = new AnimateNews;


const newsContainer = document.querySelector('.news-container');
const removeAllNewsBtn = document.querySelector('.remove-all-news');



//Events
window.addEventListener('load', onLoad);
newsContainer.addEventListener('click',onRemoveFromFavorite);
removeAllNewsBtn.addEventListener('click',onRemoveAllNewsBtn);


function onLoad(e) {
    news.getFavoriteNews()
        .then(favoriteNews => {
            return new Promise((resolve,reject)=> {
                if(favoriteNews.size === 0) {
                    ui.showInfo('No Favorite News')
                } else resolve(favoriteNews)
            })
            .then(favoriteNews => {
                favoriteNews.forEach((doc) => {
                    ui.addFavoriteNews(doc.data(),doc.id);
                    let element = findElement(doc.id);
                    anmNews.animationOpacityNews(element);
                })
            })
    })
        .catch(err => console.log(err))
}
function findElement(index) {
    return document.querySelector(`[data-id = "${index}"]`).closest('.card')
}

function onRemoveFromFavorite(e) {
    if(e.target.classList.contains('remove-favorite')) {
        e.target.closest('.col').remove();
        const id = e.target.dataset.id;
        news.deleteNews(id)
            .then(alert.showAlert({error:true,text:'News removed from Favorite News'}))
            .then(
                news.getFavoriteNews()
                    .then(favoriteNews => {
                        if(favoriteNews.size === 0)ui.showInfo('No Favorite News')
                    })
            )
            .catch(err => console.log(err))

    }
}

function onRemoveAllNewsBtn(e) {
    newsContainer.querySelector('.row').remove();
    news.getFavoriteNews()
        .then(docs => {
            docs.forEach(doc => {
                news.deleteNews(doc.id)
            })
        })
        .then(ui.showInfo('No Favorite News'));

}
