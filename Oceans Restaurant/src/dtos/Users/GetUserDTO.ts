export class GetUserDTO {
    email: string;
    password: string;

    constructor(email: string, password: string) {
         if (!email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    this.email = email;
    this.password = password;
    }
}