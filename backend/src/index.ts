import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import dotenv from 'dotenv';

// Importar rutas
import { authRoutes } from './routes/auth.routes';
import { equiposRoutes } from './routes/equipos.routes';

// Importar configuración DB
import { testConnection } from './config/database';

dotenv.config();

const app = new Elysia()
    // CORS para Vue.js
    .use(cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }))

    // Health check
    .get('/health', async () => {
        const dbConnected = await testConnection();
        return {
            status: 'OK',
            timestamp: new Date().toISOString(),
            database: dbConnected ? 'connected' : 'disconnected',
            environment: process.env.NODE_ENV
        };
    })

    // Rutas públicas
    .use(authRoutes)

    // Rutas protegidas
    .use(equiposRoutes)

    // Error handling
    .onError(({ code, error, set }) => {
        console.error(`[${code}]:`, error);

        if (code === 'NOT_FOUND') {
            set.status = 404;
            return { error: 'Ruta no encontrada' };
        }

        if (code === 'VALIDATION') {
            set.status = 400;
            return { error: error.message };
        }

        set.status = 500;
        return { error: 'Error interno del servidor' };
    });

const port = parseInt(process.env.PORT || '3000');
app.listen(port);

console.log(`🚀 Backend corriendo en: http://localhost:${port}`);
console.log(`🩺 Health check: http://localhost:${port}/health`);
console.log(`🔑 Login: POST http://localhost:${port}/auth/login`);
console.log(`📋 Equipos: GET http://localhost:${port}/equipos`);
