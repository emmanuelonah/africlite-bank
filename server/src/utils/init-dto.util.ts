import { validate } from 'class-validator';

export async function initDto<DTO = ObjectConstructor, ReqBody = {}>(Dto: DTO, reqBody: ReqBody) {
    const dto = Object.assign(new (Dto as ObjectConstructor)(), reqBody);
    const errors = await validate(dto);
    const hasErrors = !!errors.length;
    const error = hasErrors ? errors.join(' ') : '';

    return {
        hasErrors,
        error,
    };
}
