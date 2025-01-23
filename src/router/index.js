import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: ()=>import('../views/PageNotFound.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuariosView.vue'),
    },
    {
      path: '/usuarios/nuevo',
      name: 'nuevousuario',
      component: () => import('../views/NuevoUsuarioView.vue'),
    },
    {
      path: '/nueva-reunion',
      name: 'reunion',
      component: () => import('../views/ReunionView.vue'),
    },
    {
      path: '/nueva-reunion/encargados/:id',
      name: 'encargados',
      component: () => import('../views/EncargadosView.vue'),
    },
    {
      path: '/nueva-reunion/asistencia/:id',
      name: 'asistencia',
      component: () => import('../views/AsistenciaView.vue'),
    },
    {
      path: '/nueva-reunion/minuta/:id',
      name: 'minuta',
      component: () => import('../views/MinutaView.vue'),
    },
    {
      path: '/historial-reuniones',
      name: 'historial',
      component: () => import('../views/HistorialView.vue'),
    },
    {
      path: '/historial-reuniones/detalle/:id',
      name: 'detalle',
      component: () => import('../views/DetalleView.vue'),
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('../views/ProyectosView.vue'),
    },
    {
      path: '/proyectos/nuevo',
      name: 'nuevoproyecto',
      component: () => import('../views/NuevoProyectoView.vue'),
    },
    {
      path: '/proyectos/versiones/:id',
      name: 'versiones',
      component: () => import('../views/VersionesView.vue')
    },
    {
      path: '/proyectos/versiones/nuevo/:id',
      name: 'nuevaversion',
      component: () => import('../views/NuevaVersionView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/invitado/:id',
      name: 'invitado',
      component: () => import('../views/InvitadoView.vue'),
    },
    {
      path: '/invitado/exito',
      name: 'agradecimiento',
      component: () => import('../views/AgradecimientoView.vue'),
    },
  ],
})

export default router
