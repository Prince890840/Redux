const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

// step: 1 define the global state that we can use it
const initialStates = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// step:2 create an action that contain type fields.
const fetchUsersRequest = () => {
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error =>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// step: 3 create a reducer that contain current state + action object and return newState
const reducer = (state = initialStates,action) =>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                error:''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
    }
} 

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
         .then(response => {
             //response.data is the array of users
             const users = response.data.map(user => user.id)
             dispatch(fetchUsersSuccess(users))
         })
         .catch(error => {
            //error.message is the error descripstion 
            dispatch(fetchUsersFailure(error.message))
         })
    }
}

// step: 4 create a store
const store = createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})

// step: 5 only way to update the state is called store.dispatch()
store.dispatch(fetchUsers())


// axios
//  - Request to an API POINT

//  redux-thunk
//     -define async action creator


