// Registre des cours (en attendant Prisma/Neon). Point d'accès unique au
// contenu des leçons, même esprit que features/exams/demo-data.

import type { Course } from "./types";
import { COURS_SUITES_NUMERIQUES } from "./suites-numeriques";

export const COURSES: Course[] = [COURS_SUITES_NUMERIQUES];

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
