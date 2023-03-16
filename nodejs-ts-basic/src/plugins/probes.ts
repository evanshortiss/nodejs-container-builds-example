import { Type } from '@sinclair/typebox'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { hostname } from 'os'

enum SupportedProbes {
  Startup = 'startup',
  Readiness = 'readiness',
  Liveness = 'liveness'
}

/**
 * Basic readiness and liveness probe implementation for Kubernetes.
 * @param fastify 
*/
const metrics: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  const probes = {
    [SupportedProbes.Startup]: true,
    [SupportedProbes.Liveness]: true,
    [SupportedProbes.Readiness]: true
  }
  
  const schema = {
    params: Type.Object({
      type: Type.Enum(SupportedProbes)
    })
  }

  fastify.get('/probes/:type', {
    schema
  }, (request, reply) => {
    const { type } = request.params

    if (probes[type] === false) {
      reply.internalServerError(`${hostname}: "${type}" probe is failing`)
    } else {
      reply.send(`${hostname()}: ${type} probe is ok`)
    }
  })

  fastify.get('/probes/toggle/:type', {
    schema
  }, (request, reply) => {
    const  { type } = request.params
    const newState = probes[type] = !probes[type]

    return `Application will now ${newState ? 'pass' : 'fail'} ${type} checks!`
  })

}

export default metrics;
