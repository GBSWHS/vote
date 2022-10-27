import { CACHE_MANAGER, Inject, Injectable, UseGuards } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { AuthGuard } from 'src/auth.guard'
import { UserService } from 'src/user/user.service'
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class VoteService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly userService: UserService
  ) {}

  async getVotes(): Promise<{ red: string[], blue: string[] }> {
    const red = await this.redis.get('red')
    const blue = await this.redis.get('blue')

    return { 
      red: red ? JSON.parse(red) as string[]: [],
      blue: blue ? JSON.parse(blue) as string[]: []
    }
  }

  async vote(type: number, phone: string): Promise<{ success: boolean, message?: string }> {
    const user = await this.userService.findOneByPhone(phone)
    if (!user) return { success: false, message: '존재하지 않는 사용자입니다.' }

    const key = !type ? 'red' : 'blue'
    const data = await this.redis.get(key)
    const votes = data ? JSON.parse(data) : []

    const validate = await this.getVotes()
    if (validate.red.includes(phone)) return { success: false, message: '이미 빨강팀에 투표하셨습니다.' }
    if (validate.blue.includes(phone)) return { success: false, message: '이미 빨강팀에 투표하셨습니다.' }

    votes.push(phone)
    await this.redis.set(key, JSON.stringify(votes))
    return { success: true, message: '투표가 완료되었습니다.' }
  }

  async reset() {
    await this.redis.set('red', JSON.stringify([]))
    await this.redis.set('blue', JSON.stringify([]))
    return { success: true, message: '초기화가 완료되었습니다.' }
  }
}

