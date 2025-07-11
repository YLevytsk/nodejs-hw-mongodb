export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      convert: true, 
    });

    if (error) {
      const messages = error.details.map(e => e.message).join('; ');
      return res.status(400).json({ message: messages });
    }

    next();
  };
};

export default validateBody;



