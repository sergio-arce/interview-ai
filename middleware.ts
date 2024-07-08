export { default } from 'next-auth/middleware'

export const config = {
  // Evita que el usuario pueda acceder a las páginas si no hizo login
  matcher: ['/configurar-entrevista', '/entrevista']
  // Url anidada: '/entrevista/:path*' 
}