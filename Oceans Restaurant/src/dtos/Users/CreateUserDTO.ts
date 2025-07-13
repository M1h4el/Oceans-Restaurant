export class CreateUserDTO {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    this.name = name;
    this.email = email;
    this.password = password;
  }
}