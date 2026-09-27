"use client";

import { useState, useCallback } from "react";
import type { ModerationEvent } from "@/types/discussion";

interface UseCircleModerationOptions {
  circleId: string;
  organizerAddress: string;
  onModerationAction?: (action: ModerationEvent) => void;
}

export function useCircleModeration({
  circleId,
  organizerAddress,
  onModerationAction,
}: UseCircleModerationOptions) {
  const [mutedParticipants, setMutedParticipants] = useState<Set<string>>(new Set());
  const [removedMessageIds, setRemovedMessageIds] = useState<Set<string>>(new Set());

  const isOrganizer = useCallback(
    (address: string) => address.toLowerCase() === organizerAddress.toLowerCase(),
    [organizerAddress]
  );

  const isMuted = useCallback(
    (address: string) => mutedParticipants.has(address.toLowerCase()),
    [mutedParticipants]
  );

  const isMessageRemoved = useCallback(
    (messageId: string) => removedMessageIds.has(messageId),
    [removedMessageIds]
  );

  const removeMessage = useCallback(
    (messageId: string, authorAddress: string, reason?: string) => {
      setRemovedMessageIds((prev) => new Set(prev).add(messageId));
      
      const event: ModerationEvent = {
        type: "message_removed",
        targetAddress: authorAddress,
        targetMessageId: messageId,
        actorAddress: organizerAddress,
        circleId,
        timestamp: new Date(),
        reason,
      };
      
      onModerationAction?.(event);
      return event;
    },
    [circleId, organizerAddress, onModerationAction]
  );

  const muteParticipant = useCallback(
    (address: string, reason?: string) => {
      setMutedParticipants((prev) => new Set(prev).add(address.toLowerCase()));
      
      const event: ModerationEvent = {
        type: "participant_muted",
        targetAddress: address,
        actorAddress: organizerAddress,
        circleId,
        timestamp: new Date(),
        reason,
      };
      
      onModerationAction?.(event);
      return event;
    },
    [circleId, organizerAddress, onModerationAction]
  );

  const unmuteParticipant = useCallback((address: string) => {
    setMutedParticipants((prev) => {
      const next = new Set(prev);
      next.delete(address.toLowerCase());
      return next;
    });
  }, []);

  return {
    isOrganizer,
    isMuted,
    isMessageRemoved,
    removeMessage,
    muteParticipant,
    unmuteParticipant,
    mutedParticipants: Array.from(mutedParticipants),
    removedMessageIds: Array.from(removedMessageIds),
  };
}