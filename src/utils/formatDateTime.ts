/**
 * Formats a UTC timestamp into a localized date and time string.
 * @param timestamp - The UTC timestamp to format.
 * @param options - Optional configuration for the date and time formatting.
 * @returns The formatted date and time string.
 */
export function formatDateTimeFromUTC(
  timestamp: string,
  options?: Intl.DateTimeFormatOptions
) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };
  const mergedOptions = { ...defaultOptions, ...options };

  const utcDate = new Date(`${timestamp}Z`); //? Need to append Z so that the date is treated as UTC by code

  return new Intl.DateTimeFormat('en-US', mergedOptions).format(
    new Date(utcDate)
  );
}
