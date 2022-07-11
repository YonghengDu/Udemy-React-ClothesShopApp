// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs(developer kit) for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//下面将使用四种身份认证
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

//下面是操作数据库的一些方法，所有的服务端数据都保存在firestore中
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  //上传数据库方法
  collection,
  writeBatch,
  //从数据库获取方法
  query,
  getDocs
} from "firebase/firestore";

// Your web app's Firebase configuration
// 调用firebase的相关参数
const firebaseConfig = {
  apiKey: "AIzaSyDgQhUwbipMNAzGT6Ar5hLJO9jLwJmiGh0",
  authDomain: "udemy-clothesshop-db.firebaseapp.com",
  projectId: "udemy-clothesshop-db",
  storageBucket: "udemy-clothesshop-db.appspot.com",
  messagingSenderId: "8300809874",
  appId: "1:8300809874:web:b3010b2e1eec5e4e90e04b",
};

// Initialize Firebase
// 所有的CRUD和身份认证都通过下面这个firebaseApp来实现
const firebaseApp = initializeApp(firebaseConfig);

//用GoogleAuthProvider认证
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

//getAuth函数生成用户随机id？
export const auth = getAuth();
//signInWithGooglePopup()是自定义的方法，它会返回google登录方式的response,注意这里的provider是GoogleAuthProvider()提供的
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//用GoogleRedirect的方法登录,它和前者的区别是会跳转到另一个页面通过google登录，所以原页面会丢失临时存储？需要用的useEffect处理数据
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

//firestore数据库db
export const db = getFirestore();

//通过google注册模块获取到的response创建用户document,参数中addtionInformation是专为邮件登录准备
export const createUserDocumentFromAuth = async (userAuth,additionalInfomation) => {
  //将google返回的用户uid记为数据库中用户文档的识别id
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);
  //从doc中获取uid信息
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  //如果uid存在，说明是有效文档
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //将文档写入firestore
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfomation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

//邮件注册方法
export const createAuthUserWithEmailAndPassword = (email,password) => {
    if(!email || !password)return;

    return createUserWithEmailAndPassword(auth,email,password);
}

//邮件登录方法
export const signInAuthUserWithEmailAndPassword = (email,password) => {
  if(!email || !password)return;

  return signInWithEmailAndPassword(auth,email,password);
}

//登出方法
export const signOutUser = () => signOut(auth);


//观察者，每当auth改变时就会调用callback
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

//向文档中添加本地json数据
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd,filed) => {
  //参数filed表示json数据中的具体项，可以是title等等
  const collectionRef = collection(db,collectionKey);
  //
  const batch = writeBatch(db);

  objectsToAdd.forEach(obj => {
    const docRef = doc(collectionRef,obj.title.toLowerCase());
    batch.set(docRef,obj);
  });

  await batch.commit();
  console.log("done");
}

//从db获取json数据用来渲染服务端
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap =  querySnapshot.docs.reduce( (acc,docSnapshot) => {
    const { title,items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
  return categoryMap;
}