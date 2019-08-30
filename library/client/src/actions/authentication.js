import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_BOOKCAT, GET_BOOKS, DELETE_BOOK, 
    DELETE_BOOKCAT, FETCH_BOOKCAT, ACTIVE_BOOK } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {    
    axios.post('/api/library/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/library/login', user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                alert("Successfully Logged In");
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    //history.push('/login');
}

// Insert Books
export const newbooks = (books,history) => dispatch => {    
    axios.post('/api/library/addbooks', books)
        .then(res => history.push('/book_manage'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

// Insert Book category
export const bookcategory = (bookcats,history) => dispatch => {
axios.post('/api/library/bookcat', bookcats)
        .then(res => {
            history.push('/category_manage');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

// Fetch Book Category
export const getBookCat = () => dispatch => {
    axios.get('/api/library/getbookcat')
        .then(res => {
            const schemas = [];
            let getcat = res.data;
            for(let i in getcat){
              schemas.push(getcat[i].book_cat);
            }
            dispatch(getBooksPosts(schemas));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getBooksPosts = payload => {
    return {
      type: GET_BOOKCAT,
      payload
    }
  };

//   Fetch Books
export const getBooks = () => dispatch => {
    axios.get('/api/library/getbook')
        .then(res => {
            dispatch(fetchBooks(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });    
}

export const fetchBooks = payload => {
    return {
      type: GET_BOOKS,
      payload
    }
  };

//   Delete Book
export const deleteBook = (_id) => dispatch => {
    axios.delete(`/api/library/deleteBook/${_id}`) 
        .then(res => {
            dispatch(deleteBooksPost(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}

export const deleteBooksPost = _id =>{
    return {
        type: DELETE_BOOK,
        payload: {
            _id
        }
      }
}
// Active Inactive
export const activeBook = (_id) => dispatch => {
    axios.put(`/api/library/activeBook/${_id}`) 
        .then(res => {
            dispatch(activeBooksPost(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}

export const activeBooksPost = _id =>{
    return {
        type: ACTIVE_BOOK,
        payload: {
            _id
        }
      }
}

// Delete Book Category
export const deleteBookCat = (_id) => dispatch => {
    axios.delete(`/api/library/deleteBookCat/${_id}`) 
        .then(res => {
            dispatch(deleteBookCatPost(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}

export const deleteBookCatPost = _id =>{
    return {
        type: DELETE_BOOKCAT,
        payload: {
            _id
        }
      }
}

// Fetch Book Category for View Book Category
export const fetchBookCat = () => dispatch => {
    axios.get('/api/library/getbookcat')
        .then(res => {
            dispatch(getBookCatPosts(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getBookCatPosts = payload => {
    return {
      type: FETCH_BOOKCAT,
      payload
    }
  };