// Create all things related to API
const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const card=document.getElementById('display_card');
const SearchUrl=BASE_URL+'/search/movie?'+API_KEY;
const form=document.getElementById('form');
// const searhValue=document.getElementById('search');
const fav=document.getElementById('favriote');
const dis_single=document.getElementById('dis_fav');
const Related_Movie=document.getElementById('releted_movie');
// Fetch API
function getdata(url){
  fetch(url).then(res=>res.json()).then(data=>{
      showdata(data.results);
  });
}
getdata(API_URL );
// Function for handle and display all data that comes throgh API
function showdata(data){
     console.log("Home")
    card.innerHTML='';
    console.log(data);
    data.forEach(element => {
        console.log(element)
        const movieE=document.createElement('div')
        movieE.classList.add('movie')
        movieE.innerHTML=`
       <span> <div class="card" style="width: 8rem;">
  <img src="${IMG_URL+element.poster_path}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    
   
  </div>
</div></span>
        `
        
        card.appendChild(movieE)
        movieE.onclick=()=>{Show(element)}
    });
}
// Function for handle searching part
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchValue=search.value;
    if(searchValue){
      favriote.innerHTML=" ";
      releted_movie.innerText=" ";
      
      getdata(SearchUrl+'&query='+searchValue);
      
  
    }
  })