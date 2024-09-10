import { HD_TO_PSC } from './../data/hd-to-psc'
import { getCorrespondingSenateDistrictNumber } from './utils'

// Local change before deploying
const BASE_PATH = 'http://localhost:3000' 
// const BASE_PATH = 'https://39tcu96a0k.execute-api.us-west-2.amazonaws.com/prod'
const STATE_HOUSE_DISTRICT_API_URL = `${BASE_PATH}/hd-lookup`
const CONGRESSIONAL_DISTRICT_API_URL = `${BASE_PATH}/congressional-lookup`
const GEOCODE_API_URL = `${BASE_PATH}/geocode`

export default class DistrictFinder {

    async matchAddressToDistricts(address, callback, fallback) {

        const geocodeResponse = await this.geocode(address)
        const place = this.pickAddress(geocodeResponse.candidates)
        if (place) {
            const matchedAddress = place.address
            // Note URLs rerouted in next.config.mjs to avoid CORS issue
            const houseDistrictResponse = await this.getDistrict({
                apiUrl: STATE_HOUSE_DISTRICT_API_URL,
                coords: place.location,
                fields: 'District'
            })
            const hd = houseDistrictResponse &&
                houseDistrictResponse.features[0].attributes['District'] ||
                null

            // State senate and PSC districts derived from state house disrict
            const sd = getCorrespondingSenateDistrictNumber(hd)
            const psc = HD_TO_PSC[hd]

            const congressionalDistrictResponse = await this.getDistrict({
                apiUrl: CONGRESSIONAL_DISTRICT_API_URL,
                coords: place.location,
                fields: 'DistrictNumber'
            })
            const usHouse = congressionalDistrictResponse &&
                congressionalDistrictResponse.features[0].attributes['DistrictNumber'] ||
                null

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

    async getDistrict({ apiUrl, coords, fields }) {
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
        console.log(payload, url)
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
            // Encode both key and value
            string = string + `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`
        }
        // Remove trailing '&' if present
        return string.slice(0, -1)
    }

    pickAddress = (locations) => {
        if (locations === undefined) return null
        return locations[0]
    }
}

