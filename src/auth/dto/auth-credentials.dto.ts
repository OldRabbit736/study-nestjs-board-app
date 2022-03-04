import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영어, 숫자만 가능하도록
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts alphabets and numbers',
  })
  password: string;
}
