import { IsString, IsNotEmpty, IsIBAN, IsBIC } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
        bankName: string;

    @IsString()
    @IsNotEmpty()
        branch: string;

    @IsIBAN()
    @IsNotEmpty()
        iban: string;

    @IsBIC()
    @IsNotEmpty()
        bic: string;
}
