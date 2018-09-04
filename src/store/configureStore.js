import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import positionsFilterReducer from '../reducers/filters/positions';
import positionReducer from '../reducers/position';
import positionsReducer from '../reducers/positions';
import userReducer from '../reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            filters: combineReducers({
                positions: positionsFilterReducer,
            }),
            position: positionReducer,
            positions: positionsReducer,
            user: userReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
