import React, { useState } from "react";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Subscribe to The MayFlair Towncrier 📢
      </h3>
      <p className="mt-3 text-muted">
        Be notified whenever a new community story, climate feature, or
        editorial is released.
      </p>

      {submitted ? (
        <div className="mt-6 rounded-xl bg-primary-soft p-4 text-primary font-medium">
          🎉 Thank you for subscribing to The MayFlair Towncrier!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full rounded-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
