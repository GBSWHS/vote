import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class VoteRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsNumber()
  @IsNotEmpty()
  readonly vote: 0 | 1;
}
