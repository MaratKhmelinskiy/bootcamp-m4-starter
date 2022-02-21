

const initialState = {
    searchLine: [],
    movies: [],
    favMovies: [],
    idList: '',
}


function reducer(state = initialState, action) {

    switch (action.type) {
        case 'SEARCH':
            const searchLine = action.payload.searchLine;



            return {

                ...initialState,
                searchLine: action.payload.searchLine
            }
            break;
        case 'ADD_TO_FAVS':
            const favAction = action.payload
            const arr = [...state.favMovies]
            let fav = arr.find(
                item => item.id === action.payload.id)
            if (fav) {
                return state;

            } else { arr.push(favAction) };

            return {
                ...state,
                favMovies: arr
            }


        case 'REMOVE_FAVORITES':
            const newFilms = state.favMovies.filter(
                item => item.id !== action.payload.id
            );
            return {
                ...state,
                favMovies: newFilms
            };
            
        case 'GET_LIST_ID':
            return {
                ...state, idList: action.payload.listId
            }
        default: return state


    }





}

export default reducer;
