const fs = require('fs')
const glob = require('glob')
const YAML = require('yaml')

const urlize = str => str.toLowerCase().replaceAll(/\s/g, '-')

const getMD = path => ({ content: fs.readFileSync(path, 'utf8') })
const getJson = (path) => JSON.parse(fs.readFileSync(path, 'utf8'))
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
const ballotInitiatives = getYml('./inputs/content/ballot-initiatives.yml')
const coverage = getJson('./inputs/coverage/articles.json')
const howToVoteContent = getMD('./inputs/content/how-to-vote.md')
const federalCampaignFinance = getJson('./inputs/fec/finance.json')


// const questionnaires = getJson('./inputs/mtfp-questionnaire/dummy-answers.json')
const questionnaires = getYml('./inputs/mtfp-questionnaire/copy-edited-answers.yml')

const FEC_DATA_EXCLUDE = [
    // Pre-ballot printing dropouts 
    'MYGLAND, JEREMY',
    'MORAN, CORY',
    'ROSENDALE, MATT MR.',
]

// Clean campaign finance data

races.forEach(race => {
    if (race.candidates === null) race.candidates = [] // fallback for unpopulated races

    if (race.campaignFinanceAgency === 'fec') {
        race.finance = federalCampaignFinance.find(d => d.raceSlug == race.raceSlug).finances
            .filter(c => !FEC_DATA_EXCLUDE.includes(c.candidate_name))
            .map(fecData => {
                const candidateMatch = candidates.find(c => c.fecId === fecData.candidate_id)
                if (!candidateMatch) console.warn(`Missing FEC ID match for ${fecData.candidate_name}`)
                return {
                    displayName: candidateMatch.displayName,
                    party: candidateMatch.party,
                    candidateCommitteeName: fecData.candidate_pcc_name,
                    candidateId: fecData.candidate_id,
                    totalReceipts: fecData.total_receipts,
                    totalDisbursments: fecData.total_disbursements,
                    cashOnHand: fecData.cash_on_hand_end_period,
                    coverageEndDate: fecData.coverage_end_date,
                }
            })
    } else {
        race.finance = null // Skipping campaign finance integration for non-FEC (i.e. MT COPP races)
    }
})

candidates.forEach(candidate => {
    // merge in necessary race information
    const race = races.find(r => r.candidates.includes(candidate.slug))
    if (!race) console.error('-- No race for candidate', candidate.slug)
    candidate.raceSlug = race.raceSlug
    candidate.raceDisplayName = race.displayName
    candidate.opponents = race.candidates
        // .filter(candidateSlug => candidateSlug !== candidate.slug) // exclude this candidate
        // Skipping exclude to do 'contenders' v. 'opponents'
        .map(candidateSlug => {
            const match = candidates.find(c => c.slug === candidateSlug)
            if (!match) console.log('No candidateSlug match for', candidateSlug)
            return match
        })
        .map(c => {
            return {// include only fields necessary for opponent listings on candidate pages
                slug: c.slug,
                displayName: c.displayName,
                summaryLine: c.summaryLine,
                party: c.party,
            }
        })
    candidate.coverage = coverage
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(article => article.tags.map(urlize).includes(candidate.slug))

    if (race.finance) {
        candidate.finance = race.finance.map(competitor => {
            return {
                ...competitor,
                isThisCandidate: (competitor.displayName === candidate.displayName),
                candidateStatus: candidate.status
            }
        })
    } else {
        candidate.finance = null
    }


    const questionnaireMatch = questionnaires.find(d => d.nameSlug === candidate.slug)
    if (!questionnaireMatch) console.log(`${candidate.slug} missing questionnaire answers`)
    candidate.questionnaire = {
        hasResponses: (questionnaireMatch && questionnaireMatch.questionnaireMaterial[0].response !== null),
        responses: (questionnaireMatch && questionnaireMatch.questionnaireMaterial !== null) ?
            questionnaireMatch.questionnaireMaterial.map(d => ({ question: d.question, answer: d.response }))
            : []
    }
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
            hasResponses: c.questionnaire.hasResponses,
            numMTFParticles: c.coverage.length,
        })),
    }
})

writeJson('./src/data/candidates.json', candidates) // Data for candidate pages
writeJson('./src/data/overview-races.json', overviewRaces) // Data for landing page
writeJson('./src/data/ballot-initiatives.json', ballotInitiatives) // Pass through - ballot initiative structured test
writeJson('./src/data/text.json', text) // simple pass through logic for now
writeJson('./src/data/how-to-vote.json', howToVoteContent)
writeJson('./src/data/update-time.json', { updateTime: new Date() })



