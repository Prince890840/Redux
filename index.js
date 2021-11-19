const redux = require('redux')
const createStore = redux.createStore
const combineReducer = redux.combineReducers


// JavaScript App does not directly update the Redux Store it has to dispatch an action,
// once action has dispatch the reducer can handle that action and update the cureent state 

// Middleware library provides the applyMiddleware function
// Import applyMiddleware
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

console.log('From index.js')

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREME = "BUY_ICE_CREME"

// Action Creator which return Action

function buyCake() {
    return {
        // Action
        type: BUY_CAKE,
        info: 'first action'
    }
}

function buyIceCreme(){
    return{
        // Action
        type: BUY_ICECREME,
        info: 'Second Action'
    }
}



//(prevState,action) = newState
// const initialState = {
//     numofCakes: 10,
//     numofIceCreames: 20
// }

const initialCakeState = {
    numofCakes : 10
}

const initialIceCremeState = {
    numofIceCreames: 20
}

// initial State of an application
// const reducer = (state = initialState,action) => {
//     switch(action.type){
//         case BUY_CAKE: return{
//             ...state,
//             numofCakes: state.numofCakes + 1
//         }

//         case BUY_ICECREME: return{
//             ...state,
//             numofIceCreames: state.numofIceCreames - 1
//         }

//         default: return state
//     }
// }

// initial State of an application
const cakeReducer = (state = initialCakeState,action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numofCakes: state.numofCakes + 1
        }

        default: return state
    }
}

// initial State of an application
const iceCreameReducer = (state = initialIceCremeState,action) => {
    switch(action.type){
        case BUY_ICECREME: return{
            ...state,
            numofIceCreames: state.numofIceCreames - 1
        }

        default: return state
    }
}

const rootReducer = combineReducer({
    cake: cakeReducer,
    iceCreame: iceCreameReducer
})

// redux store holding the application state
const store = createStore(rootReducer,applyMiddleware(logger))

console.log('Initial State',store.getState())
// getState return the current state of an application

const unsubscribe = store.subscribe(() => {})
// allow to subscribe the changes that allow the store using subscribe method

// update the state using dispatch method
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCreme())
store.dispatch(buyIceCreme())
store.dispatch(buyIceCreme())

unsubscribe()

// shopkeeper is reducer