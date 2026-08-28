import { type FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const API_URL = import.meta.env.PUBLIC_API_URL?.replace(/\/$/, "") || "";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setStatus("loading");
    setMessage("");

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

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(181,18,43,0.07)] sm:p-7"
    >
      <div className="space-y-2.5">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            required
            disabled={isLoading}
            className="w-full rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="sr-only">
            Your email address
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            required
            disabled={isLoading}
            className="w-full rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="sr-only">
            Your phone number
          </label>

          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="Your phone number"
            autoComplete="tel"
            disabled={isLoading}
            className="w-full rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="sr-only">
            Enter your message
          </label>

          <textarea
            id="contact-message"
            name="message"
            placeholder="Enter your message"
            rows={5}
            required
            disabled={isLoading}
            className="w-full resize-none rounded-lg bg-surface-muted px-4 py-3 text-xs text-foreground outline-none ring-1 ring-transparent transition focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-accent px-5 text-xs font-semibold text-foreground transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Sending..." : "Send your message"}
        </button>

        {message && (
          <p
            className={`text-xs ${
              status === "success" ? "text-success" : "text-danger"
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
