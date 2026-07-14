import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// /admin est un outil interne, hors i18n public (cf. ARCHITECTURE.md §5 —
// dashboards jamais indexés, jamais préfixés par une locale).
export const config = {
  matcher: "/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)",
};
