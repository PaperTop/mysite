"use client";

import { useState } from "react";
import { buttonRedClass } from "./ui";

const fieldClass = "flex flex-col gap-1.5";
const labelClass = "font-display text-[.92rem] font-semibold";
const inputClass =
  "resize-y rounded-[14px] border-2 border-[#ecdcca] bg-[var(--cream)] px-4 py-[13px] font-body text-base text-[var(--ink)] transition duration-200 focus:border-[var(--red)] focus:bg-[var(--surface)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(209,43,58,.12)] body-[.night]:border-[var(--line)] body-[.night]:bg-[var(--cream-2)]";

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      setStatus({ type: "err", text: "🙈 Fill in every field with a valid email first!" });
      return;
    }

    setStatus({ type: "ok", text: "🎉 Sent up the chimney! Jaden will reply faster than St. Nick. (Demo form — hook up your email!)" });
    form.reset();
  }

  return (
    <form className="mb-6 grid grid-cols-2 gap-4 text-left max-[560px]:grid-cols-1" noValidate onSubmit={submit}>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="cname">Your name</label>
        <input
          className={inputClass}
          id="cname"
          name="name"
          placeholder="Kris Kringle"
          required
          type="text"
        />
      </div>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="cemail">Email</label>
        <input
          className={inputClass}
          id="cemail"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
      </div>
      <div className={`${fieldClass} col-span-full`}>
        <label className={labelClass} htmlFor="cmsg">Your wish list</label>
        <textarea
          className={inputClass}
          id="cmsg"
          name="message"
          placeholder="Tell me what you're building…"
          required
          rows={4}
        />
      </div>
      <button className={`${buttonRedClass} col-span-full w-full`} type="submit">
        🎄 Send it up the chimney
      </button>
      <p
        className={`col-span-full m-0 min-h-[1.2em] text-center font-semibold ${
          status?.type === "ok" ? "text-[var(--pine)]" : ""
        } ${status?.type === "err" ? "text-[var(--red)]" : ""}`}
        role="status"
      >
        {status?.text}
      </p>
    </form>
  );
}
