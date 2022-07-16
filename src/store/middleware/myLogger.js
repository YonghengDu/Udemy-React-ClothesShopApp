//中间件接收到的参数时当前的store
export const myLogger = (store) => (next) => (action) => {
  if (!action.type) {
    next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());
  next(action);//注意next()是异步的，执行完后才会执行下面的代码
  console.log("nextState", store.getState());
};
