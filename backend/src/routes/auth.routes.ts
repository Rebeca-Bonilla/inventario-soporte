import { Elysia, t } from 'elysia';

export const authRoutes = new Elysia({ prefix: '/auth' })
    .post('/login',
        async ({ body, set }) => {
            console.log('=== LOGIN ATTEMPT ===');
            console.log('Body recibido en login:', body);

            // TEMPORAL: Siempre devolver éxito para testing
            return {
                success: true,
                data: {
                    token: 'test-token-123',
                    user: {
                        id: 1,
                        username: 'admin',
                        nombre_completo: 'Administrador',
                        rol: 'admin'
                    }
                }
            };
        }
        // Comenta temporalmente la validación:
        // {
        //     body: t.Object({
        //         username: t.String(),
        //         password: t.String()
        //     })
        // }
    )

    // ... otras rutas
