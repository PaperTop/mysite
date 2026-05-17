"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatResponse = {
  error?: string;
  reply?: string;
};

const starterMessages: ChatMessage[] = [
  {
    content: "Ask me something and I will answer here.",
    id: "welcome",
    role: "assistant",
  },
];

function makeMessage(role: ChatRole, content: string): ChatMessage {
  return {
    content,
    id: `${role}-${Date.now()}-${crypto.randomUUID()}`,
    role,
  };
}

async function readChatResponse(response: Response): Promise<ChatResponse> {
  try {
    return (await response.json()) as ChatResponse;
  } catch {
    return {
      error: "The assistant returned an unreadable response.",
    };
  }
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      behavior: "smooth",
      top: transcriptRef.current.scrollHeight,
    });
  }, [messages, isSending]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = draft.trim();

    if (!content || isSending) {
      return;
    }

    const userMessage = makeMessage("user", content);
    const nextMessages = [...messages, userMessage].filter(
      (message) => message.id !== "welcome",
    );

    setDraft("");
    setError("");
    setIsSending(true);
    setMessages(nextMessages);

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            content: message.content,
            role: message.role,
          })),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await readChatResponse(response);

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "The assistant could not reply.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        makeMessage("assistant", data.reply || ""),
      ]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The assistant could not reply.",
      );
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== userMessage.id),
      );
      setDraft(content);
    } finally {
      setIsSending(false);
    }
  }

  function clearChat() {
    setDraft("");
    setError("");
    setMessages(starterMessages);
  }

  return (
    <main className="min-h-screen bg-yellow-100 p-4 text-zinc-950 sm:p-8">
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-4xl flex-col border-4 border-zinc-950 bg-white shadow-[8px_8px_0_#18181b] sm:min-h-[calc(100vh-4rem)]">
        <header className="border-b-4 border-zinc-950 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-sm font-bold uppercase">
                Jaden&apos;s Site
              </p>
              <h1 className="mt-2 text-4xl font-black sm:text-5xl">Chat</h1>
            </div>
            <Link
              className="inline-flex w-fit border-4 border-zinc-950 bg-cyan-50 px-4 py-2 font-black shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181b] active:translate-x-1 active:translate-y-1 active:shadow-none"
              href="/"
            >
              Home
            </Link>
          </div>
        </header>

        <div
          aria-live="polite"
          className="flex-1 space-y-4 overflow-y-auto bg-zinc-50 p-4 sm:p-6"
          ref={transcriptRef}
        >
          {messages.map((message) => (
            <article
              className={`max-w-[85%] border-4 border-zinc-950 p-4 shadow-[4px_4px_0_#18181b] ${
                message.role === "user"
                  ? "ml-auto bg-lime-200"
                  : "mr-auto bg-white"
              }`}
              key={message.id}
            >
              <p className="mb-2 font-mono text-xs font-bold uppercase">
                {message.role === "user" ? "You" : "Assistant"}
              </p>
              <p className="whitespace-pre-wrap text-base leading-7">
                {message.content}
              </p>
            </article>
          ))}

          {isSending && (
            <article className="mr-auto max-w-[85%] border-4 border-zinc-950 bg-white p-4 shadow-[4px_4px_0_#18181b]">
              <p className="mb-2 font-mono text-xs font-bold uppercase">
                Assistant
              </p>
              <p className="text-base leading-7">Thinking...</p>
            </article>
          )}
        </div>

        <form
          className="border-t-4 border-zinc-950 bg-cyan-50 p-4 sm:p-6"
          onSubmit={sendMessage}
        >
          {error && (
            <p
              className="mb-3 border-4 border-red-950 bg-red-100 p-3 font-bold text-red-950"
              role="alert"
            >
              {error}
            </p>
          )}

          <label className="sr-only" htmlFor="chat-message">
            Message
          </label>
          <textarea
            className="min-h-28 w-full resize-y border-4 border-zinc-950 bg-white p-3 text-base leading-7 outline-none focus:ring-4 focus:ring-lime-300"
            id="chat-message"
            maxLength={4000}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask anything..."
            value={draft}
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs font-bold uppercase">
              {draft.length}/4000
            </p>
            <div className="flex gap-3">
              <button
                className="border-4 border-zinc-950 bg-white px-4 py-2 font-black shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181b] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSending}
                onClick={clearChat}
                type="button"
              >
                Clear
              </button>
              <button
                className="border-4 border-zinc-950 bg-zinc-950 px-5 py-2 font-black text-white shadow-[4px_4px_0_#67e8f9] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#67e8f9] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!draft.trim() || isSending}
                type="submit"
              >
                {isSending ? "Sending" : "Send"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
