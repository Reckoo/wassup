import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Login from "../Components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useRouter } from "next/router";
import { MutatingDots } from  'react-loader-spinner'


function Create() {
  //Checking user
  const { data: session } = useSession();

  //use router
  const router = useRouter();
  //Loading state
    const [loading, setLoading] = useState(false);

  //States for the taking inputs value
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  

  //Base URL FOR API
  const BASE_URL = "https://wasup-app.herokuapp.com";

  //Post function
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    //POST request to add post to the database
    const data = await fetch(`${BASE_URL}/api/create`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        userName: session.user.name,
        postAddress: location || session.user.email,
        postUrl: imgUrl,
        userPhotoUrl: session.user.image,
        postDesc: desc,
        userEmail: session.user.email
      }),
    });
    const res = await data.json();
    //Success 
    if (res.Created) {
      toast.success(res.Created);
      setDesc("");
      setLocation("");
      setImgUrl("");
    }
    //Error
    if (res.err) {
      toast.error(res.err);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen pt-2 font-mono z-10">
      {session ? (
        <form onSubmit={(e) => submitHandler(e)} className={`${loading ? "opacity-[0.3]" : ""} relative`}>
          <div className="bluredBack backdrop-blur-sm bg-white/30 w-[40vw] h-[80vh] flex flex-col items-center mx-auto mt-3 space-y-6 rounded p-5">
            <div className="inputs w-[65vw] h-[80vh] flex flex-col items-center justify-between ">
              <div className="text-center h-[35vh] w-[18vw] flex mb-7">
                <img
                  src={imgUrl}
                  alt=""
                  className="bg-cover rounded shadow-lg"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <textarea
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Caption..."
                  className=" w-[27vw] p-2 rounded outline-none bg-slate-50 border-2 hover:border-blue-500 focus:border-blue-500 duration-300"
                />

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location Name"
                  className="w-[27vw] p-2 rounded outline-none bg-slate-50  border-2 hover:border-blue-500 focus:border-blue-500 duration-300"
                />
                <span className="flex flex-col space-y-2 items-center">
                  <p className="text-lg text-blue-400">Your Image URL:</p>
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="Image URL"
                    className="w-[27vw] p-2 rounded outline-none bg-slate-50  border-2 hover:border-blue-500 focus:border-blue-500 duration-300"
                  />
                </span>
              </div>
            </div>
            {/* Button container*/}
            <div className="btns flex justify-around w-[30vw] p-3">
              <span>
                <button
                  type="submit"
                  className="bg-blue-400 py-1.5 rounded px-6 hover:scale-110 duration-200 text-base hover:text-slate-200"
                >
                  Share
                </button>
              </span>
              <span>
                <button onClick={() => router.push('/')} className="ml-3 bg-red-500 px-6 py-1.5 rounded hover:scale-110 duration-200 text-base hover:text-slate-200">
                  Cancel
                </button>
              </span>
            </div>
          </div>
      
        </form>
      ) : (
        <Login />
      )}
      
          {/* Using React toastify for popups */}
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
            {/* //Loading animation */}
      {loading && (
        <div className="absolute top-[38%] left-[45%]">
          <MutatingDots height="100" width="100" color="red" ariaLabel="loading" />
        </div>
      )}

    </div>
  );
}

export default Create;
