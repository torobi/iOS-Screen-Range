import type { IPhoneModel, SelectableIOSMajorVersion } from './iosTypes';

export function isModelSupported(
  model: IPhoneModel,
  selectedVersion: SelectableIOSMajorVersion,
): boolean {
  if (model.maxOS === 'supported') return true;
  return selectedVersion <= model.maxOS;
}
