export type ApplicationType = "participant" | "mentor";

export const APPLY_MODAL_EVENT = "open-apply-modal";

/**
 * Dispatch the apply modal open event.
 * Pass type: "mentor" to open the mentor form instead of the participant form.
 */
export function openApplyModal(type: ApplicationType = "participant") {
  window.dispatchEvent(
    new CustomEvent(APPLY_MODAL_EVENT, { detail: { type } })
  );
}

/**
 * Parse the application type from a CustomEvent.
 * Dispatched as: new CustomEvent("open-apply-modal", { detail: { type: "mentor" } })
 * Defaults to "participant" when no detail is provided.
 */
export function parseApplyModalType(event: Event): ApplicationType {
  const detail = (event as CustomEvent<{ type?: string }>).detail;
  if (detail?.type === "mentor") return "mentor";
  return "participant";
}
