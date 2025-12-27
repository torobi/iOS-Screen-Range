import type { IPhoneModel } from '@lib/iosTypes';
import { getMaxModel } from '@lib/modelUtils';
import { describe, expect, it } from 'vitest';

function createModel(name: string, width: number, height: number): IPhoneModel {
  return {
    name,
    maxOS: 15,
    screen: { width, height },
  };
}

describe('getMaxModel', () => {
  it('returns the model with the maximum width', () => {
    const models = [
      createModel('A', 100, 200),
      createModel('B', 180, 300),
      createModel('C', 120, 150),
    ];
    const maxWidthModel = getMaxModel(models, 'width');
    expect(maxWidthModel.name).toBe('B');
  });

  it('returns the model with the maximum height', () => {
    const models = [
      createModel('A', 100, 200),
      createModel('B', 80, 300),
      createModel('C', 120, 150),
    ];
    const maxHeightModel = getMaxModel(models, 'height');
    expect(maxHeightModel.name).toBe('B');
  });

  it('returns the model with the maximum secondKey as tiebreaker (width)', () => {
    const models = [
      createModel('A', 180, 200),
      createModel('B', 180, 250),
      createModel('C', 100, 100),
    ];
    const maxWidthModel = getMaxModel(models, 'width');
    expect(maxWidthModel.name).toBe('B');
  });

  it('returns the model with the maximum secondKey as tiebreaker (height)', () => {
    const models = [
      createModel('A', 100, 300),
      createModel('B', 80, 300),
      createModel('C', 120, 200),
    ];
    const maxHeightModel = getMaxModel(models, 'height');
    expect(maxHeightModel.name).toBe('A');
  });

  it('returns the only model if array has one', () => {
    const models = [createModel('A', 100, 200)];
    const maxWidthModel = getMaxModel(models, 'width');
    expect(maxWidthModel.name).toBe('A');
  });

  it('returns the first model if all values are the same', () => {
    const models = [
      createModel('A', 100, 200),
      createModel('B', 100, 200),
      createModel('C', 100, 200),
    ];
    const maxWidthModel = getMaxModel(models, 'width');
    expect(maxWidthModel.name).toBe('A');
  });
});
