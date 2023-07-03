const stars = document.querySelectorAll('.comment-stars>img')
    console.log(stars)
function rateFilm(rate){
    for(let i = 0; i < stars.length; i++){
        stars[i].classList.remove('active-star')
    }
    for(let i = 0; i <rate; i++){
        stars[i].classList.add('active-star')
    }
}

function sendRate(e){
    e.preventDefault()
    const activeStar = document.querySelectorAll('.active-star')
    const comment_text= document.querySelector('#comment-text').value
    const author = document.querySelector('#comment_author').value
    const film = document.querySelector('#comment_film').value

    if(activeStar.length > 0){
        axios.post('/api/rate' , { rate: activeStar.length , text: comment_text , authorId: author, filmId: film}).then(data => {
            if(data.data){
                location.reload()
            }
        })
    }
}