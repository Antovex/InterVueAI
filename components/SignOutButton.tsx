"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signOut } from "@/lib/actions/auth.action";

import { Button } from "@/components/ui/button";

interface SignOutButtonProps {
    className?: string;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
}

const SignOutButton = ({
    className,
    variant = "default",
}: SignOutButtonProps) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const result = await signOut();

            if (result.success) {
                toast.success(result.message);
                router.push("/sign-in");
                // Force a refresh to ensure the UI updates properly
                router.refresh();
            } else {
                toast.error("Failed to sign out. Please try again.");
            }
        } catch (error) {
            console.error("Error signing out:", error);
            toast.error("An error occurred while signing out.");
        }
    };

    return (
        <Button className={className} variant={variant} onClick={handleSignOut}>
            Sign Out
        </Button>
    );
};

export default SignOutButton;
