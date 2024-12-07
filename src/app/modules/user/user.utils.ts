import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  // Return the last student's ID if found, otherwise undefined
  return lastStudent?.id || undefined;
};

export const generateStudentId = async (payload: TAcademicSemester): Promise<string> => {
  // Initialize the ID to 0000 by default
  let currentId = '0000';

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // Extract semester code (e.g., '01')
  const lastStudentYear = lastStudentId?.substring(0, 4); // Extract year (e.g., '2030')

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  // Check if the last student belongs to the same semester and year
  if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
    currentId = lastStudentId.substring(6); // Extract the numerical portion of the ID
  }

  // Increment the ID and format it with padding
  const incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');

  // Construct the new student ID
  return `${currentYear}${currentSemesterCode}${incrementedId}`;
};
