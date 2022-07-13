import { compose,createStore,applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

//middWares包含所有中间件，其中使用logger可以在控制台观测到state在action前后的变化
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer,undefined,composedEnhancers)