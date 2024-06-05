import { formatDateTimeFromUTC } from '../../src/utils/formatDateTime';
import { describe, expect, it } from 'vitest';

describe('formatDateTime', () => {
  it('should format the timestamp with custom options', () => {
    const timestamp = '2022-01-01T12:34:56';
    const options = { timeZone: 'America/New_York', hour12: true };
    const formattedDateTime = formatDateTimeFromUTC(timestamp, options);

    expect(formattedDateTime).toBe('January 1, 2022 at 7:34:56 AM EST');
  });

  it('should format the timestamp with no options', () => {
    const timestamp = '2022-01-01T12:34:56';
    const options = {};
    const formattedDateTime = formatDateTimeFromUTC(timestamp, options);

    expect(formattedDateTime).toBe('January 1, 2022 at 12:34:56 PM GMT');
  });

  it('should return an empty string if no timestamp is provided', () => {
    const timestamp = '';
    const formattedDateTime = formatDateTimeFromUTC(timestamp);

    expect(formattedDateTime).toBe('');
  });

  it('should throw an error for invalid timestamp format', () => {
    const timestamp = 'invalid-timestamp';
    
    expect(() => formatDateTimeFromUTC(timestamp)).toThrow('Invalid timestamp format');
  });
});
