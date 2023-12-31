import { IsString, IsNotEmpty, IsIBAN, IsBIC, IsOptional } from 'class-validator';

export class UpdateAccountDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
        bankName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
        branch: string;

    @IsOptional()
    @IsIBAN()
    @IsNotEmpty()
        iban: string;

    @IsOptional()
    @IsBIC()
    @IsNotEmpty()
        bic: string;
}
