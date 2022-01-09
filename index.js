// Create all things related to API
const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const card = document.getElementById('display_card');
const SearchUrl = BASE_URL + '/search/movie?' + API_KEY;
const form = document.getElementById('form');
// const searhValue=document.getElementById('search');
const fav = document.getElementById('favriote');
const dis_single = document.getElementById('dis_fav');
const Related_Movie = document.getElementById('releted_movie');
var id = 1;
// Fetch API
function getdata(url) {
  fetch(url).then(res => res.json()).then(data => {
    showdata(data.results);
  });
}
getdata(API_URL);
// Function for handle and display all data that comes throgh API
function showdata(data) {
  console.log("Home")
  card.innerHTML = '';
  console.log(data);
  data.forEach(element => {
    console.log(element)
    const movieE = document.createElement('div')
    movieE.classList.add('movie')
    movieE.innerHTML = `
        <div class="card" style="width: 10rem;">
       <a href="#" target="blank"><img src="${IMG_URL + element.poster_path}" class="card-img-top" alt="..."></a>
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
   

    
    
   
  </div>
</div>
        `


    card.appendChild(movieE)
    movieE.onclick = () => { Show(element) }
    const button = document.createElement('button');
    button.classList.add('favbtn')
    button.innerText = `Add To Favorite`
    card.appendChild(button);
    button.onclick = () => { Favorite(element) }
  });
}
// Function for handle searching part
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = search.value;
  if (searchValue) {
    favriote.innerHTML = " ";
    releted_movie.innerText = " ";

    getdata(SearchUrl + '&query=' + searchValue);


  }
})
function OnInput(){
  const searchValue = search.value;
  if (searchValue) {
    favriote.innerHTML = " ";
    releted_movie.innerText = " ";

    getdata(SearchUrl + '&query=' + searchValue);


  }
}
//   Create FavList empty array to add favorite movies

//   Function for handle display movie with details
function Show(element) {
  console.log("hello");
  // console.log(e);
  card.innerHTML = ' '
  fav.innerHTML = `
 <div class="container">
 <div class="imgdiv"><img src="${IMG_URL + element.poster_path}" class="poster"></div>
 <div class="detaildiv"> 
 <table>
 <tr>
 <td><h4>Title : </h4></td> </tr>
 <tr><td><h6>${element.title}</h6></td></tr>
 <tr>
 <td><h4>Release Date : </h4></td> </tr>
 <tr><td><h6>${element.release_date}</h6></td></tr>
 <tr>
 <td><h4>Rating : </h4></td> </tr>
 <tr><td><h6>${element.vote_average}</h6></td></tr>
 <td><h4>Total Vote : </h4></td> </tr>
 <tr><td><h6>${element.vote_count}</h6></td></tr>
 <td><h4>Overview : </h4></td> </tr>
 <tr><td><h6>${element.overview}</h6></td></tr>
 

 </table>
 
 </div>
 </div>
 `
  //  card.onclick=()=>{Favorite(element)}
  const button = document.createElement('button');
  button.classList.add('favbtn')
  button.innerText = `Add To Favorite`
  fav.append(button);
  button.onclick = () => { Favorite(element) }
  releted_movie.innerText = "Related Movies";
  getdata(API_URL);

}
// Function for add movie in favorite list
function Favorite(e) {
  // console.log(e.title)
  // favList.push(e);
 
  localStorage.setItem(e.title, JSON.stringify(e));
  id++;

}
// Function for handle Favorite page on click navbar favorite button
function FavoriteHandle() {
  fav.innerHTML = ' ';
  console.log("welcome");
  // console.log(favList);
  releted_movie.innerText = " ";
  var favList = [];
  // var item=JSON.parse(localStorage.getItem("favList"));
  for (var i = 0; i < localStorage.length; i++) {
    var item = localStorage.getItem(localStorage.key(i));
    favList.push(JSON.parse(item));
  }

  if (favList.length === 0) {

    card.innerHTML = `
    <div class="Msg">
      <h1>Favorite List is Empty Click below button to go to home and add movie in Favorite list</h1>
      <h3><button class="btnHome" onclick="HomeHandle()">Home</button></h3>
      </div>
    `


  } else {
    showFavdata(favList);
  }
}
// Function for Handle home button as well as Movievilla (page heading) click that present on navbar
function HomeHandle() {
  favriote.innerHTML = " ";
  releted_movie.innerText = " ";
  getdata(API_URL);
}
function showFavdata(data){
  card.innerHTML = '';
  console.log(data);
  data.forEach(element => {
    console.log(element)
    const movieE = document.createElement('div')
    movieE.classList.add('movie')
    movieE.innerHTML = `
        <div class="card" style="width: 10rem;">
       <a href="#" target="blank"><img src="${IMG_URL + element.poster_path}" class="card-img-top" alt="..."></a>
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
   

    
    
   
  </div>
</div>
        `


    card.appendChild(movieE)
    movieE.onclick = () => { Show(element) }
    const button = document.createElement('button');
    button.classList.add('favbtn')
    button.innerText = `Remove To Favorite`
    card.appendChild(button);
    button.onclick = () => { RemoveFavItem(element) }
  });

}
function RemoveFavItem(e){
  localStorage.removeItem(e.title);
  FavoriteHandle()
}