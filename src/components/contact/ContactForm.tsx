import { type FormEvent, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL?.replace(/\/$/, "") || "";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks for reaching out. We'll get back to you soon.");
    } catch {
      setStatus("error");
      setMessage(
        "Something went wrong. Please try again or contact us directly.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(181,18,43,0.07)] sm:p-7"
    >
      <div className="space-y-2.5">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          required
          className="w-full rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20"
        />

        <input
          name="email"
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          required
          className="w-full rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Your phone number"
          autoComplete="tel"
          className="w-full rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20"
        />

        <textarea
          name="message"
          placeholder="Enter your message"
          rows={5}
          required
          className="w-full resize-none rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full bg-accent px-5 text-xs font-semibold text-foreground transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send your message"}
      </button>

      {message && (
        <p
          className={`mt-3 text-xs ${
            status === "success" ? "text-success" : "text-danger"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
