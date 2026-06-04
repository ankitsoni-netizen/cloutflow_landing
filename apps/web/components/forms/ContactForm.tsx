"use client";

import { useState } from "react";
import { FormField, inputClass, textareaClass } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

const lookingForOptions = [
  "Influencer campaign",
  "Always-on creator program",
  "Creator discovery",
  "Product demo",
  "Reporting & analytics",
  "Regional campaign",
  "Product launch",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setFieldErrors({});
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.message || "Something went wrong.");
        if (json.errors) setFieldErrors(json.errors);
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-md text-text-primary border border-border-light p-6 rounded-md">
        Thank you for reaching out. Our team will review your requirements and
        connect with you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Full name" id="fullName" error={fieldErrors.fullName}>
          <input id="fullName" name="fullName" required className={inputClass} aria-invalid={!!fieldErrors.fullName} />
        </FormField>
        <FormField label="Work email" id="workEmail" error={fieldErrors.workEmail}>
          <input id="workEmail" name="workEmail" type="email" required className={inputClass} />
        </FormField>
        <FormField label="Phone" id="phone" error={fieldErrors.phone}>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </FormField>
        <FormField label="Company name" id="companyName">
          <input id="companyName" name="companyName" required className={inputClass} />
        </FormField>
        <FormField label="Designation" id="designation">
          <input id="designation" name="designation" required className={inputClass} />
        </FormField>
        <FormField label="Brand / business category" id="brandCategory">
          <input id="brandCategory" name="brandCategory" required className={inputClass} />
        </FormField>
        <FormField label="Monthly influencer-marketing budget" id="monthlyBudget">
          <input id="monthlyBudget" name="monthlyBudget" required className={inputClass} />
        </FormField>
        <FormField label="What are you looking for?" id="lookingFor">
          <select id="lookingFor" name="lookingFor" required className={inputClass}>
            <option value="">Select...</option>
            {lookingForOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Campaign objective" id="campaignObjective">
          <input id="campaignObjective" name="campaignObjective" className={inputClass} />
        </FormField>
        <FormField label="Expected launch timeline" id="expectedTimeline">
          <input id="expectedTimeline" name="expectedTimeline" className={inputClass} />
        </FormField>
      </div>
      <FormField label="Message" id="message">
        <textarea id="message" name="message" className={textareaClass} />
      </FormField>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Send message"}
      </Button>
    </form>
  );
}
