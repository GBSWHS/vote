import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser'
import User from 'src/interface/User';
import * as fs from 'fs'

@Injectable()
export class UserService {
  public async findOneByPhone(phone: string): Promise<void | User> {
    const results: User[] = []

    return new Promise((resolve, reject) => {
      fs.createReadStream('src/data/users.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log(results.filter(user => user.phone === phone))
          resolve(results.filter(user => user.phone === phone)[0])
        })
    })
  }
}
