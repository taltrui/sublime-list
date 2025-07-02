import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('getCards validation', () => {
  it('should validate pagination parameters', () => {
    const schema = z.object({
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    });

    expect(() => schema.parse({ pageParam: 1, pageSize: 10 })).not.toThrow();
    expect(() => schema.parse({ pageParam: 0, pageSize: 10 })).toThrow();
    expect(() => schema.parse({ pageParam: 1, pageSize: 0 })).toThrow();
  });

  it('should apply default values', () => {
    const schema = z.object({
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    });

    const result = schema.parse({});
    expect(result).toEqual({ pageParam: 1, pageSize: 10 });
  });

  it('should validate parameter types', () => {
    const schema = z.object({
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    });

    expect(() => schema.parse({ pageParam: "1", pageSize: 10 })).toThrow();
    expect(() => schema.parse({ pageParam: 1, pageSize: "10" })).toThrow();
  });
});
