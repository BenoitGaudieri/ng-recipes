export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  //   it's a property where you can write code that will be executed when you call it
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
