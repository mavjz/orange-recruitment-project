import { object, string } from 'yup';

export const resSchema = object({
    gS: string().required(),
    aS: string().required(),
    ahS: string().required(),
    iaS: string().required(),
    nS: string().required(),
    lS: string().required(),
});
