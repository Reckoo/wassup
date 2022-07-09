import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion"
import Link from "next/link";

function PostCard({
  userName,
  Postaddress,
  postUrl,
  userPhotoUrl,
  postDesc,
  id,
  userEmail,
}) {
  
  //Getting user informations
  const { data: session } = useSession();
  
  //Simple logic to render edit buttons on the post only posted by the user 
  const isUsersPost = session.user.email === userEmail;

  return (
    //Using Framer motion for the animations
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    exit={{ opacity: 0 }}
    >
    <div className="w-[85vw] sm:w-[65vw] md:w-[55vw] card bg-white lg:w-[30vw]  h-fit">
      {/* User Informations */}
      <div className="border flex h-20 items-center relative">
        <img src={userPhotoUrl} alt="" className="h-[6vh] ml-3 rounded-full" />
        <span className="ml-2 -mt-1">
          <h2 className="text-sm font-bold">{userName}</h2>
          <p className="text-slate-600 text-sm">{Postaddress}</p>
        </span>
        {/* Rendering the edit button only if the post belongs to the user else only showing the post card(without edit button)*/}
        {isUsersPost && (
             //Navigating to the edit page for the post
             <Link href={`/edit/${id}`}>
            <EditIcon className="absolute right-5 cursor-pointer" />
              </Link>
        )}
      </div>
      {/* Post image URL */}
      <div className="flex h-fit justify-center">
        <img src={postUrl} alt="" className="object-cover" />
      </div>
      {postDesc && (
        <div className="border border-slate-/10 bg-white  min-h-[7vh] flex h-fit items-center p-2">
          <span>
            <h2 className="text-sm font-bold">{userName}</h2>
            {postDesc}
          </span>
        </div>
      )}
    </div>
    </motion.div>
  );
}

export default PostCard;
