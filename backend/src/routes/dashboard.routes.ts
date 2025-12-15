import { Elysia } from 'elysia';
import { EquiposController } from '../controllers/equipos.controller';
import { authMiddleware } from '../middleware/auth';

const equiposController = new EquiposController();

export const dashboardRoutes = new Elysia({ prefix: '/dashboard' })
    .use(authMiddleware)

    .get('/stats', async () => {
        return await equiposController.getDashboardStats();
    });
