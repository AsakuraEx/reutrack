import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authGuard from '@/guards/authGuard'      //Guard definido para validación de rutas

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: ()=>import('../views/PageNotFound.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/401',
      name: 'NoAutenticado',
      component: ()=>import('../views/NoAuthenticated.vue')
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/Usuarios/UsuariosView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/usuarios/nuevo',
      name: 'nuevousuario',
      component: () => import('../views/Usuarios/NuevoUsuarioView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/usuarios/editar/:id',
      name: 'editarusuario',
      component: () => import('../views/Usuarios/EditarUsuarioView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/mi-password',
      name: 'contraseña',
      component: () => import('../views/Usuarios/CambiarContraView.vue'),
    },
    {
      path: '/nueva-reunion',
      name: 'reunion',
      component: () => import('../views/Reuniones/ReunionView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/nueva-reunion/encargados/:id',
      name: 'encargados',
      component: () => import('../views/Reuniones/EncargadosView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/nueva-reunion/asistencia/:id',
      name: 'asistencia',
      component: () => import('../views/Reuniones/AsistenciaView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/nueva-reunion/minuta/:id',
      name: 'minuta',
      component: () => import('../views/Reuniones/MinutaView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/historial-reuniones',
      name: 'historial',
      component: () => import('../views/Historial/HistorialView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/historial-reuniones/detalle/:id',
      name: 'detalle',
      component: () => import('../views/Historial/DetalleView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('../views/Proyectos/ProyectosView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/proyectos/seguimiento/:id',
      name: 'seguimiento-proyectos',
      component: () => import('../views/Proyectos/SeguimientoView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/proyectos/nuevo',
      name: 'nuevoproyecto',
      component: () => import('../views/Proyectos/NuevoProyectoView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/proyectos/versiones/:id',
      name: 'versiones',
      component: () => import('../views/Versiones/VersionesView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/proyectos/versiones/nuevo/:id',
      name: 'nuevaversion',
      component: () => import('../views/Versiones/NuevaVersionView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/invitado/:id',
      name: 'invitado',
      component: () => import('../views/Invitado/InvitadoView.vue'),
    },
    {
      path: '/invitado/exito',
      name: 'agradecimiento',
      component: () => import('../views/Invitado/AgradecimientoView.vue'),
    },
  ],
})

export default router
