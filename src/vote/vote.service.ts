import { CACHE_MANAGER, Inject, Injectable, UseGuards } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { AuthGuard } from 'src/auth.guard'
import { UserService } from 'src/user/user.service'

@Injectable()
export class VoteService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UserService
  ) {}

  async getVotes(): Promise<{ red: number, blue: number }> {
    const red = await this.cacheManager.get('red')
    const blue = await this.cacheManager.get('blue')

    return { 
      red: red ? JSON.parse(red): [],
      blue: blue ? JSON.parse(blue): []
    }
  }

  async vote(type: number, phone: string): Promise<{ success: boolean, message?: string }> {
    const user = this.userService.findOneByPhone(phone)
    if (!user) return { success: false, message: '존재하지 않는 사용자입니다.' }

    const key = type === 0 ? 'red' : 'blue'
    const data = await this.cacheManager.get(key)
    const votes = data ? JSON.parse(data) : []

    if (votes.filter(v => v === phone).length > 0) return {
      success: false,
      message: '이미 투표하셨습니다.'
    }

    votes.push(phone)
    await this.cacheManager.set(key, JSON.stringify(votes))
    return { success: true, message: '투표가 완료되었습니다.' }
  }

  async reset() {
    await this.cacheManager.reset()
    return { success: true, message: '초기화가 완료되었습니다.' }
  }
}

