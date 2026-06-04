"use client";

import { useMemo, useState } from "react";
import { FormField, inputClass, textareaClass } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import {
  HELP_TICKET_TYPES,
  type HelpTicketType,
} from "@/lib/help-ticket-types";

type FieldKey =
  | "company"
  | "campaignName"
  | "phone"
  | "socialHandle"
  | "topic"
  | "audience";

const FIELDS_BY_TYPE: Record<HelpTicketType, FieldKey[]> = {
  "track-campaign": ["company", "campaignName"],
  "product-demo": ["company", "phone"],
  "brand-support": ["company"],
  "creator-support": ["socialHandle"],
  "reporting-analytics": ["company"],
  "payments-commercials": ["audience", "company", "socialHandle", "campaignName"],
  "product-documentation": ["topic"],
};

const REQUIRED_BY_TYPE: Partial<Record<HelpTicketType, FieldKey[]>> = {
  "track-campaign": ["company", "campaignName"],
  "product-demo": ["company"],
  "brand-support": ["company"],
  "creator-support": ["socialHandle"],
  "reporting-analytics": ["company"],
  "payments-commercials": ["audience"],
  "product-documentation": ["topic"],
};

function fieldVisible(type: HelpTicketType, field: FieldKey): boolean {
  return FIELDS_BY_TYPE[type].includes(field);
}

function fieldRequired(type: HelpTicketType, field: FieldKey): boolean {
  return REQUIRED_BY_TYPE[type]?.includes(field) ?? false;
}

export function HelpTicketForm() {
  const [ticketType, setTicketType] = useState<HelpTicketType>("brand-support");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [audience, setAudience] = useState<"brand" | "creator">("brand");

  const selected = useMemo(
    () => HELP_TICKET_TYPES.find((t) => t.value === ticketType),
    [ticketType]
  );

  const showCompany =
    fieldVisible(ticketType, "company") &&
    (ticketType !== "payments-commercials" || audience === "brand");
  const showSocial =
    fieldVisible(ticketType, "socialHandle") &&
    (ticketType !== "payments-commercials" || audience === "creator");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    data.ticketType = ticketType;
    if (ticketType === "payments-commercials") {
      data.audience = audience;
    }
    try {
      const res = await fetch("/api/help-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.message || "Failed to submit. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
      setTicketType("brand-support");
      setAudience("brand");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-text-light/80">
        Your request has been submitted. We will respond shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <FormField label="What do you need help with?" id="ticket-type">
        <select
          id="ticket-type"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value as HelpTicketType)}
          className={inputClass}
          required
        >
          {HELP_TICKET_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FormField>

      {selected && (
        <p className="text-sm text-text-secondary -mt-2">{selected.description}</p>
      )}

      <FormField label="Name" id="help-name">
        <input name="name" id="help-name" required className={inputClass} />
      </FormField>

      <FormField label="Email" id="help-email">
        <input
          name="email"
          id="help-email"
          type="email"
          required
          className={inputClass}
        />
      </FormField>

      {fieldVisible(ticketType, "audience") && (
        <FormField label="I am a" id="help-audience">
          <select
            id="help-audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value as "brand" | "creator")}
            className={inputClass}
            required={fieldRequired(ticketType, "audience")}
          >
            <option value="brand">Brand / agency</option>
            <option value="creator">Creator</option>
          </select>
        </FormField>
      )}

      {showCompany && (
        <FormField label="Company" id="help-company">
          <input
            name="company"
            id="help-company"
            className={inputClass}
            required={fieldRequired(ticketType, "company")}
          />
        </FormField>
      )}

      {showSocial && (
        <FormField label="Social handle" id="help-social">
          <input
            name="socialHandle"
            id="help-social"
            placeholder="@username"
            className={inputClass}
            required={fieldRequired(ticketType, "socialHandle")}
          />
        </FormField>
      )}

      {fieldVisible(ticketType, "campaignName") &&
        (ticketType !== "payments-commercials" || audience === "brand") && (
          <FormField label="Campaign name or ID" id="help-campaign">
            <input
              name="campaignName"
              id="help-campaign"
              className={inputClass}
              required={fieldRequired(ticketType, "campaignName")}
            />
          </FormField>
        )}

      {fieldVisible(ticketType, "phone") && (
        <FormField label="Phone" id="help-phone">
          <input
            name="phone"
            id="help-phone"
            type="tel"
            className={inputClass}
            required={fieldRequired(ticketType, "phone")}
          />
        </FormField>
      )}

      {fieldVisible(ticketType, "topic") && (
        <FormField label="Topic or module" id="help-topic">
          <input
            name="topic"
            id="help-topic"
            placeholder="e.g. Analytics, Discovery, Reporting"
            className={inputClass}
            required={fieldRequired(ticketType, "topic")}
          />
        </FormField>
      )}

      <FormField label="Message" id="help-message">
        <textarea
          name="message"
          id="help-message"
          required
          className={textareaClass}
          rows={5}
        />
      </FormField>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Submit request"}
      </Button>
    </form>
  );
}
