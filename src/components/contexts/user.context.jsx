import { createContext,useState,useEffect } from "react";
import { onAuthStateChangedListener,signOutUser } from "../../utilities/fire-base/utility-firebase";
import { createUserDocumentFromAuth } from "../../utilities/fire-base/utility-firebase"
export const UserContext = createContext({
     currentUser : null,
     setCurrentUser : () => null,
});

//UserProvider组件,只是一个嵌套，核心是UserContext
//children中的所有组件都可以使用到value，也就是可以读到currentUser和通过setCurrentUser改变内部值了
export const UserProvider = ( {children} ) => {
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};

    // signOutUser();

    useEffect(() => {
        //第一次渲染就会执行
       const unsuscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
        console.log(user);
       });

       //当UserProvider组件unmount时会执行return
       return unsuscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}