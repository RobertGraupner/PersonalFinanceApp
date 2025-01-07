export const AUTH_CONSTANTS = {
  LOGIN_MAX_ATTEMPTS: 5,
  LOGIN_LOCK_TIME: 15 * 60 * 1000, // 15 minutes
  SESSION_MAX_AGE: 8 * 60 * 60, // 8 hours
} as const;

export const AUTH_ERROR_MESSAGES = {
  ACCOUNT_LOCKED: 'Account temporarily locked. Try again in 15 minutes.',
  TOO_MANY_ATTEMPTS: 'Too many failed attempts. Account locked for 15 minutes.',
  INVALID_PASSWORD: 'Invalid password.',
  USER_NOT_FOUND: 'User not found.',
  NO_LOGIN_DATA: 'No login data.',
  USER_ALREADY_EXISTS: 'User with this email already exists.',
} as const;
