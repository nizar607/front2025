export interface AgentModel {
  id: string,
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  accesses: [string];
  image?: string;
  createdAt: Date;
}
