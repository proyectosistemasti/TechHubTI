import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define el matcher para las rutas protegidas
const isProtectedRoute = createRouteMatcher(['/dashboard/(.*)']);

// El middleware protegerá solo las rutas que comienzan con /dashboard
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

// Configura el matcher para que abarque todas las rutas
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)'],
};
