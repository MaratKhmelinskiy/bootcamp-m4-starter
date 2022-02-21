import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        title: "",

    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)

            .then(response => response.json())
            .then(data => {

                this.setState({ movies: data.movies, title: data.title })
            })
            .catch((error) => {
                console.log(error);
            })


    }
    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.id}`} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;