import { FastifyPluginAsync } from "fastify"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', () => 'this is an example')

  fastify.get('/slow', (request, reply) => {
    // Simulate a slow endpoint
    setTimeout(() => {
      reply.send('finally!')
    }, 2000)
  })
}

export default example;
