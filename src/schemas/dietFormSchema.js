import { z } from 'zod';

export const dietFormSchema = z.object({
  name: z.string().min(1, "Client name is required").max(100, "Name must be less than 100 characters"),
  age: z.string().min(1, "Age is required").refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num <= 120;
  }, "Age must be a valid number between 1 and 120"),
  sex: z.string().min(1, "Gender is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  bmi: z.string().optional(),
  complications: z.string().optional(),
  goals: z.string().min(1, "Health goals are required").max(500, "Goals must be less than 500 characters"),
  earlyMorning: z.string().min(1, "Early morning meal is required").max(200, "Meal description must be less than 200 characters"),
  midMorning: z.string().optional(),
  breakfast: z.string().min(1, "Breakfast is required").max(200, "Meal description must be less than 200 characters"),
  lunch: z.string().min(1, "Lunch is required").max(200, "Meal description must be less than 200 characters"),
  eveningSnacks: z.string().optional(),
  dinner: z.string().min(1, "Dinner is required").max(200, "Meal description must be less than 200 characters"),
  foodsToAvoid: z.string().optional(),
  notes: z.string().optional().refine((val) => !val || val.length <= 1000, "Notes must be less than 1000 characters"),
});

export const defaultValues = {
  name: "",
  age: "",
  sex: "",
  height: "",
  weight: "",
  bmi: "",
  complications: "",
  goals: "",
  earlyMorning: "",
  midMorning: "",
  breakfast: "",
  lunch: "",
  eveningSnacks: "",
  dinner: "",
  foodsToAvoid: "",
  notes: "",
};