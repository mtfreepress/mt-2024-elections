const fs = require('fs')
const glob = require('glob')
const YAML = require('yaml')

const getYml = (path) => YAML.parse(fs.readFileSync(path, 'utf8'))
const collectYmls = (glob_path) => glob.sync(glob_path).map(getYml)

const writeJson = (path, data) => {
    fs.writeFile(path, JSON.stringify(data, null, 2), err => {
        if (err) throw err
        console.log('JSON written to', path)
    }
    );
}


const races = getYml('./inputs/content/races.yml')
const text = getYml('./inputs/content/text.yml')
const candidates = collectYmls('./inputs/content/candidates/*.yml')

races.forEach(race => {
    if (race.candidates === null) race.candidates = [] // fallback for unpopulated races
})

candidates.forEach(candidate => {
    // merge in necessary race information
    const race = races.find(r => r.candidates.includes(candidate.slug))
    if (!race) console.error('-- No race for candidate', candidate.slug)
    candidate.raceSlug = race.raceSlug
    candidate.raceDisplayName = race.displayName
    candidate.opponents = race.candidates
        .filter(candidateSlug => candidateSlug !== candidate.slug) // exclude this candidate
        .map(candidateSlug => candidates.find(c => c.slug === candidateSlug))
        .map(c => ({
            // include only fields necessary for opponent listings on candidate pages
            slug: c.slug,
            displayName: c.displayName,
            summaryLine: c.summaryLine,
            party: c.party,
        }))
})

const overviewRaces = races.map(race => {

    const candidatesInRace = race.candidates.map(candidateSlug => candidates.find(c => c.slug === candidateSlug))
    if (!(candidatesInRace.length > 0)) console.error('-- No candidates for race', race.raceSlug)
    return {
        ...race,
        candidates: candidatesInRace.map(c => ({
            // Include only fields necessary for summary page
            slug: c.slug,
            displayName: c.displayName,
            summaryLine: c.summaryLine,
            party: c.party,
        })),
    }
})

const overviewText = text // simple pass through logic for now

writeJson('./src/data/candidates.json', candidates) // Data for candidate pages
writeJson('./src/data/overview-races.json', overviewRaces) // Data for landing page
writeJson('./src/data/overview-text.json', overviewText)
writeJson('./src/data/update-time.json', { updateTime: new Date() })


