import router from "@/router";

const authGuard = (to, from, next) => {
    const isAuthenticated = !!sessionStorage.getItem('token'); //Verifica si hay un token

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' }) // Redirige al login si no está autenticado
      } else {

        if(sessionStorage.getItem('session') === "1"){ //Si esta autenticado evalua si es la primera sesión
            next({name: 'contraseña'})
        }else{
            next() // Permite el acceso
        }

    }
}

export default authGuard;