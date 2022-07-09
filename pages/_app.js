import NavBar from '../Components/NavBar'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Triangle } from  'react-loader-spinner'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
      console.log("Working");
      console.log(process.env.NEXTAUTH_URL);
    useEffect(() => {
      router.events.on('routeChangeStart', () => setLoading(true));
      router.events.on('routeChangeComplete', () => setLoading(false));
    }, [])
    
 

  return (
    <SessionProvider session={session}>
        <div className={`${loading ? 'opacity-[0.4]' : ""}`}>
         <NavBar />
        <Component {...pageProps} />
        {
          loading && (
            <div className="absolute top-[38%] left-[45%]">
            <Triangle height="100" width="100" color="red" ariaLabel="loading" />
          </div>  
          )
        }
    
        </div>

    </SessionProvider>
  )
}

