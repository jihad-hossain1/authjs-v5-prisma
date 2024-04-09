"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";



export const Social = () => {
    const searchParams = useSearchParams();
    const callbackUrl: string | null = searchParams.get("callbackUrl");

    const onClick = (provider: "google" | "github" | 'facebook') => {
        signIn(provider, {
            callbackUrl: callbackUrl || undefined,
        });
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <button

                className="w-full"

                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </button>
            <button

                className="w-full"

                onClick={() => onClick("github")}
            >
                <FaGithub className="h-5 w-5" />
            </button>
            <button

                className="w-full"

                onClick={() => onClick("facebook")}
            >
                <FaFacebook className="h-5 w-5" />
            </button>
        </div>
    );
};
