// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs(developer kit) for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//下面将使用四种身份认证
import { getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider } from "firebase/auth"

//下面是操作数据库的一些方法，所有的服务端数据都保存在firestore中
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    Firestore
} from "firebase/firestore"


// Your web app's Firebase configuration
// 调用firebase的相关参数
const firebaseConfig = {
  apiKey: "AIzaSyDgQhUwbipMNAzGT6Ar5hLJO9jLwJmiGh0",
  authDomain: "udemy-clothesshop-db.firebaseapp.com",
  projectId: "udemy-clothesshop-db",
  storageBucket: "udemy-clothesshop-db.appspot.com",
  messagingSenderId: "8300809874",
  appId: "1:8300809874:web:b3010b2e1eec5e4e90e04b"
};

// Initialize Firebase
// 所有的CRUD和身份认证都通过下面这个firebaseApp来实现
const firebaseApp = initializeApp(firebaseConfig);

//用GoogleAuthProvider认证
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
//signInWithGooglePopup()是自定义的方法，它会返回google登录方式的response
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

//数据库db
export const db = getFirestore();

//通过google注册模块获取到的response创建用户document
export const creatUserDocumentFromAuth = async (userAuth) => {
    //将google返回的用户uid记为数据库中用户文档的识别id
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    //从doc中获取uid信息
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());


    //如果uid存在，说明是有效文档
    if(!userSnapshot.exists()){
        const { displayName,email } = userAuth;
        const createdAt = new Date();
        
        try{
            //将文档写入firestore
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log('error creating the user',error.message);
        }
    }

    return userDocRef;
}