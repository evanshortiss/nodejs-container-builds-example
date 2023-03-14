import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { getConfig,  AppOptions } from './config';

// Pass --options via CLI arguments in command to enable these options.
const options: Partial<AppOptions> = {
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!
  const config = getConfig(process.env)

  /**
   * Register a callback to execute on server.close(). The fastify CLI uses the
   * close-with-grace module to capture SIGINT and SIGTERM, and invoke
   * server.close(). 
   * 
   * Closing the server will result in a 503 being returned to new incoming
   * requests. Requests that are currently being processed have a grace period
   * in which to complete.
   * 
   * The 'onClose' callback will be fired after all pending requests have
   * received a response. The process will forcibly exit without waiting for
   * pending requests or onClose hooks if FASTIFY_CLOSE_GRACE_DELAY is exceed
   * after receiving the signal.
   */
  fastify.addHook('onClose', (app, done) => {
    fastify.log.info(`running on close hook with graceful shutdown logic`)

    // Use a timeout to simulate an asynchronous task, e.g closing connections
    setTimeout(() => {
      fastify.log.info(`graceful shutdown logic complete`)
      done()
    }, 500)
  })
  
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {...opts, config: {...config } }
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {...opts, config: {...config } }
  })
};

export default app;
export { app, options }
