import candidates from '../data/candidates.json'

export function getAllCandidateIds() {
    // return list of candidate slugs (used as url keys)
    return candidates.map(d => d.slug)

}

export function getCandidateData(candidateSlug) {
    // return data for given candidate given ID
    // This is all data necessary to populate a candidate page
    return candidates.find(d => d.slug === candidateSlug)
}