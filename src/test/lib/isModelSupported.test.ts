import type { IOSMajorVersion, IPhoneModel } from '@lib/iosTypes';
import { isModelSupported } from '@lib/isModelSupported';
import { describe, expect, it } from 'vitest';

function createMockIPhoneModel(
  name: string,
  maxOS: IOSMajorVersion,
): IPhoneModel {
  return {
    name,
    maxOS,
    screen: { width: 100, height: 200 },
  };
}

describe('isModelSupported', () => {
  it('returns true if model.maxOS is "supported"', () => {
    const model = createMockIPhoneModel('Supported Model', 'supported');
    expect(isModelSupported(model, 17)).toBe(true);
    expect(isModelSupported(model, 10)).toBe(true);
  });

  it('returns true if selectedVersion <= model.maxOS', () => {
    const model = createMockIPhoneModel('Old Model', 15);
    expect(isModelSupported(model, 15)).toBe(true);
    expect(isModelSupported(model, 14)).toBe(true);
  });

  it('returns false if selectedVersion > model.maxOS', () => {
    const model = createMockIPhoneModel('Old Model', 15);
    expect(isModelSupported(model, 16)).toBe(false);
    expect(isModelSupported(model, 18)).toBe(false);
  });
});
