export interface Creator {
  id: string;
  fullname: string;
  username: string;
  gender: boolean;
  address: string;
  phone: string;
  email: string;
  role: string;
}

export interface Test {
  id: number;
  title: string;
  description: string;
  passcode: string;
  creator: Creator;
  startTime: Date;
  duration: number;
}

