import { body } from "express-validator";


export const createEnterpriseSchema = [
    body('social_reason')
      .exists()
      .notEmpty().withMessage('The social_reason must not be empty.')
      .isString().withMessage('The social_reason must be string.'),
    body('address')
      .exists()
      .notEmpty().withMessage('The address must not be empty.')
      .isString().withMessage('The address must be string.'),
    body('password')
      .exists()
      .notEmpty().withMessage('Password must not be empty.')
      .isString().withMessage('The password must be a string and must contain at least one number.')
      .custom((value) => {
        // Validar que la contraseña tenga al menos 8 caracteres
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters long.');
        }
  
        // Validar que la contraseña contenga al menos un número
        if (!/\d/.test(value)) {
          throw new Error('Password must contain at least one number.');
        }
  
        return true;
      }),
    body('email')
      .exists()
      .notEmpty().withMessage('Email should not be empty.')
      .isEmail().withMessage('Must be in email format'),
    body('phone_number')
      .exists()
      .notEmpty().withMessage('Phone_number should not be empty.')
      .isNumeric().withMessage('The phone_number must be number.'),
    body('CUIT')
      .exists()
      .notEmpty().withMessage('The CUIT should not be empty.')
      .isNumeric().withMessage('The CUIT must be number.')
]

export const loginEnterpiseSchema = [
    body('email')
      .exists()
      .notEmpty().withMessage('Email should not be empty.')
      .isEmail().withMessage('Must be in email format'),
    body('password')
      .exists()
      .notEmpty().withMessage('Password must not be empty.')
      .isString().withMessage('The password must be a string and must contain at least one number.')
      .custom((value) => {
        // Validar que la contraseña tenga al menos 8 caracteres
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters long.');
        }
  
        // Validar que la contraseña contenga al menos un número
        if (!/\d/.test(value)) {
          throw new Error('Password must contain at least one number.');
        }
  
        return true;
      })
  ]