import { PassportOptions } from '@dewtix/passport'
import { ConfigService } from '@nestjs/config'

import type { AllConfigs } from '../interfaces'

export function getPassportConfig(
	configService: ConfigService<AllConfigs>
): PassportOptions {
	return {
		secretKey: configService.get('passport.secretKey', {
			infer: true
		})
	}
}
