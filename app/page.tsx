"use client";

import HomeNavBar from "./home/navbar";
import HomeMain from "./home/main";
import HomeFooter from "./home/footer";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Loading from "@/components/general/Loading";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const cookie = getCookie("auth_token");
    if (cookie) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Mark the loading state as false regardless of whether a cookie is found
  }, []);

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading]); // Listen for changes in isAuthenticated and loading states


  return (
    <>
      {loading && <Loading/>}
      {!loading && <AuthProvider isAuthenticated={isAuthenticated}>
        {isAuthenticated && <section className="flex flex-col justify-between">
            <HomeNavBar/>
            <HomeMain/>
            <HomeFooter/>
        </section>}
      </AuthProvider>}
    </>
  )
}
