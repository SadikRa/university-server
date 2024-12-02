import { z } from "zod";

const userSchema = z.object({
  id: z.string().nonempty("ID is required"), // Validates that `id` is a non-empty string
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .nonempty("Password is required"), // Validates `password` with length constraints
  needPasswordChange: z.boolean().default(false), // Optional field with a default value
  role: z.enum(["admin", "student", "faculty"], {
    errorMap: () => ({ message: "Role must be 'admin', 'student', or 'faculty'" }),
  }), // Ensures `role` is one of the specified values
  status: z.enum(["in-progress", "blocked"], {
    errorMap: () => ({ message: "Status must be 'in-progress' or 'blocked'" }),
  }), // Ensures `status` is one of the specified values
  isDeleted: z.boolean().default(false), // Optional field with a default value
});

// Export the type inferred from the Zod schema (optional)
export type UserValidation = z.infer<typeof userSchema>;