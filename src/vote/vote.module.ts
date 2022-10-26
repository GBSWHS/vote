import { CacheModule, Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    CacheModule.register(),
    UserModule
  ],
  providers: [VoteService, UserService],
  controllers: [VoteController]
})
export class VoteModule {}
