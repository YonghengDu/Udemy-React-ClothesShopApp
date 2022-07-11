import { createContext,useState,useEffect, useReducer } from "react";
import { onAuthStateChangedListener,signOutUser } from "../utilities/fire-base/utility-firebase";
import { createUserDocumentFromAuth } from "../utilities/fire-base/utility-firebase";
export const UserContext = createContext({
     currentUser : null,
     setCurrentUser : () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
}

//@param state 储存了context中所有的数据
//@param action 和useReducer中的dispatch对接
const userReducer = (state,action) => {
    // console.log(`dispatched`);
    // console.log(action);

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
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser:null
}

//UserProvider组件,只是一个嵌套，核心是UserContext
//children中的所有组件都可以使用到value，也就是可以读到currentUser和通过setCurrentUser改变内部值了
// 使用reducer后不再使用UserProvider
export const UserProvider = ( {children} ) => {
    // const [ state,dispatch ] = useReducer(userReducer,INITIAL_STATE);
    // const { currentUser } = state

    //useReducer由state和dispatch两部分组成（dispatch对应action）
    //和useState相比，state可以一次性存储所有state数据
    //dispatch可以通过{type:'string'}中的string来处理数据，类似setState
    const [ { currentUser } , dispatch ] = useReducer(userReducer,INITIAL_STATE);
    // console.log(`currentUser`);
    // console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch({ type:USER_ACTION_TYPES.SET_CURRENT_USER, payload:user })
        //每次dispat执行都会通过userReducer返回新的state
    }

    const value = {currentUser,setCurrentUser};

    useEffect(() => {
        //第一次渲染就会执行
       const unsuscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
        // console.log(user);
       });
       //当UserProvider组件unmount时会执行return
       return unsuscribe;
    },[]);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

    /*
    使用useState和useEffect控制数据
    ------------------------------------------------
    */
    // const [currentUser,setCurrentUser] = useState(null);
    // const value = {currentUser,setCurrentUser};

    // // signOutUser();

    // useEffect(() => {
    //     //第一次渲染就会执行
    //    const unsuscribe = onAuthStateChangedListener((user)=>{
    //     if(user){
    //         createUserDocumentFromAuth(user);
    //     }
    //     setCurrentUser(user);
    //     console.log(user);
    //    });

    //    //当UserProvider组件unmount时会执行return
    //    return unsuscribe;
    // },[]);
    // return <UserContext.Provider value={value}>{children}</UserContext.Provider>
    /*
    ------------------------------------------------
    */
}

