/**
 * Formats a given timestamp into a localized date and time string.
 * @param timestamp - The timestamp to format.
 * @param options - Optional configuration options for formatting.
 * @returns The formatted date and time string.
 */
export function formatDateTime(timestamp: Date, options?: Intl.DateTimeFormatOptions) {
    const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'America/New_York',
    
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat('en-US', mergedOptions,).format(new Date(timestamp));
}