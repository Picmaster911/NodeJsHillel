import { ISignInUserInput } from '../interfaces/sign-in-user.interface';

export class SignInUserInputDto implements ISignInUserInput {
  username: string;
  password: string;
}
