import z from "zod";

export const ScheduleValidator = z.object({
  fileName: z.string(),
});

export type TScheduleValidator = z.infer<typeof ScheduleValidator>;
