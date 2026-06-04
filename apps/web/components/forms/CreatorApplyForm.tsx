"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { creatorSocialPlatforms } from "@/lib/creator-social-platforms";

export function CreatorApplyForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/creator-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.message || "Submission failed.");
        return;
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Network error.");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-md border border-border-light p-6 text-text-secondary">
        Thank you for applying. Our team will review your profile and reach out if there is a fit.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <FormField label="Name" id="name">
        <input id="name" name="name" required className={inputClass} autoComplete="name" />
      </FormField>
      <FormField label="Email ID" id="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          autoComplete="email"
        />
      </FormField>
      <FormField label="Contact number" id="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className={inputClass}
          autoComplete="tel"
        />
      </FormField>
      <FormField label="Social media" id="socialPlatform">
        <select id="socialPlatform" name="socialPlatform" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Select platform
          </option>
          {creatorSocialPlatforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Social media username" id="socialUsername">
        <input
          id="socialUsername"
          name="socialUsername"
          required
          className={inputClass}
          placeholder="@username or profile handle"
          autoComplete="username"
        />
      </FormField>
      <FormField label="Portfolio link" id="portfolioLink">
        <input
          id="portfolioLink"
          name="portfolioLink"
          type="url"
          className={inputClass}
          placeholder="https:// (optional)"
        />
      </FormField>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Join as Creator"}
      </Button>
    </form>
  );
}
