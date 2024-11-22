import { z } from "zod";

export const userPreferencesSchema = z.object({
    dateOfBirth: z.string().datetime(),
    isFemale: z.boolean(),
    height: z.number(),
    weight: z.number(),
    q_experiences_1: z.boolean(),
    q_experiences_2: z.boolean(),
    q_experiences_3: z.boolean(),
    q_experiences_4: z.boolean(),
    q_experiences_5: z.boolean(),
    hasAsbestosis: z.boolean(),
    hasAsthma: z.boolean(),
    hasCOPD: z.boolean(),
    hasChronicBronchitis: z.boolean(),
    hasEmphysema: z.boolean(),
    hasPneumonia: z.boolean(),
    hasTuberculosis: z.boolean(),
    hasSilicosis: z.boolean(),
    hasPneumothorax: z.boolean(),
    hasLungCancer: z.boolean(),
    hasBrokenRibs: z.boolean(),
    hasChestInjuriesOrSurgeries: z.boolean(),
    hasUnknownLungProblem: z.boolean(),
    q_symptoms_1: z.boolean(),
    q_symptoms_2: z.boolean(),
    q_symptoms_3: z.boolean(),
    q_symptoms_4: z.boolean(),
    q_symptoms_5: z.boolean(),
    q_symptoms_6: z.boolean(),
    q_symptoms_7: z.boolean(),
    q_symptoms_8: z.boolean(),
    q_symptoms_9: z.boolean()
})

export type UserPreferences = z.infer<typeof userPreferencesSchema>;