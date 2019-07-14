export class AuthUserModel {
  private tokenExpirationDate: Date = null;
  constructor(
    public username: string,
    // tslint:disable-next-line:variable-name
    private _token: string,
    // tslint:disable-next-line:variable-name
    private _refreshToken: string,
    // tslint:disable-next-line:variable-name
    private _expiresIn: number
  ) {
    this.tokenExpirationDate = new Date(+new Date() + (_expiresIn * 1000));
  }

  get refreshToken() {
    return this._refreshToken;
  }

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get expiresIn() {
    const expiresIn = +this.tokenExpirationDate - +new Date();
    if (expiresIn <= 0) {
      return 0;
    } else {
      return expiresIn;
    }
  }
}
