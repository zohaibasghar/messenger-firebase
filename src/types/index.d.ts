export interface IUserDTO {
  email: string;
  displayName: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  providerId: string;
  uid: string;
}

export interface UserMetaData {
  creationTime: Date;
  lastSignInTime: Date;
}
