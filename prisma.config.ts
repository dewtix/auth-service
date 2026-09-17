import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

config({ path: '.env.development.local' })

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations'
	},
	datasource: {
		url: process.env['DATABASE_URI']
	}
})
