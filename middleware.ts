export { default } from 'next-auth/middleware'

export const config = {
  // Evita que el usuario pueda acceder a las páginas si no hizo login
  matcher: ['/interview-settings', '/interview', '/interview-feedback']
  // Url anidada: '/entrevista/:path*' 
}