export class CreateUserDTO {
  username: string;
  email: string;
  password: string;
  rol: string = 'seller';

  constructor(username: string, email: string, password: string) {
    if (!username || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    this.username = username;
    this.email = email;
    this.password = password;
  }
}