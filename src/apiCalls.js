export default function fetchData() {
    return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies').then(response => response.json()).catch(error => console.log(error))
}