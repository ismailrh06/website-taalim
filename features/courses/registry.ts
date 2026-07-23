// Registre des cours (en attendant Prisma/Neon). Point d'accès unique au
// contenu des leçons, même esprit que features/exams/demo-data.

import type { Course } from "./types";
import { COURS_SUITES_NUMERIQUES } from "./suites-numeriques";
import { COURS_LIMITES_CONTINUITE_SM } from "./sm2-limites-continuite";
import { COURS_DERIVATION_SM } from "./sm2-derivation";
import { COURS_LOGARITHME_SM } from "./sm2-logarithme";
import { COURS_EXPONENTIELLE_SM } from "./sm2-exponentielle";
import { PROVISIONAL_COURSES } from "./provisional-courses";

export const COURSES: Course[] = [
  COURS_LIMITES_CONTINUITE_SM,
  COURS_DERIVATION_SM,
  COURS_SUITES_NUMERIQUES,
  COURS_LOGARITHME_SM,
  COURS_EXPONENTIELLE_SM,
  ...PROVISIONAL_COURSES,
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function filterCourses(filters: {
  levelId?: string;
  subjectId?: string;
}): Course[] {
  return COURSES.filter(
    (c) =>
      (!filters.levelId || c.levelId === filters.levelId) &&
      (!filters.subjectId || c.subjectId === filters.subjectId),
  );
}

export function getCoursesForExercise(exerciseId: string): Course[] {
  return COURSES.filter((c) => c.relatedExerciseIds?.includes(exerciseId));
}

export type { Course } from "./types";
