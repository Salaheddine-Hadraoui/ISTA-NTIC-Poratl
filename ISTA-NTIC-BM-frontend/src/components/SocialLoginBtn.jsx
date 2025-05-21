import React from "react";

export default function SocialLoginBtn({isRegistering,SocialType}) {
    const redirectToGoogle =() =>{
      window.location.href=`${import.meta.env.VITE_WEB_URL}/auth/${SocialType}/redirect`;
    }
  return (
    <button
    onClick={redirectToGoogle}
     className="flex-grow flex items-center space-x-2 px-4 py-2 rounded-lg border-t-gray-500 shadow-2xl shadow-gray-300 cursor-pointer hover:bg-gray-200">
      <img src={`/${SocialType}-icon.svg`}alt="Google icon" />
      <span className="flex-grow first-letter:capitalize">
        {isRegistering
          ? `Inscrivez-vous avec ${SocialType}`
          : `Se connecter avec ${SocialType}`}
  
      </span>
    </button>
  );
}
