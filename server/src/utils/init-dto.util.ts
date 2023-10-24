import { validate } from 'class-validator';

import { HttpException } from '../services/http-exception/index.service';

export async function initDto<DTO = ObjectConstructor, ReqBody = {}>(Dto: DTO, reqBody: ReqBody) {
    const dto = Object.assign(new (Dto as ObjectConstructor)(), reqBody);
    const errors = await validate(dto);
    const hasErrors = !!errors.length;
    const error = hasErrors ? errors.join(' ') : '';

    if (hasErrors) throw new HttpException(400, error);
}
