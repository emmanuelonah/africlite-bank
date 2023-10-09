import { UserDTOConstructorArg } from './index.types';

export class UserDTO {
    constructor(private readonly _user: UserDTOConstructorArg) {}

    public static fromRequest() {}

    public static fromDb() {}

    public toObject() {
        return {
            id: this._user.id,
            account: this._user.account,
            name: this._user.name,
            email: this._user.email,
            password: this._user.password,
            phone: this._user.phone,
            address: this._user.address,
        };
    }
}
