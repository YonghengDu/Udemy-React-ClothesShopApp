import { async } from "@firebase/util";
import { useState,useContext } from "react";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utilities/fire-base/utility-firebase";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";
import Button from "../button/button.component";

import { UserContext } from "../contexts/user.context";

const defaultFormFileds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInForm = () => {
  const [formFileds, setFormFileds] = useState(defaultFormFileds);
  const { email, password } = formFileds;
  
  //有了观察者之后，只要auth变化就会重新渲染，搜易不再需要
  const { setCurrentUser } = useContext(UserContext);

  const resetFormFiled = () => {
    setFormFileds(defaultFormFileds);
  };

  //方式一：googleRedirect登录
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const { user } = response;
  //       const userDocRef = createUserDocumentFromAuth(user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  //方式二：GooglePopup登录
  const signInWithGoogle = async () => {
    //这个respon包含了通过google登录的用户的信息
    const { user } = await signInWithGooglePopup();
    // const response = await signInWithGooglePopup()
    // const { user } = response


    // setCurrentUser(user);有了观察者之后，只要auth变化就会重新渲染，所以不再需要
    // await createUserDocumentFromAuth(user);
  };

  //方式三：邮件登录
  const handleSubmit = async (event) => {
    //preventDefault()阻止事件关联的默认动作，这里阻止了默认提交
    event.preventDefault();

    try {
      //获取到数据后通过useContext上传
      const {user} = await signInAuthUserWithEmailAndPassword(email,password);
      // console.log(response);
      // setCurrentUser(user);有了观察者之后，只要auth变化就会重新渲染，搜易不再需要
    } catch (err) {
      switch(err.code){
        case 'auth/wrong-password':alert('wrong password');break;
        case 'auth/user-not-found':alert('wrong account');break;
        default:console.log(err);
      }
    }
  };

  const handleChange = (event) => {
    //event.target保存了input对象
    const { name, value } = event.target;
    //下面的语法见https://juejin.cn/post/6982840486289473550，扩展运算符的浅克隆
    //es6中括号会将常量name解析为它代表的变量displayName，email等等
    setFormFileds({ ...formFileds, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="text"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="password"
          type="text"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button buttonType="inverted" type='submit'>
            Sign In
          </Button>
          <Button buttonType="google" type='button' onClick={signInWithGoogle}>
            Google sign
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;