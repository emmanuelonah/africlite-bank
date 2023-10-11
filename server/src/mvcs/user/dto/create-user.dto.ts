import { IsEmail, IsNotEmpty, Min, IsString, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
        lastName: string;

    @IsString()
    @IsNotEmpty()
        firstName: string;

    @IsString()
    @IsNotEmpty()
        dob: string;

    @IsEmail()
    @IsNotEmpty()
        email: string;

    @IsString()
    @IsNotEmpty()
    @Min(8)
        password: string;

    @IsPhoneNumber()
        phone: string;

    @IsString()
    @IsNotEmpty()
        address: string;

    @IsString()
    @IsNotEmpty()
        taxId: string;

    @IsString()
    @IsNotEmpty()
        personalIdType: string;

    @IsString()
    @IsNotEmpty()
        personalIdNo: string;
}
