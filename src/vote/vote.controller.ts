import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { VoteRequestDto } from './dto/VoteRequestDto.dto';
import { VoteService } from './vote.service';

@Controller()
export class VoteController {
  constructor(
    private readonly voteService: VoteService
  ) {}

  @Get('/votes')
  @UseGuards(AuthGuard)
  async getVotes() {
    return await this.voteService.getVotes()
  }

  @Post('/vote')
  async vote(@Body() body: VoteRequestDto) {
    return await this.voteService.vote(body.vote, body.phone)
  }

  @Post('/reset')
  @UseGuards(AuthGuard)
  async reset() {
    return await this.voteService.reset()
  }
}
