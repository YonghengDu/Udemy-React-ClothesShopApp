import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser:null
}

//@param state 储存了context中所有的数据
//@param action 和useReducer中的dispatch对接
export const userReducer = (state = INITIAL_STATE,action) => {
    //action只有两个部分，type和可选的payload
    //type 根据type决定返回值
    //payload 储存state value
    const { type,payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return{
                ...state,
                currentUser:payload
            }
        //由于所有的reducer都会接收到所有组件的action
        //所以当碰到不是自己的type时，返回初始的state
        default:
            return state
    }
}



