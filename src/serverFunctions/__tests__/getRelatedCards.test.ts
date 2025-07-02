import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('getRelatedCards validation', () => {
  it('should validate required parameters', () => {
    const schema = z.object({
      id: z.number().min(1),
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    });

    expect(() => schema.parse({ id: 1, pageParam: 1, pageSize: 10 })).not.toThrow();
    expect(() => schema.parse({ id: 0, pageParam: 1, pageSize: 10 })).toThrow();
    expect(() => schema.parse({ pageParam: 1, pageSize: 10 })).toThrow();
  });

  it('should apply default values for pagination', () => {
    const schema = z.object({
      id: z.number().min(1),
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    });

    const result = schema.parse({ id: 1 });
    expect(result).toEqual({ id: 1, pageParam: 1, pageSize: 10 });
  });

  it('should validate parameter types', () => {
    const schema = z.object({
      id: z.number().min(1),
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    });

    expect(() => schema.parse({ id: "1", pageParam: 1, pageSize: 10 })).toThrow();
    expect(() => schema.parse({ id: 1, pageParam: "1", pageSize: 10 })).toThrow();
    expect(() => schema.parse({ id: 1, pageParam: 1, pageSize: "10" })).toThrow();
  });
});
