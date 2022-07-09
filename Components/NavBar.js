import Link from "next/link";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { motion } from "framer-motion";

function NavBar() {
  return (
    //Using Framer motion for the animations
    <motion.div
      className="Nav font-mono h-14 flex items-center justify-around sticky top-0 border-b border-b-slate-/10 p-2 bg-white z-20"
      initial={{ opacity: 0.5, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Logo for the app */}
      <div className="logos">
        <Link href={"/"}>
          <h1 className="text-3xl cursor-pointer">Wassup.</h1>
        </Link>
      </div>
      {/* Search Bar */}
      <div className="hidden sm:flex w-[23vw] items-center justify-center">
        <input
          placeholder="Search"
          className="w-full rounded bg-slate-200 p-2 outline-none"
        />
      </div>
      {/* Navigation Links for the app */}
      <div className="links space-x-4 items-center flex">
        <Link href={"/"}>
          <a
            href=""
            className="text-base text-black  px-2 py-1.5 rounded-sm hover:bg-gray-500/70 hover:text-white duration-200"
          >
            Home
          </a>
        </Link>
        <Link href={"/Create"}>
          <AddBoxIcon className="cursor-pointer" />
        </Link>
      </div>
    </motion.div>
  );
}

export default NavBar;
