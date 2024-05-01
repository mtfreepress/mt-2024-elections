import raceOverviews from '../data/overview-races.json'
import legislativeDistricts from '../data/legislative-districts.json'
import text from '../data/text.json'
import ballotIssues from '../data/ballot-initiatives.json'

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

export function getBallotIssues() {
    // returns array of ballot issues to show on overview page
    return ballotIssues
}