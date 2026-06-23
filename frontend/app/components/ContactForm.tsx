"use client";

import { useState } from "react";
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
    <form className="contact-form" noValidate onSubmit={submit}>
      <div className="field">
        <label htmlFor="cname">Your name</label>
        <input
          id="cname"
          name="name"
          placeholder="Kris Kringle"
          required
          type="text"
        />
      </div>
      <div className="field">
        <label htmlFor="cemail">Email</label>
        <input
          id="cemail"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
      </div>
      <div className="field full">
        <label htmlFor="cmsg">Your wish list</label>
        <textarea
          id="cmsg"
          name="message"
          placeholder="Tell me what you're building…"
          required
          rows={4}
        />
      </div>
      <button className="btn btn-red full" type="submit">
        🎄 Send it up the chimney
      </button>
      <p className={`form-status${status ? ` ${status.type}` : ""}`} role="status">
        {status?.text}
      </p>
    </form>
  );
}
