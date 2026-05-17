import type { Metadata } from "next";
import ChatInterface from "./ChatInterface";

export const metadata: Metadata = {
  title: "Chat | Jaden's Site",
  description: "A small ChatGPT-style assistant.",
};

export default function ChatPage() {
  return <ChatInterface />;
}
