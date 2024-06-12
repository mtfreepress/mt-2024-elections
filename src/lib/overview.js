import raceOverviews from '../data/overview-races.json'
import legislativeDistricts from '../data/legislative-districts.json'
import text from '../data/text.json'
import votingFAQ from '../data/how-to-vote.json'
import ballotIssues from '../data/ballot-initiatives.json'
import allCandidates from '../data/all-candidate-summary.json'

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

export function getHowToVoteText() {
    return votingFAQ.content
}

export function getFullCandidateList() {
    return allCandidates
}