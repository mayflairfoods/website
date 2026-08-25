import { type FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      // Connect this to the newsletter API when ready.
      await new Promise((resolve) => setTimeout(resolve, 700));

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-white">You're on the list. Thank you!</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md items-center rounded-full bg-white/10 p-1"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        disabled={status === "loading"}
        className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/50 disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
