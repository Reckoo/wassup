import { signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion"

function SideBar() {
  //Getting user informations
  const { data } = useSession();
  //initializing the user
  const user = data.user;
  return (  
     //Using framer motion for the animations
    // <motion.div 
    // className="hidden md:flex md:flex-col h-20 lg:flex-row lg:right-3 lg:w-[30vw] lg:justify-around lg:items-center justify-center right-2 top-[13vh] fixed bg-white w-[20vw] rounded"
    // initial={{ opacity: 0.5, y: -200}}
    //       animate={{opacity:1, y:0}}
    //       transition={{ delay: 0.5}}
    // >
      <div className="hidden md:flex md:flex-col h-20 lg:flex-row lg:right-3 lg:w-[30vw] lg:justify-around lg:items-center justify-center right-2 top-[13vh] fixed bg-white w-[20vw] rounded">

                {/* Profile Information */}
            <div className='flex items-center'>
    <img layout='fill' src={user.image} alt="" className="h-[6vh] md:ml-3 rounded-full" />
      <span className="md:ml-2 lg:ml-5 -mt-1">
          <h2 className="text-sm font-bold">{user.name}</h2>
          <p className="text-slate-600 text-sm">{user.email}</p>
      </span>
            </div>
                {/* Logout Button */}
            <button className="text-red-600 text-base" onClick={() => signOut()}>Logout</button>
      </div>
// </motion.div>
  )
}

export default SideBar