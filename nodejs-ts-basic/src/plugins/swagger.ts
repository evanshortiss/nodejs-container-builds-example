import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { AppOptions } from '../config'

/**
 * Loads the swagger plugin when NODE_ENV is set to "development"
 */
export default fp<AppOptions>(async (fastify, options) => {
  const { NODE_ENV } = options.config
  const routePrefix = '/documentation'
  
  if (NODE_ENV === 'development') {
    fastify.log.warn('loading swagger doc plugins')

    await fastify.register(swagger, {})
    await fastify.register(swaggerUI, { routePrefix })

    fastify.log.warn(`swagger doc plugins loaded. view swagger ui at /${routePrefix}`)
  }
})
