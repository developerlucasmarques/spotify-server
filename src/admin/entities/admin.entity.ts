export class Admin {
  id?: string;
  name: string;
  cpf: number;
  password: string;
  manager?: boolean;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
