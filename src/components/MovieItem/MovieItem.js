import React, { Component } from 'react';
import './MovieItem.css';
import store from '../../store/store';
class MovieItem extends Component {
    addToFavs = (Title, Year, Poster, imdbID)=>{
        store.dispatch({
            type : 'ADD_TO_FAVS',
            payload : {
                title: Title,
                year: Year,
                poster: Poster,
                id: imdbID,
            }
        });
        console.log("ADD  "+" "+ Title + " " + Year +" "+ Poster +" "+ imdbID)
    
    }
    render() {
        const { Title, Year, Poster, imdbID} = this.props;
        console.log(this.props)
        console.log(Title)
        console.log(Year)
        console.log(Poster)
        console.log(imdbID)


const {clientData} = this.props;
        if (clientData === null) {
          return "данные с сервера не были получены(";
        }
        //
        return (
          
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={()=>{this.addToFavs(Title, Year, Poster, imdbID)}}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;