'use client'
import React,{useState,useEffect} from "react";
import { getAuth,RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import { app } from "./config";
import { useRouter } from "next/router";


export default function Login(){
    const [phoneNumber,setPhoneNumber] = useState('');
    const [otp,setOtp] = useState('');
    const[confirmationResult,setConfirmationResult] = useState(null);
    const[otpSent,setOtpSent] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(()=>{
        window.recaptchaVerifier  = new RecaptchaVerifier(auth,"recaptcha-container",{
                 'size':'normal',
                 'callback':(response) =>{
                    console.log("res",response);

                 },
                 'expired-callback':() =>{

                 }

        });
    },[auth]);

    const handlePhoneNumberChange = (e) =>{
        setPhoneNumber(e.target.value);
    }
    const handleOTPChange = (e) =>{
        setOtp(e.target.value);
    }

    const handleSendOtp = async() =>{
        try{
            const formattedPhoneNumber =    `+${phoneNumber.replace(/\D/g,'')}`;
            const confirmation = await signInWithPhoneNumber(auth,formattedPhoneNumber,window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            setPhoneNumber('');
            alert("OTP has been sent");

        }catch(error){
            console.error(error);
        }
    };

    const handleOTPSubmit = async() =>{
        try{
            await confirmationResult.confirm(otp);
            setOtp('');
            router.push('/dashboard');
        } catch(error){
            console.error(error);
        }
    };

    return(
        <>
        <div>
                    <input 
                    style={{width:"120%"}}
                    type = "tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number with country code"
                    className="border border-gray-500 p-2 rounded-md"
                    />
                    {otpSent && 
                    <input
                    type="text"
                    value={otp}
                    onChange={handleOTPChange}
                    placeholder="Enter OTP"
                    className="border border-gray-500 p-2 rounded-md"
                    />
}
                    <button onClick={otpSent?handleOTPSubmit:handleSendOtp}
                    className={`bg-${otpSent?'green':'blue'}-500 text-white p-2 rounded-md m-2`}
                    style={{backgroundColor:otpSent?'green':'blue',margin:"5% 0 0 35%"}}

                    >
                        {otpSent ? "Submit OTP" : "Send Otp"}


                    </button>
                    {!otpSent && (
                <div id = "recaptcha-container">
                    </div>)}



           
        </div>
        </>
    )
}