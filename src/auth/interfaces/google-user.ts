export interface User {
  name: string;
  email: string;
  permissions: string[];
}

export interface GoogleUser extends User {
  sub: string;
  photo: string;
}
