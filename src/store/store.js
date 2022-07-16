import { compose,createStore,applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { myLogger } from './middleware/myLogger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

//ReduxPersist中间件
// 用于保存currentState,可以使用白名单或者黑名单
const persistConfig = {
    key:'root',
    storage,
    whiteList:['cart']
    // blackList:['user']
}
const persistMyReducer = persistReducer(persistConfig,rootReducer);

//logger中间件
// 可以把action前后的状态信息和action信息打印到控制台
// process.env.NODE_ENV变量表示当前环境，development表示是开发环境,production表示产品环境

// thunk中间件
// 可以把action由两个参数的对象转化为一个函数

// saga中间件,取代thunk

const sagaMiddleware = createSagaMiddleware();


// const middleWares = [process.env.NODE_ENV !== 'production' && logger , thunk].filter(Boolean);
// 等价于[ 1===2 && {a:'A'}].filter(ele => Boolean(ele))

const middleWares = [process.env.NODE_ENV !== 'production' && logger , sagaMiddleware].filter(Boolean);



// 要使用chrome扩展的ReduxDevTool
//只有当(环境不是production)&&(window对象存在,即浏览器环境)时,使用ReduxDevTool提供的compose函数，否则使用redux的默认compose
const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistMyReducer,undefined,composedEnhancers)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);