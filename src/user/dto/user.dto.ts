export class UserDTO {
  /**
   * Name is used to display cards on the profile
   * @example "Fulano de Tal"
   */
  name: string;

  /**
   * Email is used to access the application
   * @example teste@teste.com
   */
  email: string;

  /**
   * Password is used to provide more security when accessing the application
   * @example 123sdf.
   */
  password: string;
}
