import React from "react";

import { signIn } from "next-auth/react";

      console.log("Hello");
function Login() {
  return (
    <div className="h-screen pt-2 font-mono z-10">
      <div className="bluredBack backdrop-blur-sm bg-white/70 w-[70vw] lg:w-[40vw] h-[80vh] flex flex-col items-center mx-auto mt-3 rounded p-5 border">
        <div className="inputs w-[50vw] h-[50vh] flex flex-col items-center">
          <div className="h-[30vh] w-[50vw] sm:w-[40vw] lg:w-[17vw] flex rounded-md">
            <img
              src="https://i.pinimg.com/originals/b7/41/21/b741215d216b11b8ff17f27f4bff2a9d.gif"
              alt=""
              className="bg-cover rounded-md shadow-lg bg-white/70"
            />
          </div>
        </div>
        {/* Button container*/}
        <div className="btns flex justify-around w-[50vw] p-3">
          <button
            className="ml-3 bg-red-400 hover:bg-red-500 px-6 py-1.5 rounded hover:scale-110 duration-200 text-base hover:text-slate-200"
            onClick={() => signIn()}
          >
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
