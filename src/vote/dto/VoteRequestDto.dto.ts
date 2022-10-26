import { IsString, IsNotEmpty } from "class-validator";

export class VoteRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly vote: 0 | 1;
}
