
import config from '../config'



class UsuarioAPI {

    async loguear(usuario) {
        try {
            const res = await fetch(`${config.API_URL}usuarios/login`, {
                method: 'POST',
                body: JSON.stringify({
                    "email": usuario.email,
                    "password": usuario.password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
                }
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async obtenerCatalogoBicicletas() {
        try {
            const res = await fetch(`${config.API_URL}bicicletas/catalogo/disp`, {
                method: 'GET'
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async obtenerDetalleBicicleta(id) {
        try {
            const res = await fetch(`${config.API_URL}bicicletas/${id}`, {
                method: 'GET'
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async obtenerReservas(email) {
        try {
            const res = await fetch(`${config.API_URL}usuarios/reservas/${email}`, {
                method: 'GET'
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async obtenerRutas() {
        try {
            const res = await fetch(`${config.API_URL}usuarios/rutas/all`, {
                method: 'GET'
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async obtenerDatosUsuario(email){
        try {
            const res = await fetch(`${config.API_URL}usuarios/${email}`, {
                method: 'GET'
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async reservarBicicleta(data){
        try {
            const res = await (`${config.API_URL}usuarios/reservar`,{
                method: 'POST',
                body: JSON.stringify(data)
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async obtenerIdUsuario(email){
        try {
            const res = await (`${config.API_URL}/usuarios/buscarId/${email}`,{
                method: 'GET',
            })
            const data = await res.json()
            console.log( data)
        } catch (error) {
            console.log(error)
        }
    }

}



export default new UsuarioAPI();