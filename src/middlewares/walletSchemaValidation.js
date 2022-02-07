import walletSchema from "../schemas/walletSchema.js";

export default function walletSchemaValidation(req, res, next) {
  const validation = walletSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}