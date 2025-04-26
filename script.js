
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6c90a10b5d3a39b1af49ba26cf9fb6ca&page=1'
const  IMG_SORC_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie?api_key=6c90a10b5d3a39b1af49ba26cf9fb6ca&query="'


const  main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

get_movies_from_api(API_URL);


async function get_movies_from_api(link){
	const res = await fetch(link);

	const data = await res.json();

	display_on_page(data.results);
}

function display_on_page(movies){
	main.innerHTML=''

	movies.forEach((movie) =>{
		const {title , poster_path , vote, overview} = movie

		const movie_el = document.createElement('div');
		movie_el.classList.add('movie')

		movie_el.innerHTML = `
		 <img src= "${IMG_SORC_PATH + poster_path}" alt = "$(title)">
			<div class="movie-info">
			<h3>${title}</h3>
				<span class ="${getClassByRating(vote)}">${vote}</span>
			</div>
			<div class = "overview">
			<h3>Overview</h3>
			${overview}
			</div>
			`
		main.appendChild(movie_el)
	})

}

 async function getClassByRating(vote){
	if(vote>=8){
		return 'green'
	}
	else if (vote >=5){
		 return 'orange'
	}else {
	return 'red'
	}

}

form.addEventListener('submit',(e) => {
	e.preventDefault()

	const searchTerm = search.value
	if(searchTerm && searchTerm !==''){
		get_movies_from_api(SEARCH_PATH + searchTerm)

		search.value = ''

	}
	else{
		window.location.reload();	
	}
})

