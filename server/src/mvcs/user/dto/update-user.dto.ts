import { IsEmail, IsNotEmpty, Min, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
        lastName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        firstName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        dob: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
        email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Min(8)
        password: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        role: string;

    @IsOptional()
    @IsPhoneNumber()
        phone: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        address: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        taxId: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        personalIdType: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        personalIdNo: string;
}
