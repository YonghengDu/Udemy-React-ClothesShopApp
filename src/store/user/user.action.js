import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user) => 
({ type:USER_ACTION_TYPES.SET_CURRENT_USER, payload:user })
    //每次dispat执行都会通过userReducer返回新的state
