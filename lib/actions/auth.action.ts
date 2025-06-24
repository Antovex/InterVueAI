"use server";

import { cookies } from "next/headers";

import { auth, db } from "@/firebase/admin";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 1 week

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection("users").doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists. Please sign in instead.",
            };
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
            // createdAt: new Date().toISOString(),
            // updatedAt: new Date().toISOString()
        });

        return {
            success: true,
            message: "Account created successfully. Please sign in.",
        };
    } catch (error: any) {
        console.error("Error during sign up:", error);

        if (error.code === "auth/email-already-in-use") {
            return {
                success: false,
                message:
                    "Email is already in use. Please try a different email address.",
            };
        }

        return {
            success: false,
            message:
                "An unexpected error occurred during sign up. Please try again later.",
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: "No user found with this email. Please sign up.",
            };
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: "Sign in successful",
        };
    } catch (error: any) {
        console.error("Error during sign in:", error);

        if (error.code === "auth/wrong-password") {
            return {
                success: false,
                message: "Incorrect password. Please try again.",
            };
        }

        if (error.code === "auth/user-not-found") {
            return {
                success: false,
                message: "No user found with this email. Please sign up.",
            };
        }

        return {
            success: false,
            message:
                "An unexpected error occurred during sign in. Please try again later.",
        };
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK,
    });

    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(
            sessionCookie,
            true
        );
        const userRecord = await db
            .collection("users")
            .doc(decodedClaims.uid)
            .get();

        if (!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return user !== null;
}

export async function getInterviewsByUserId(
    userId: string
): Promise<Interview[] | null> {
    const interviews = await db
        .collection("interviews")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}
