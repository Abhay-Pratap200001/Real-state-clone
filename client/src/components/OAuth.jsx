import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const navigate = useNavigate();          
  const dispatch = useDispatch();           

  // handles Google login
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider(); // google provider
      const auth = getAuth(app);                 // firebase auth instance

      const result = await signInWithPopup(auth, provider); //for opening google popup

      // send user info to backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();  // backend response
      dispatch(signInSuccess(data));  // store user in redux
      navigate("/");                  // redirect to home
      toast.success("User authenticated successfully"); // show success message

    } catch (error) {
      console.log(error); // handle errors
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
