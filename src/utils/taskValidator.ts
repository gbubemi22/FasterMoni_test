const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  action: Joi.string().required(),
  assigneeId: Joi.number().optional(),
  collaboratorId: Joi.number().optional(),
  contact: Joi.array().items(Joi.string()).optional(),
  description: Joi.string(),
  start_date: Joi.date().required(),
  due_date: Joi.date().required(),
  due_time: Joi.string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  closing_date: Joi.date().required(),
  closing_time: Joi.string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  agentId: Joi.number().required(),
});

export default createTaskSchema;

// TODO:
