import type { OtpRequestedEvent } from '@dewtix/contracts'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class MessagingService {
	public constructor(
		@Inject('NOTIFICATIONS_CLIENT') private readonly client: ClientProxy
	) {}

	async onModuleInit() {
		await this.client.connect()
	}

	public async otpRequested(data: OtpRequestedEvent) {
		return this.client.emit('auth.otp.requested', data)
	}

	public async phoneChanged(data: any) {
		return this.client.emit('account.phone.changed', data)
	}

	public async emailChanged(data: any) {
		return this.client.emit('account.email.changed', data)
	}
}
