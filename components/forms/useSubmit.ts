"use client";
import { useState } from "react";

export function useSubmit(type: string) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const submit = async (data: Record<string, unknown>) => {
    setState("sending");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, ...data }) });
      setState(r.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  };
  return { state, submit, reset: () => setState("idle") };
}
