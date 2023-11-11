import { UserRoleEnum } from '../../enum/user-role.enum';

export class UserPayload {
  user_id: string;
  username: string;
  role: UserRoleEnum;
}
