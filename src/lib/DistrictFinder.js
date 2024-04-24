import { HD_TO_PSC } from './../data/hd-to-psc'
import { getCorrespondingSenateDistrictNumber } from './utils'

const GEOCODE_API_URL = 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/MontanaAddressLocator/GeocodeServer/findAddressCandidates'


export default class DistrictFinder {

    async matchAddressToDistricts(address, callback, fallback) {

        const geocodeResponse = await this.geocode(address)
        const place = this.pickAddress(geocodeResponse.candidates)
        if (place) {
            const matchedAddress = place.address
            // Note URLs rerouted in next.config.mjs to avoid CORS issue
            const houseDistrictResponse = await this.getDistrict(place.location, '/hd-lookup', 'District')
            const hd = houseDistrictResponse.features[0].attributes['District']

            // State senate and PSC districts derived from state house disrict
            const sd = getCorrespondingSenateDistrictNumber(hd)
            const psc = HD_TO_PSC[hd]

            const congressionalDistrictResponse = await this.getDistrict(place.location, '/congressional-lookup', 'DistrictNumber')
            const usHouse = congressionalDistrictResponse.features[0].attributes['DistrictNumber']

            callback({
                matchedAddress,
                mtHouse: `HD-${hd}`,
                mtSenate: `SD-${sd}`,
                psc,
                usHouse: `us-house-${usHouse}`,
            })
        } else {
            fallback()
        }

    }

    async geocode(address) {
        const payload = {
            SingleLine: address,
            f: 'pjson',
            outSR: '102100'
        }
        const url = this.makeQuery(GEOCODE_API_URL, payload)
        const data = await fetch(url)
            .then(resp => resp.json())
            .catch(err => console.log(err))
        return data
    }

    async getDistrict(coords, apiUrl, fields) {
        const payload = {
            f: 'pjson',
            where: '',
            returnGeometry: 'false',
            spatialRel: 'esriSpatialRelIntersects',
            geometry: `{"x":${coords.x},"y":${coords.y},"spatialReference":{"wkid":102100,"latestWkid":3857}}`,
            geometryType: 'esriGeometryPoint',
            outFields: fields,
        }
        const url = this.makeQuery(apiUrl, payload)
        const data = await fetch(url)
            .then(data => data.json())
            .then(res => res)
            .catch(err => console.log(err))
        if (!data || !data.features) return null
        return data
    }

    makeQuery = (url, params) => {
        let string = url + '?'
        for (let key in params) {
            string = string + `${key}=${params[key].replace(/\s/g, '%20')}&`
        }
        return string
    }

    pickAddress = (locations) => {
        if (locations === undefined) return null
        return locations[0]
    }
}

