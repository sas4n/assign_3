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