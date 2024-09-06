/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desactivar React Strict Mode
  reactStrictMode: false,

  // Configuración experimental para evitar renderizados adicionales en desarrollo
  experimental: {
    // Desactiva la recuperación de datos en tiempo de ejecución que puede causar llamadas duplicadas
    runtime: 'nodejs',
  },
};

export default nextConfig;
