import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Login from "../../Components/Login";
import { MutatingDots } from  'react-loader-spinner'


function Edit({data, postId}) {
  //Checking user
  const { data: session } = useSession();
  
  //initializing URL
  const BASE_URL = "https://wasup-app.herokuapp.com";


  //States for the taking inputs value
  const [desc, setDesc] = useState(data.postDesc);
  const [location, setLocation] = useState(data.postAddress);
  const [imgUrl, setImgUrl] = useState(data.postUrl);

  //Loading state
  const [loading, setLoading] = useState(false);
  //Function to update the data 
    const updateHandler = async () => {
      setLoading(true);
            const data = await fetch(`${BASE_URL}/api/update/${postId}`, {
                                method: 'PUT',
                                headers:{'content-type': 'application/json'},
                                body: JSON.stringify({
                                  postAddress: location,
                                  postUrl: imgUrl,
                                  postDesc: desc,
                                })
            })
            const res = await data.json();
            if(res.Success){
              toast.success(res.Success);
            }else{
                toast.error(res.err || "Something went wrong.😢");
            }
            setLoading(false);

    }



  //Function to delete the post
  const deleteHandler = async () => {
    setLoading(true);

            const data = await fetch(`${BASE_URL}/api/delete/${postId}`, {
                  method: 'DELETE',
                  headers: {'content-type': 'application/json'}
            })
            const res = await data.json();
            if(res.Success){
              toast.success(res.Success);
            }else{
                toast.error(res.err || "Something went wrong.😢");
            }
            setLoading(false);
  }


  return (
    <div className="h-screen pt-2 font-mono z-10">
      {session ? (
          <div className={`bluredBack backdrop-blur-sm bg-white/30 w-[40vw] h-[80vh] flex flex-col items-center mx-auto mt-3 space-y-6 rounded p-5 relative ${loading ? "opacity-[0.3]" : ""}`}>
            <div className="inputs w-[65vw] h-[80vh] flex flex-col items-center justify-between ">
              <div className="text-center h-[45vh] w-[30vw] flex mb-7 justify-center">
                <img
                  src={imgUrl}
                  alt=""
                  className="object-cover w-fit rounded shadow-lg"
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
                  <p className="text-lg text-blue-400">Image URL:</p>
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
                  onClick={updateHandler}
                  className="bg-blue-400 py-1.5 rounded px-6 hover:scale-110 duration-200 text-base hover:text-slate-200"
                >
                  Update
                </button>
              </span>
              <span>
                <button onClick={deleteHandler} className="ml-3 bg-red-500 px-6 py-1.5 rounded hover:scale-110 duration-200 text-base hover:text-slate-200">
                  Delete
                </button>
              </span>
            </div>
          </div>
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

export default Edit;

export async function getServerSideProps(context){
           //Initializing the post id and API URL
            const BASE_URL = process.env.BACKEND_API;
            const postId = context.params.pid;
          //Fetching the data using the post id to get the details of the post from the database
            const data = await fetch(`${BASE_URL}/api/post/${postId}`);
            const resp = await data.json();
       return {
            props: {
              data: resp,
              postId
            }
       }
}
