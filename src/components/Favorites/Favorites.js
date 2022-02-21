import React, { Component } from 'react';
import './Favorites.css';
import store from '../../store/store';
import {Link} from 'react-router-dom';



class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [ ],
        listId: [],
        isClicked: false,
      
    }
    componentDidMount(){
        store.subscribe(() => {
          const favList = store.getState();
          this.setState({movies: favList.favMovies});
        })
      }

removeFavorites(imdbID) {
    store.dispatch({
        type: 'REMOVE_FAVORITES',
        payload: {
            id: imdbID,
        }
    })
}
     
      getListId = (listId) => {
        store.dispatch({
            type : 'GET_LIST_ID',
            payload : {
                listId: listId,
            }
        
        });
    }
    
      

      handleChangeNewList = (event) => {
      this.setState ({title: event.target.value});
      };
      handleSaveList = (event) => {

        this.setState({isClicked: true})
        const data = this.state
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
        },
            body: JSON.stringify(data),

        })
        .then(response => response.json())
        .then(data => {
            let listId = data.id
            this.setState({listId: listId})
            console.log("id списка", data)
        })
        .catch((error)=>{
            console.log (error);
        })
     

      };
    render() { 

       
        const { title, isClicked, listId } = this.state;
        return (
           
            <div className="favorites">
                <input value={title} onChange={this.handleChangeNewList} disabled={this.state.isClicked} className="favorites__name" />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return <li key={item.id}>{item.title} ({item.year})<button onClick={() => this.removeFavorites(item.id)}>X</button></li>;
                    })}
                </ul>
                {isClicked ? 
                <Link to={`/list/${this.state.listId}`}>Перейти к списку</Link> :
                <button type="button" className="favorites__save" onClick={this.handleSaveList}>Сохранить список</button>
                }
                </div>
                      
        );
    }
}
 
export default Favorites;