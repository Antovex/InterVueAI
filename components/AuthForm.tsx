"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const formSchema = authFormSchema(type);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-in") {
                const { email, password } = values;

                const userCredentials = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const idToken = await userCredentials.user.getIdToken();

                if (!idToken) {
                    toast.error(
                        "Failed to retrieve ID token. Please try again."
                    );
                    return;
                }

                await signIn({
                    email,
                    idToken,
                });

                console.log("Signing in with values:", values);
                toast.success("Signed in successfully!");
                router.push("/");
            } else {
                // Handle sign-up logic
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                console.log("Signing up with values:", values);
                toast.success("Account created successfully! Please Sign-in");
                router.push("/sign-in");
            }
            // Reset form after submission
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(`There was an error submitting the form: ${error}`);
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">InterVueAI</h2>
                </div>
                <h3 className="flex justify-center">
                    Practice Interviews with AI
                </h3>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4 form"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your name"
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <Button type="submit" className="btn">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
