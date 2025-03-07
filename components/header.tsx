import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sidebar } from "lucide-react";
import Avatar from "./avatar";

function Header() {
    return (
        <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
            <Link href="/" className="text-4xl font-thin flex items-center">
                <Avatar seed="Support_agent" />
                <div className="flex flex-col gap-1">
                    <h1>Chatty</h1>
                    <h2 className="text-sm">Your Customisable AI Chat Agent</h2>
                </div>
            </Link>

            <div className="flex items-center ">
                <SignedIn>
                    <UserButton showName />
                </SignedIn>

                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </header>
    );
}

export default Header;
