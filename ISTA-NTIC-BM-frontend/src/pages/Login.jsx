import React, { useEffect, useState } from "react";
import SeConnecter from "../components/SeConnecter";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../sotre/slices/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

export default function Login() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const { user, loading ,role,error} = useSelector((state) => state.authUser);
  const [ErrorMesg, setErrorMsg] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      const Params = new URLSearchParams(location.search);
      const logInToken = Params.get("token");
      const Error_param = Params.get("error");
    console.log(logInToken)
      if (logInToken) {
        localStorage.setItem('auth_token',logInToken)
        dispatch(loginUser({ urlApi: "user" ,token:logInToken}));
      }
      if (logInToken === "failed") {
        setErrorMsg("Échec de l'authentification, veuillez réessayer.");
      }
      if (Error_param === "NotFound") {
        setErrorMsg("Impossible de récupérer l'adresse e-mail depuis Google.");
      }
    
  }, [location.search]);

  useEffect(() => {
    const loadingAnimation = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(loadingAnimation);
  }, []);

 

  // if (isLoading || loading) {
  //   return <Loader />;
  // }

  if (user) {
    role === 'admin' ? navigate("/dashboard/events") : navigate('/');
    return null; 
  }

  return (
    <>
    {(loading || isLoading) && <Loader /> }
      <ErrorAlert message={ErrorMesg} onClose={() => setErrorMsg(null)} />

      <SeConnecter
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
      />

      <div className="hidden p-5 md:flex min-w-56 items-center justify-center">
        <img
          className=" h-auto max-w-4/5"
          src="/login-register-banner.svg"
          alt="login banner"
          loading="eager"
        />
      </div>
    </>
  );
}

