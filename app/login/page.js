"use client";

import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/db/firebase"; // Ensure you import the Firestore instance
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods

export default function LoginPage() {
    const [error, setError] = useState(null);
    const router = useRouter();
    const { user, loading } = useAuth();

    // Uncomment this effect to handle redirection if user is already logged in
    // useEffect(() => {
    //     if (!loading && user) {
    //         router.push("/"); // Redirect to home or any other page
    //     }
    // }, [user, loading, router]);

    // Uncomment this to show a loading message while checking auth
    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;

            if (user) {
                const userEmail = user.email;
                const userDocRef = doc(db, "user", userEmail);

                // Check if the document exists
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    // If it doesn't exist, create a new document with the user's data
                    await setDoc(userDocRef, {
                        email: userEmail,
                        name: user.displayName,
                        cart: [], // Initialize cart if needed
                        // Add other user fields as necessary
                    });
                }
            }

            // Redirect to the home page after login
            router.push("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md">
                <h1 className="mb-4 text-2xl font-bold">Login</h1>
                <button
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Sign in with Google
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
}
