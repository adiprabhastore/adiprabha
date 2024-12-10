"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
        >
            Sign Out
        </button>
    );
}
