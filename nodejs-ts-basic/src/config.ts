import { AutoloadPluginOptions } from '@fastify/autoload';
import { from } from 'env-var'

export type ApplicationEnvironment = 'development'|'production'

export type AppEnvionmentVariables = {
  NODE_ENV: ApplicationEnvironment
}

export type AppOptions = {
  // Place your custom options for app below here.
  config: AppEnvionmentVariables
} & Partial<AutoloadPluginOptions>;

export function getConfig (env: NodeJS.ProcessEnv): AppEnvionmentVariables {
  const { get } = from(env)

  return {
    NODE_ENV: get('NODE_ENV').default('development').asEnum<ApplicationEnvironment>(['development','production'])
  }
}