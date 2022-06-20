import { signInWithGooglePopup,creatUserDocumentFromAuth } from "../../utilities/fire-base/utility-firebase";

const SignIn = () => {
  const logGoogleUser = async () => {
    //这个respon包含了通过google登录的用户的信息
    const { user } = await signInWithGooglePopup()

    // const response = await signInWithGooglePopup()
    // const { user } = response
    const userDocRef = await creatUserDocumentFromAuth(user)
  };
  return (
    <div>
      <div>Sign In Page</div>
      <button onClick={logGoogleUser}>log in with google</button>
    </div>
  );
};
export default SignIn;
