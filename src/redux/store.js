import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers';

const persistConfig = {
    timeout: 1000,
    key: 'root',
    storage,
    //blacklist: ['story', 'flow']
    whitelist: ['page', 'firebase', 'functions','modal', 'nav', 'app']
}
  
const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [thunk];
if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
}

const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(...middlewares)
)

const persistor = persistStore(store)

export { store, persistor }