const axios = require('axios');

class Busquedas {

    historial = [];

    constructor() {
        // leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = '' ) {

        try {
            
            // petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json `,
                params: this.paramsMapbox
            });
            
            const resp = await instance.get();

            console.log( resp.data );
            
            return []; // retornar los lugares 
        
        } catch ( err ) {
            
            return [];
        
        }

    }

}

module.exports = Busquedas;