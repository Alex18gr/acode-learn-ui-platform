export class User {
  public userId: number;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;


  constructor(userId?: number, userName?: string, firstName?: string, lastName?: string, email?: string) {
    this.userId = userId || null;
    this.userName = userName || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
  }
}
