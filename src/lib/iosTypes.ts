export const iOSVersions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26,
] as const;

export type IOSMajorVersion = (typeof iOSVersions)[number] | 'supported';

export interface IPhoneModel {
  name: string;
  maxOS: IOSMajorVersion;
  screen: {
    width: number;
    height: number;
  };
}
