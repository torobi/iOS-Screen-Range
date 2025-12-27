import type { IPhoneModel } from '@lib/iosTypes';
import { getMinModel } from '@lib/modelUtils';
import { describe, expect, it } from 'vitest';

function createModel(name: string, width: number, height: number): IPhoneModel {
  return {
    name,
    maxOS: 15,
    screen: { width, height },
  };
}

describe('getMinModel', () => {
  it('returns the model with the minimum width', () => {
    const models = [
      createModel('A', 100, 200),
      createModel('B', 80, 300),
      createModel('C', 120, 150),
    ];
    const minWidthModel = getMinModel(models, 'width');
    expect(minWidthModel.name).toBe('B');
  });

  it('returns the model with the minimum height', () => {
    const models = [
      createModel('A', 100, 200),
      createModel('B', 80, 300),
      createModel('C', 120, 150),
    ];
    const minHeightModel = getMinModel(models, 'height');
    expect(minHeightModel.name).toBe('C');
  });

  it('returns the model with the minimum secondKey as tiebreaker (width)', () => {
    const models = [
      createModel('A', 80, 200),
      createModel('B', 80, 150),
      createModel('C', 100, 100),
    ];
    const minWidthModel = getMinModel(models, 'width');
    expect(minWidthModel.name).toBe('B');
  });

  it('returns the model with the minimum secondKey as tiebreaker (height)', () => {
    const models = [
      createModel('A', 100, 150),
      createModel('B', 80, 150),
      createModel('C', 120, 200),
    ];
    const minHeightModel = getMinModel(models, 'height');
    expect(minHeightModel.name).toBe('B');
  });

  it('returns the only model if array has one', () => {
    const models = [createModel('A', 100, 200)];
    const minWidthModel = getMinModel(models, 'width');
    expect(minWidthModel.name).toBe('A');
  });

  it('returns the first model if all values are the same', () => {
    const models = [
      createModel('A', 100, 200),
      createModel('B', 100, 200),
      createModel('C', 100, 200),
    ];
    const minWidthModel = getMinModel(models, 'width');
    expect(minWidthModel.name).toBe('A');
  });
});
