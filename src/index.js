import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// create store in index.js
// import applyMiddlewarfe from redux for thunk
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'

// allows our application to have access to reducer
import { Provider } from 'react-redux'

// going to create multiple reducers to manage different actions
// actions for handling project actions; create project, delete project
// for authentication; signup,login 
// then combine into a single root reducer

// npm install redux-thunk 
// redux thunk is a middleware so we need to apply it to our store
import thunk from 'redux-thunk'

// applyMiddleware is a store enhancer, giving extra functionalities
// we can have many enhancers inside createstore(rootReducer, A, B, C...)
// they enhance store with extra functionalities 
// with functionalities, we can return a function inside our action creators then interact with database

import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

// we want to use both getFirestore and getFirebase so we can access the firebase
// or firestore API inside the function in projectAction.js
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    // tells where to connect to
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig)
  )
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
