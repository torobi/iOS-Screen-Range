import type { IPhoneModel, SelectableIOSMajorVersion } from './iosTypes';

export function isModelSupported(
  model: IPhoneModel,
  selectedVersion: SelectableIOSMajorVersion,
): boolean {
  if (model.maxOS === 'supported') return true;
  return selectedVersion <= model.maxOS;
}

export function getMinModel(
  models: IPhoneModel[],
  key: 'width' | 'height',
): IPhoneModel {
  const secondKey = key === 'width' ? 'height' : 'width';
  return models.reduce((min, m) => {
    if (m.screen[key] < min.screen[key]) return m;
    if (m.screen[key] === min.screen[key]) {
      return m.screen[secondKey] < min.screen[secondKey] ? m : min;
    }
    return min;
  }, models[0]);
}

export function getMaxModel(
  models: IPhoneModel[],
  key: 'width' | 'height',
): IPhoneModel {
  const secondKey = key === 'width' ? 'height' : 'width';
  return models.reduce((max, m) => {
    if (m.screen[key] > max.screen[key]) return m;
    if (m.screen[key] === max.screen[key]) {
      return m.screen[secondKey] > max.screen[secondKey] ? m : max;
    }
    return max;
  }, models[0]);
}
