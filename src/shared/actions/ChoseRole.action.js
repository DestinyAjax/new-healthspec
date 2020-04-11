import { ROLE } from '../constants/Role.constant';

export const roleChosen = payload => ({
    type: ROLE.CHOSEN,
    payload
});