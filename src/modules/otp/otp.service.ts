import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { createHash } from 'node:crypto'
import { generateCode } from 'patcode'

import { RedisService } from '@/infrastructure/redis/redis.service'

export const OTP_TTL_SECONDS = 300

@Injectable()
export class OtpService {
	public constructor(private readonly redisService: RedisService) {}

	private generateCode() {
		const code = generateCode()
		const hash = createHash('sha256').update(code).digest('hex')

		return { code, hash }
	}

	public async send(identifier: string, type: 'phone' | 'email') {
		const { code, hash } = this.generateCode()

		console.log('Code: ', code)

		await this.redisService.set(
			`otp:${type}:${identifier}`,
			hash,
			'EX',
			OTP_TTL_SECONDS
		)

		return code
	}

	public async verify(
		identifier: string,
		code: string,
		type: 'phone' | 'email'
	) {
		const storedHash = await this.redisService.get(
			`otp:${type}:${identifier}`
		)

		if (!storedHash) throw new RpcException('Invalid or expired code')

		const incomingHash = createHash('sha256').update(code).digest('hex')

		if (storedHash !== incomingHash) {
			throw new RpcException('Invalid or expired code')
		}

		await this.redisService.del(`otp:${type}:${identifier}`)
	}
}
