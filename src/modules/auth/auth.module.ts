import { Module } from '@nestjs/common'

import { UserRepository } from '@/shared/repositories'

import { OtpService } from '../otp/otp.service'
import { TokenService } from '../token/token.service'
import { UsersModule } from '../users/users.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [UsersModule],
	controllers: [AuthController],
	providers: [AuthService, OtpService, UserRepository, TokenService]
})
export class AuthModule {}
