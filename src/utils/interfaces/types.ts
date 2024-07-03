
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
  address: string;
  phoneNumber: string;
}

export interface FormInputs {
  username: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
  address: string;
  phoneNumber: string;
}
