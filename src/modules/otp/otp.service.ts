import { Injectable } from '@nestjs/common'
import { createHash } from 'node:crypto'

import { RedisService } from '@/infrastructure/redis/redis.service'

@Injectable()
export class OtpService {
	public constructor(private readonly redisService: RedisService) {}

	private generateCode() {
		const code = Math.floor(100000 + Math.random() * 900000)
		const hash = createHash('sha256').update(String(code)).digest('hex')

		return { code, hash }
	}

	public async send(identifier: string, type: 'phone' | 'email') {
		const { code, hash } = this.generateCode()

		console.log('Code: ', code)

		await this.redisService.set(
			`otp:${type}:${identifier}`,
			hash,
			'EX',
			300
		)

		return code
	}
}
