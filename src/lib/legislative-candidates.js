import legislativeCandidates from '../data/legislative-candidates.json'

export function getAllCandidateIds() {
    // return list of candidate slugs (used as url keys)
    return legislativeCandidates.map(d => d.slug)

}

export function getCandidateData(candidateSlug) {
    // return data for given candidate given ID
    // This is all data necessary to populate a candidate page
    return legislativeCandidates.find(d => d.slug === candidateSlug)
}