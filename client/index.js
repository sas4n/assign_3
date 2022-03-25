document.addEventListener('DOMContentLoaded', () => {
    console.log('hi from client')
    fetch('http://localhost:5000')
    .then((response) => response.json())
    .then((data) => {console.log(data)})
})

const creatDbButton = document.querySelectorAll('.create-db-btn')
creatDbButton[0].addEventListener('click', () => {
    console.log('hi')
    fetch('http://localhost:5000/createDB')
   .then((response) => response.json())
   .then((data) => {console.log(data)})
    
})

const createDatabase = () => {

}