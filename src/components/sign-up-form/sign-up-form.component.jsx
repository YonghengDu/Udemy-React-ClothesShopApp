import { async } from "@firebase/util";
import { useState,useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utilities/fire-base/utility-firebase";
import FormInput from "../form-input/form-input.component"
import "./sign-up-form.style.scss"
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";


const defaultFormFileds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFileds, setFormFileds] = useState(defaultFormFileds);
  const { displayName, email, password, confirmPassword } = formFileds;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFiled = () => {
    setFormFileds(defaultFormFileds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password doesn't match confirmPassword");
      return;
    }

    //如果用户已经存在会返回err.code,auth/email-already-in-use
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
    // setCurrentUser(user);有了观察者之后，只要auth变化就会重新渲染，搜易不再需要

      createUserDocumentFromAuth(user, { displayName });
      resetFormFiled();
      
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("account is already exist");
        return;
      }
      console.log(err);
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
      <h2>Don't have an account?</h2>
      <span>Sign up with your email</span>
      <form onSubmit={() => {}}>
        <FormInput
          label="displayName"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="email"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="password"
          type="text"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="confirmPassword"
          type="text"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType="inverted" onClick={handleSubmit}>Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
