"use client";

import { useState } from "react";
import { FormField, inputClass, textareaClass } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export function JobApplyForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    formData.set("jobSlug", jobSlug);
    try {
      const res = await fetch("/api/apply", { method: "POST", body: formData });
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
      <p className="rounded-md border border-border-light p-6">
        Thank you for applying. Our team will review your application and reach out if there is a fit.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
      <input type="hidden" name="jobSlug" value={jobSlug} />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <p className="text-sm text-text-muted">Applying for: {jobTitle}</p>
      <FormField label="Full name" id="fullName"><input id="fullName" name="fullName" required className={inputClass} /></FormField>
      <FormField label="Email" id="email"><input id="email" name="email" type="email" required className={inputClass} /></FormField>
      <FormField label="Phone" id="phone"><input id="phone" name="phone" required className={inputClass} /></FormField>
      <FormField label="Current city" id="city"><input id="city" name="city" required className={inputClass} /></FormField>
      <FormField label="LinkedIn" id="linkedin"><input id="linkedin" name="linkedin" className={inputClass} /></FormField>
      <FormField label="Portfolio link" id="portfolio"><input id="portfolio" name="portfolio" className={inputClass} /></FormField>
      <FormField label="Current company" id="currentCompany"><input id="currentCompany" name="currentCompany" className={inputClass} /></FormField>
      <FormField label="Years of experience" id="yearsExperience"><input id="yearsExperience" name="yearsExperience" required className={inputClass} /></FormField>
      <FormField label="Current CTC" id="currentCtc"><input id="currentCtc" name="currentCtc" className={inputClass} /></FormField>
      <FormField label="Expected CTC" id="expectedCtc"><input id="expectedCtc" name="expectedCtc" className={inputClass} /></FormField>
      <FormField label="Notice period" id="noticePeriod"><input id="noticePeriod" name="noticePeriod" className={inputClass} /></FormField>
      <FormField label="Why do you want to work at Cloutflow?" id="whyCloutflow">
        <textarea id="whyCloutflow" name="whyCloutflow" required className={textareaClass} />
      </FormField>
      <FormField label="Upload resume (PDF, DOC, DOCX, max 10MB)" id="resume">
        <input id="resume" name="resume" type="file" required accept=".pdf,.doc,.docx" className={inputClass} />
      </FormField>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
}
