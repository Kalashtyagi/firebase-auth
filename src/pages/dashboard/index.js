import React from "react";
import { getAuth,signOut } from "firebase/auth";
import { app } from "@/config";
import { useRouter } from "next/router";

export default function dashboard(){
    const auth = getAuth(app);
    const router = useRouter();

    const handleLogout = async()=>{
        try{
            await signOut(auth);
            router.push('/');
        }catch(error){
            console.error(error);
        }
    }
    return(
        <>
        <main className="flex min-h-screen flex-col items-center p-12">
    <h1 className="text-4xl font-bold mb-10">Welcome to the dashboard</h1>
    <button onClick={handleLogout}
    className="bg-red-500 text-white p-2 rounded-sm">
        Logout
    </button>
  </main>
        </>
    )
}