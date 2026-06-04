"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  JOB_AREAS_OF_INTEREST,
  JOB_DEPARTMENTS,
  JOB_EXPERIENCE_LEVELS,
  JOB_LOCATIONS,
  matchesAreaOfInterest,
  matchesDepartment,
  matchesExperience,
  matchesLocation,
} from "@/lib/job-filters";
import type { Job } from "@/lib/types";

const selectClass =
  "h-11 px-3 border border-white/20 bg-white/5 text-text-light text-sm rounded-md focus:outline-none focus:border-primary w-full";

/** Careers page display only: no em/en dashes in role copy. */
function careersDisplayText(text: string): string {
  return text.replace(/\u2013|\u2014/g, " to ");
}

function jobMatchesSearch(job: Job, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    job.title,
    job.department,
    job.location,
    job.workType,
    job.experience,
    job.experienceLevel,
    job.areaOfInterest,
    job.shortDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-nav text-text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function OpenRolesList({ jobs }: { jobs: Job[] }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      if (department && !matchesDepartment(job.department, department)) return false;
      if (experience && !matchesExperience(job, experience)) return false;
      if (location && !matchesLocation(job.location, location)) return false;
      if (areaOfInterest && !matchesAreaOfInterest(job, areaOfInterest)) return false;
      if (!jobMatchesSearch(job, search)) return false;
      return true;
    });
  }, [jobs, department, experience, location, areaOfInterest, search]);

  const hasFilters =
    Boolean(department || experience || location || areaOfInterest || search);

  return (
    <>
      <div className="flex flex-col gap-5 mb-6">
        <input
          type="search"
          placeholder="Search by role, team, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full max-w-xl px-4 border border-white/20 bg-white/5 text-text-light placeholder:text-text-muted rounded-md focus:outline-none focus:border-primary"
          aria-label="Search open roles"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterSelect
            label="Department"
            value={department}
            onChange={setDepartment}
            options={JOB_DEPARTMENTS}
            placeholder="All departments"
          />
          <FilterSelect
            label="Experience"
            value={experience}
            onChange={setExperience}
            options={JOB_EXPERIENCE_LEVELS}
            placeholder="All experience"
          />
          <FilterSelect
            label="Location"
            value={location}
            onChange={setLocation}
            options={JOB_LOCATIONS}
            placeholder="All locations"
          />
          <FilterSelect
            label="Area of interest"
            value={areaOfInterest}
            onChange={setAreaOfInterest}
            options={JOB_AREAS_OF_INTEREST}
            placeholder="All areas"
          />
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setDepartment("");
              setExperience("");
              setLocation("");
              setAreaOfInterest("");
            }}
            className="text-xs uppercase tracking-nav text-primary w-fit hover:opacity-80"
          >
            Clear all filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((job) => (
            <div
              key={job.slug}
              className="careers-reactive-card border border-white/10 p-6 rounded-md bg-background-dark"
            >
              <h3 className="font-medium text-lg mb-1">{careersDisplayText(job.title)}</h3>
              <p className="text-xs uppercase tracking-nav text-text-muted mb-3">
                {careersDisplayText(job.department)} · {careersDisplayText(job.location)} ·{" "}
                {careersDisplayText(job.workType)}
              </p>
              {job.areaOfInterest && (
                <p className="text-xs text-text-light/50 mb-3">
                  {careersDisplayText(job.areaOfInterest)}
                </p>
              )}
              <p className="text-sm text-text-light/70 mb-4">
                {careersDisplayText(job.shortDescription)}
              </p>
              <p className="text-xs text-text-muted mb-4">
                {careersDisplayText(job.experience)}
              </p>
              <Link
                href={`/careers/${job.slug}`}
                className="text-sm uppercase tracking-nav text-primary"
              >
                View Role →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-text-muted">
          No roles match your filters. Try adjusting your search or selections, or check
          back soon.
        </p>
      )}
    </>
  );
}
