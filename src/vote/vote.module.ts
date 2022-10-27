import { CacheModule, Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module'
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: 'authpassword'
      }
    }),
    UserModule
  ],
  providers: [VoteService, UserService],
  controllers: [VoteController]
})
export class VoteModule {}
