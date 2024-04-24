import raceOverviews from '../data/overview-races.json'
import legislativeDistricts from '../data/legislative-districts.json'
import text from '../data/text.json'

export function getRaceOverviews() {
    // returns lists of candidates with data necessary for overview page
    return raceOverviews
}

export function getLegislativeDistrictOverviews() {
    return legislativeDistricts
}

export function getOverviewText() {
    // returns text for candidate pages
    return text
}