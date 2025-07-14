import db from "../services/database.service";
import bcrypt from "bcrypt";
import { User, RegisterUserDto } from "../interfaces/user.interface";

class UserModel {
  private readonly SALT_ROUNDS = 10;

  async createUser(userData: RegisterUserDto): Promise<User> {
    const connection = await db.getConnection();
    let userId: number | null = null;

    try {
      await connection.beginTransaction();

      // 1. Verificar si el usuario ya existe (dentro de la transacción)
      const [existing] = await connection.query(
        "SELECT id FROM usersRES WHERE email = ? LIMIT 1",
        [userData.email]
      );

      if (Array.isArray(existing) && existing.length > 0) {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }

      // 2. Hash de la contraseña
      const hashedPassword = await bcrypt.hash(
        userData.password,
        this.SALT_ROUNDS
      );

      // 3. Insertar usuario
      const [result] = await connection.query(
        `INSERT INTO usersRES (user_name, email, password_hash, rol, active) 
             VALUES (?, ?, ?, ?, ?)`,
        [
          userData.username,
          userData.email,
          hashedPassword,
          userData.rol || "user",
          1,
        ]
      );

      userId = (result as any).insertId;

      // 4. Verificación crítica del ID
      if (!userId) {
        throw new Error("INSERT_FAILED");
      }

      // 5. Obtener usuario recién creado
      const [users] = await connection.query(
        "SELECT id, user_name, email, rol, active FROM usersRES WHERE id = ? LIMIT 1",
        [userId]
      );

      if (!Array.isArray(users) || users.length === 0) {
        throw new Error("USER_RETRIEVAL_FAILED");
      }

      await connection.commit();
      return users[0] as User;
    } catch (error) {
      await connection.rollback();

      // Manejo específico de errores conocidos
      if (error instanceof Error) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
          throw new Error("El email ya está registrado");
        }
        console.error("Error en createUser:", {
          message: error.message,
          userId,
          query: userData.email,
        });
      }

      throw new Error("Error al crear usuario");
    } finally {
      connection.release();
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const [rows] = await db.query(
        "SELECT id, user_name, email, rol, active FROM usersRES WHERE id = ? LIMIT 1",
        [id]
      );

      // Verificación mejorada del resultado
      if (!Array.isArray(rows)) {
        console.error("Resultado inesperado de getUserById:", rows);
        return null;
      }

      return (rows[0] as User) || null;
    } catch (error) {
      console.error("Error en getUserById:", error);
      return null;
    }
  }

  async getUserByEmail(
    email: string
  ): Promise<(User & { password_hash: string }) | null> {
    try {
      const [rows] = await db.query(
        "SELECT * FROM usersRES WHERE email = ? LIMIT 1",
        [email]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      return rows[0] as User & { password_hash: string };
    } catch (error) {
      console.error("Error en getUserByEmail:", error);
      throw error;
    }
  }

  async updateUserStatus(id: number, active: 0 | 1): Promise<boolean> {
    const [result] = await db.query(
      "UPDATE usersRES SET active = ? WHERE id = ?",
      [active, id]
    );

    return (result as any).affectedRows > 0;
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user) return false;

    return bcrypt.compare(password, user.password_hash);
  }

  async updateUserRol(id: number, rol: string): Promise<boolean> {
    const [result] = await db.query(
      "UPDATE usersRES SET rol = ? WHERE id = ?",
      [rol, id]
    );

    return (result as any).affectedRows > 0;
  }
}

export default new UserModel();
