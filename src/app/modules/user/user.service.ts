import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object with partial fields
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string), // Use default password if not provided
    role: 'student', // Set role as 'student'
  };

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // Throw an error if the semester is not found
  if (!admissionSemester) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Generate a student ID based on the semester
    userData.id = await generateStudentId(admissionSemester);

    // Create the user (transaction-1)
    const [newUser] = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    // Assign user ID and reference to the payload
    payload.id = newUser.id;
    payload.user = newUser._id;

    // Create the student record (transaction-2)
    const [newStudent] = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    // Commit the transaction and end the session
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    // Rollback the transaction in case of failure
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create student',
    );
  }
};

export const UserServices = {
  createStudentIntoDB,
};
