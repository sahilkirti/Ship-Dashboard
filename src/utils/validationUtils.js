// Common validation rules and error messages
export const validationRules = {
  required: (value) => ({
    isValid: !!value,
    message: 'This field is required'
  }),

  email: (value) => ({
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  }),

  minLength: (min) => (value) => ({
    isValid: value.length >= min,
    message: `Must be at least ${min} characters`
  }),

  maxLength: (max) => (value) => ({
    isValid: value.length <= max,
    message: `Must be at most ${max} characters`
  }),

  pattern: (regex, message) => (value) => ({
    isValid: regex.test(value),
    message
  }),

  date: (value) => ({
    isValid: !isNaN(Date.parse(value)),
    message: 'Please enter a valid date'
  }),

  futureDate: (value) => ({
    isValid: new Date(value) > new Date(),
    message: 'Date must be in the future'
  }),

  number: (value) => ({
    isValid: !isNaN(value) && !isNaN(parseFloat(value)),
    message: 'Please enter a valid number'
  }),

  positiveNumber: (value) => ({
    isValid: !isNaN(value) && parseFloat(value) > 0,
    message: 'Please enter a positive number'
  }),

  imoNumber: (value) => ({
    isValid: /^IMO\d{7}$/.test(value),
    message: 'IMO number must be in format IMO followed by 7 digits'
  }),

  serialNumber: (value) => ({
    isValid: /^[A-Z0-9-]+$/.test(value),
    message: 'Serial number can only contain uppercase letters, numbers, and hyphens'
  })
};

// Validate a single field against multiple rules
export const validateField = (value, rules) => {
  for (const rule of rules) {
    const result = rule(value);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};

// Validate an entire form
export const validateForm = (values, validationSchema) => {
  const errors = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(validationSchema)) {
    const result = validateField(values[field], rules);
    if (!result.isValid) {
      errors[field] = result.message;
      isValid = false;
    }
  }

  return { isValid, errors };
};

// Common validation schemas
export const validationSchemas = {
  login: {
    email: [validationRules.required, validationRules.email],
    password: [validationRules.required, validationRules.minLength(6)]
  },

  ship: {
    name: [validationRules.required, validationRules.minLength(2)],
    imo: [validationRules.required, validationRules.imoNumber],
    flag: [validationRules.required],
    status: [validationRules.required]
  },

  component: {
    name: [validationRules.required, validationRules.minLength(2)],
    serialNumber: [validationRules.required, validationRules.serialNumber],
    installDate: [validationRules.required, validationRules.date],
    lastMaintenanceDate: [validationRules.required, validationRules.date]
  },

  job: {
    type: [validationRules.required],
    priority: [validationRules.required],
    scheduledDate: [validationRules.required, validationRules.date, validationRules.futureDate],
    assignedEngineerId: [validationRules.required]
  }
}; 