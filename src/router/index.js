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
      component: () => import('../views/Usuarios/UsuariosView.vue'),
    },
    {
      path: '/usuarios/nuevo',
      name: 'nuevousuario',
      component: () => import('../views/Usuarios/NuevoUsuarioView.vue'),
    },
    {
      path: '/usuarios/editar/:id',
      name: 'editarusuario',
      component: () => import('../views/Usuarios/EditarUsuarioView.vue'),
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
    },
    {
      path: '/nueva-reunion/encargados/:id',
      name: 'encargados',
      component: () => import('../views/Reuniones/EncargadosView.vue'),
    },
    {
      path: '/nueva-reunion/asistencia/:id',
      name: 'asistencia',
      component: () => import('../views/Reuniones/AsistenciaView.vue'),
    },
    {
      path: '/nueva-reunion/minuta/:id',
      name: 'minuta',
      component: () => import('../views/Reuniones/MinutaView.vue'),
    },
    {
      path: '/historial-reuniones',
      name: 'historial',
      component: () => import('../views/Historial/HistorialView.vue'),
    },
    {
      path: '/historial-reuniones/detalle/:id',
      name: 'detalle',
      component: () => import('../views/Historial/DetalleView.vue'),
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('../views/Proyectos/ProyectosView.vue'),
    },
    {
      path: '/proyectos/nuevo',
      name: 'nuevoproyecto',
      component: () => import('../views/Proyectos/NuevoProyectoView.vue'),
    },
    {
      path: '/proyectos/versiones/:id',
      name: 'versiones',
      component: () => import('../views/Versiones/VersionesView.vue')
    },
    {
      path: '/proyectos/versiones/nuevo/:id',
      name: 'nuevaversion',
      component: () => import('../views/Versiones/NuevaVersionView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
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
