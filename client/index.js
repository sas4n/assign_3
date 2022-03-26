document.addEventListener('DOMContentLoaded', async() => {
    console.log('hi from client')
    const response = await fetch('http://localhost:5000')
     const data = await response.json()
    console.log(data)
    fetch('http://localhost:5000/getUsers')
    .then((res) => res.json())
    .then((data) => {showAllUsers(data.users)})
    fetch('http://localhost:5000/getMovies')
    .then((res) => res.json())
    .then((data) => {showAllMovies(data.movies)})
})

const seeResultsButton = document.querySelector('#result-btn')
seeResultsButton.addEventListener('click', () => {
    console.log('hi')
    const movieNameInput = document.querySelector('#movie-name-input')
    console.log(movieNameInput)
    const movieName = movieNameInput.value
    console.log(movieName)
    fetch(`http://localhost:5000/getMoviesOwner/${movieName}`)
   .then((response) => response.json())
   .then((owner) => {showMovieOwnerName(owner)})
   movieNameInput.value = ''
    
})

const checkWhoButton = document.querySelector('#result1-btn')
checkWhoButton.addEventListener('click', () => {
    fetch('http://localhost:5000/get-borrower-name-not-returned-movie')
    .then((response) => response.json())
    .then((data) => {showPersonDidNotReturenedMovieAndMovieName(data)})
})

const showFavoriteMovieButton = document.querySelector('#favorite-movie-btn')
showFavoriteMovieButton.addEventListener('click', () => {
    console.log('click')
    fetch('http://localhost:5000/getMostFavoriteMovie')
    .then((response) => response.json())
    .then((movie) => {showMostFavoriteMovie(movie)})
})

const showavailableFormatsButton = document.querySelector('#available-format-btn')
showavailableFormatsButton.addEventListener('click', () => {
    const resultHaveValues = document.querySelectorAll('.available-format-result')
    if(resultHaveValues.length > 0 || resultHaveValues.length !== undefined) {
        for(let i = 0; i < resultHaveValues.length;i++){
            console.log('here')
            resultHaveValues[i].textContent = ''
        }
        
    }
    const movieNameInput = document.querySelector('#movie-name-input2')
    const movieName = movieNameInput.value
    fetch(`http://localhost:5000/getAvailableFormat/${movieName}`)
    .then(response => response.json())
    .then((movieFormats) => {showAvailableFormatsOfAMovie(movieFormats)})
    movieNameInput.value = ''
})
const showAllUsers = (data) => {
    console.log(data)
    const showAllUsersDiv = document.querySelector('#show-users')
    data.forEach(element => {
        const par = document.createElement('p')
        console.log(element.first_name)
        par.textContent = `${element.first_name}  ${element.last_name}`
        showAllUsersDiv.appendChild(par)
    })

}

const showAllMovies = (data) => {
    const showAllMoviesDiv = document.querySelector('#show-movies')
    data.forEach((movie) => {
        const par = document.createElement('p')
        par.textContent = movie.name
        showAllMoviesDiv.appendChild(par)
    })

}

const showMovieOwnerName = (owner) => {
    const ownerName = document.querySelector('#owner')
    ownerName.textContent = `${owner[0].first_name}  ${owner[0].last_name}`
}

const showPersonDidNotReturenedMovieAndMovieName = (data) => {
    const notReturnedMovieDiv = document.querySelector('#not-returned-movies')
    data.forEach((element) => {
        const par = document.createElement('p')
        par.textContent = `"${element.first_name} ${element.last_name}" did not return movie "${element.name}"`
        notReturnedMovieDiv.appendChild(par)
    })
}

const showMostFavoriteMovie = (movieName) => {
    const favoriteMovieDiv = document.querySelector('#favorite-movie-div')
    const par = document.createElement('p')
    par.textContent = movieName[0].name
    favoriteMovieDiv.appendChild(par)
}

const showAvailableFormatsOfAMovie = (formats) => {
    const availableFormatDiv = document.querySelector('#available-format-div')
    formats.forEach((format) => {
        const par = document.createElement('p')
        par.classList.add('available-format-result')
        par.textContent = format.name
        availableFormatDiv.appendChild(par)
    })
}