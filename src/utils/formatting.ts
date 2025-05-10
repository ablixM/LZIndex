/**
 * Utility functions for formatting data
 */

/**
 * Formats a timestamp in seconds to a human-readable MM:SS format
 * @param seconds The time in seconds
 * @returns A string in the format "MM:SS"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
