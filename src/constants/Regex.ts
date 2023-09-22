// - At least one uppercase letter (A-Z)
// - At least one lowercase letter (a-z)
// - At least one digit (0-9)
// - At least one special character (#?!@$%^&*-)
// - Minimum length of 8 characters
export const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;

// This regex enforces that a valid phone number consists of exactly 10 digits (0-9)
export const phonenumberValidation = /^\d{10}$/;
