import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/nueva-reunion',
      name: 'reunion',
      component: () => import('../views/ReunionView.vue'),
    },
    {
      path: '/nueva-reunion/encargados',
      name: 'encargados',
      component: () => import('../views/EncargadosView.vue'),
    },
    {
      path: '/nueva-reunion/asistencia',
      name: 'asistencia',
      component: () => import('../views/AsistenciaView.vue'),
    },
    {
      path: '/nueva-reunion/minuta',
      name: 'minuta',
      component: () => import('../views/MinutaView.vue'),
    },
    {
      path: '/historial-reuniones',
      name: 'historial',
      component: () => import('../views/HistorialView.vue'),
    },
    {
      path: '/historial-reuniones/detalle',
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
  ],
})

export default router
