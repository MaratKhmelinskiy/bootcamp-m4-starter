import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../store/store';

class Movies extends Component {
    state = { 
        movies: []
        
    }

componentDidMount(){
    store.subscribe (()=> {
const globalstate = store.getState();
fetch (`http://www.omdbapi.com/?apikey=59cdbaf0&s=${globalstate.searchLine}`)
.then (resp=>{
    return resp.json();
})
.then(data=>{
data.response === false?
this.setState({movies: 0}):
this.setState({movies: data.Search});

})
.catch((error)=> {
console.log("Error",error)

})
    })
}

    render() { 
        
        return ( 
            <>
            {this.state.movies ?
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul> : <p>Отсутствуют данные</p>
    }
            </>
        );
    }
}
 
export default Movies;