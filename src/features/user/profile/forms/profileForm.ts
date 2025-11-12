import z from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  image: z.string().optional().nullable(),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
