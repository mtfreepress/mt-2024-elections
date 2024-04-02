import raceOverviews from '../data/overview-races.json'
import text from '../data/overview-text.json'

export function getRaceOverviews() {
    // returns lists of candidates with data necessary for overview page
    return raceOverviews
}

export function getOverviewText() {
    // returns text for candidate pages
    return text
}