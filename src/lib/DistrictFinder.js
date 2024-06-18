import { HD_TO_PSC } from './../data/hd-to-psc'
import { getCorrespondingSenateDistrictNumber } from './utils'

const GEOCODE_API_URL = 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/MontanaAddressLocator/GeocodeServer/findAddressCandidates'

const STATE_HOUSE_DISTRICT_API_URL = 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/62/query'
const CONGRESSIONAL_DISTRICT_API_URL = 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/34/query'

// {
//             source: '/hd-lookup',
//             destination: 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/62/query',
//         },
//         {
//             source: '/congressional-lookup',
//             destination: 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/34/query'
//         }

// House test query
// ?where=&text=&objectIds=&time=&geometry=%7B"x"%3A-12360980.600350775%2C"y"%3A5726894.334985688%2C"spatialReference"%3A%7B"wkid"%3A102100%2C"latestWkid"%3A3857%7D%7D&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=html

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
            const hd = houseDistrictResponse.features[0].attributes['District']

            // State senate and PSC districts derived from state house disrict
            const sd = getCorrespondingSenateDistrictNumber(hd)
            const psc = HD_TO_PSC[hd]

            const congressionalDistrictResponse = await this.getDistrict({
                apiUrl: CONGRESSIONAL_DISTRICT_API_URL,
                coords: place.location,
                fields: 'DistrictNumber'
            })
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
            string = string + `${key}=${params[key].replace(/\s/g, '%20')}&`
        }
        return string
    }

    pickAddress = (locations) => {
        if (locations === undefined) return null
        return locations[0]
    }
}

