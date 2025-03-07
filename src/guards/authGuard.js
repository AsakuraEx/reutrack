const authGuard = (to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); //Verifica si hay un token

    if(to.name === 'login'){
        if(isAuthenticated){                                   //Si esta autenticado redirecciona a home
            next({name: 'home'})
        }else {
            next()
        }
    }

    if(to.name === 'home'){                                     //Evalua si la ruta actual es "home"
        if(!isAuthenticated){                                   //Si no esta autenticado, redirecciona a login
            next({name: 'login'})
        }else {
            next()
        }
    }

    if (to.meta.requiresAuth && !isAuthenticated) {     //Evalua si no esta autenticado y la ruta requiere autenticacion
        next({ name: 'NoAutenticado' }) // Redirige al login si no está autenticado
      } else {

        if(localStorage.getItem('session') === "1"){ //Si esta autenticado evalua si es la primera sesión
            next({name: 'contraseña'})
        }else{
            next() // Permite el acceso
        }

    }
}

export default authGuard;