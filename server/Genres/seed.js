const Genres = require('./Genres')
const data =[
    'Комедии',
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Милодраммы',
    'Детективы',
    'Приключения',
    'Фэнтези'
]

async function writeDataGenre(){
    const length = await Genres.count()
    // console.log(length)
    if(length === 0){
        data.map((item, index) => {
            new Genres ({
                name: item,
                key: index
            }).save()
        })
    }
}

module.exports = writeDataGenre