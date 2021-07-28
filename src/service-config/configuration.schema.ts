import * as Joi from 'joi';

const configValidationSchema = Joi.object({
  service: {
    name: Joi.string().required(),
    port: Joi.number().required().default(3001),
    stage: Joi.string().valid('dev', 'qa', 'uat', 'prod').default('dev'),
  },
  database: {
    pg: {
      hostname: Joi.string().required(),
      port: Joi.number().required(),
      database: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
    mssql: {
      hostname: Joi.string().required(),
      port: Joi.number().required(),
      database: Joi.string().required(),
      schema: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  logger: {
    pinoHttp: {
      name: Joi.string().default('RAPID'),
      level: Joi.string()
        .valid('trace', 'debug', 'info', 'warn', 'error', 'fatal')
        .default('info'),
      prettyPrint: Joi.boolean().default(false),
      useLevelLabels: Joi.boolean().default(true),
      redact: Joi.array(),
    },
  },
});
export default configValidationSchema;
