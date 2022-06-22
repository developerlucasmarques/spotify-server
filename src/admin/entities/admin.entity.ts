export class Admin {
  id?: string;
  name: string;
  cpf: string;
  password: string;
  manager?: boolean;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
