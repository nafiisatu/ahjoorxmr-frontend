/**
 * Shapes mirror what a future `/api/circles/:id/comments` endpoint is
 * expected to return, so mock data can be replaced with a real fetch
 * (or a real-time subscription) without touching the components.
 */

export interface Comment {
  id: string;
  circleId: string;
  /** Wallet address (or user id) of the author. */
  author: string;
  /** Optional display name; falls back to a truncated address. */
  displayName?: string;
  body: string;
  createdAt: Date;
  /** Whether this message has been removed by an organizer */
  isRemoved?: boolean;
  /** Who removed this message (if removed) */
  removedBy?: string;
}

/** Max character length enforced by the composer. */
export const COMMENT_MAX_LENGTH = 500;

/** Event emitted when a moderation action occurs */
export interface ModerationEvent {
  type: "message_removed" | "participant_muted";
  targetAddress: string;
  targetMessageId?: string;
  actorAddress: string;
  circleId: string;
  timestamp: Date;
  reason?: string;
}
