import candidates from '../data/candidates.json'

import { makeUrlKey } from './utils.js'

candidates.forEach(c => {
    c.id = `${makeUrlKey(c.Name)}`
})

export function getAllCandidateIds() {
    // return list of candidate name IDs (used as url keys)
    return candidates.map(d => d.id)

}

export function getCandidateData(candidate) {
    // return data for given candidate given ID
    // This is all data necessary to populate a canddiate page
    return candidates.find(d => d.id === candidate)
}

export function getCandidateOverviewDataByRace() {
    // returns lists of candidates with data necessary for overview page
    const races = Array.from(new Set(candidates.map(d => d.Race)))
    return races.map(race => {
        const candidatesInRace = candidates.filter(d => d.Race === race)
        return {
            race,
            candidates: candidatesInRace.map(candidate => {
                // only necessary fields here
                return {
                    id: candidate.id,
                    name: candidate.Name,
                }
            }),
        }
    })
}