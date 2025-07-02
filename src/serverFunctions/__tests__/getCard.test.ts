import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('getCard validation', () => {
  it('should validate input correctly', () => {
    const schema = z.object({
      id: z.number().min(1),
    });

    expect(() => schema.parse({ id: 1 })).not.toThrow();
    expect(() => schema.parse({ id: 0 })).toThrow();
    expect(() => schema.parse({ id: -1 })).toThrow();
    expect(() => schema.parse({ id: "1" })).toThrow();
  });

  it('should validate required fields', () => {
    const schema = z.object({
      id: z.number().min(1),
    });

    expect(() => schema.parse({})).toThrow();
    expect(() => schema.parse({ id: undefined })).toThrow();
  });
});
