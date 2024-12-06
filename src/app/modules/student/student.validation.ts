import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name must have at least one character' })
    .max(20, { message: 'First Name must not exceed 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherOccupation: z.string().min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z.string().min(1, { message: 'Father Contact Number is required' }),
  motherName: z.string().min(1, { message: 'Mother Name is required' }),
  motherOccupation: z.string().min(1, { message: 'Mother Occupation is required' }),
  motherContactNo: z.string().min(1, { message: 'Mother Contact Number is required' }),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  contactNo: z.string().min(1, { message: 'Contact Number is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, { message: 'Password must not exceed 20 characters' }),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        message: 'Gender must be male, female, or other',
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Must be a valid email address' }),
      contactNo: z.string().min(1, { message: 'Contact Number is required' }),
      emergencyContactNo: z.string().min(1, { message: 'Emergency Contact Number is required' }),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        message: 'Blood Group must be a valid type',
      }),
      presentAddress: z.string().min(1, { message: 'Present Address is required' }),
      permanentAddress: z.string().min(1, { message: 'Permanent Address is required' }),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string().min(1, { message: 'Admission Semester is required' }),
      profileImg: z.string().min(1, { message: 'Profile Image is required' }),
      academicDepartment: z.string().min(1, { message: 'Academic Department is required' }),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name must have at least one character' })
    .max(20, { message: 'First Name must not exceed 20 characters' })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other'], {
          message: 'Gender must be male, female, or other',
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Must be a valid email address' }).optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          message: 'Blood Group must be a valid type',
        })
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
