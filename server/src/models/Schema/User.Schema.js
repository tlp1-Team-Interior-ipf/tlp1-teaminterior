import { body } from "express-validator";


export const createUserSchema = [
    body('name')
      .exists()
      .notEmpty().withMessage('The name must not be empty.')
      .isString().withMessage('The name must be string.'),
    body('surname')
      .exists()
      .notEmpty().withMessage('The surname must not be empty.')
      .isString().withMessage('The surname must be string.'),
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
    body('date_birth')
      .exists()
      .notEmpty().withMessage('date_birth should not be empty.')
      .custom((value) => {

        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
        if (!dateRegex.test(value)) {
          throw new Error('Invalid date_birth format. Use dd/mm/yyyy format.');
        }
    
        return true;
      })
  ]

  export const loginUserSchema = [
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