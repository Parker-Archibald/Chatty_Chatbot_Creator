"use client";

import { Message } from "@/types/types";
import Avatar from "./avatar";
import { UserCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function Messages({
    messages,
    chatBotName,
}: {
    messages: Message[];
    chatBotName: string | undefined;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const path = usePathname();
    const isReviewPage = path.includes("review-sessions");

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex-1 flex flex-col overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg">
            {messages.map((message) => {
                const isSender = message.sender !== "user";
                return (
                    <div
                        key={message.id}
                        className={`chat ${isSender ? "chat-start" : "chat-end"} relative`}
                    >
                        {/* Uncomment if you want live timestamps */}
                        {isReviewPage && (
                            <p className="absolute -bottom-5 text-xs text-gray-300">
                                sent {new Date(message.created_at).toLocaleString()}
                            </p>
                        )}

                        <div className={`chat-image avatar w-10 ${!isSender && "-mr-4"}`}>
                            {isSender ? (
                                <Avatar
                                    seed={chatBotName}
                                    className="h-12 w-12 bg-white rounded-full border-2 border-[#2991EE]"
                                />
                            ) : (
                                <UserCircle className="text-[#2991EE]" />
                            )}
                        </div>
                        <div
                            className={`chat-bubble text-white ${isSender
                                ? "chat-bubble-primary bg-[#F07896]"
                                : "chat-bubble-secondary bg-gray-200 text-gray-700"
                                }`}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                // className={`break-words`}
                                components={{
                                    ul: ({ ...props }) => (
                                        <ul
                                            {...props}
                                            className="list-disc list-inside ml-5 mb-5"
                                        />
                                    ),
                                    ol: ({ ...props }) => (
                                        <ol
                                            {...props}
                                            className="list-decimal list-inside ml-5 mb-5"
                                        />
                                    ),

                                    h1: ({ ...props }) => (
                                        <h1 {...props} className="text-2xl font-bold mb-5" />
                                    ),
                                    h2: ({ ...props }) => (
                                        <h2 {...props} className="text-xl font-bold mb-5" />
                                    ),
                                    h3: ({ ...props }) => (
                                        <h3 {...props} className="text-lg font-bold mb-5" />
                                    ),
                                    table: ({ ...props }) => (
                                        <table
                                            {...props}
                                            className="table-auto w-full border-separate border-2 rounded-sm border-spacing-4 border-white mb-5"
                                        />
                                    ),
                                    th: ({ ...props }) => (
                                        <th {...props} className="text-left underline" />
                                    ),
                                    p: ({ ...props }) => (
                                        <p
                                            {...props}
                                            className={`whitespace-break-spaces mb-5 ${message.content === "Thinking..." && "animate-pulse"
                                                } ${isSender ? "text-white" : "text-gray-700"}`}
                                        />
                                    ),

                                    a: ({ ...props }) => (
                                        <a
                                            {...props}
                                            target="_blank"
                                            className="font-bold underline hover:text-blue-400"
                                            rel="noopener noreferrer"
                                        />
                                    ),
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                );
            })}

            <div ref={ref} />
        </div>
    );
}

export default Messages;