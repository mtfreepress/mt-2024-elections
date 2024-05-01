import React from 'react'
import { css } from "@emotion/react";

import Layout from '../design/Layout'

import Markdown from 'react-markdown'

import AddressLookup from '../components/AddressLookup'
import MajorRaceOverview from '../components/MajorRaceOverview'
import LegislativeRaceOverview from '../components/LegislativeRaceOverview'
import LegislativeDistrictSelector from '../components/LegislativeDistrictSelector'
import BallotInitiativeOverview from '../components/BallotInitiativeOverview'

import { urlize } from '../lib/utils'
import {
    getRaceOverviews,
    getOverviewText,
    getBallotIssues,
    getLegislativeDistrictOverviews,
} from '../lib/overview'

const RACE_LEVELS = [
    'Federal Delegation',
    'State Officials',
    'Montana Supreme Court',
    'Public Service Commission'
]

const overviewStyles = css`
    section {
        display: block;
        padding: 0 0.5em;
    }

    h2 {
        text-align: center;
        padding: 0.3em 0.5em;
        padding-bottom: 0.2em;
        background-color: var(--tan2);
        color: var(--tan6);
        border-top: 4px solid var(--tan5);
        font-weight: normal;
        text-transform: uppercase;
        margin-bottom: 1em;
        margin-top: 1em;
        margin-left: -1em;
        margin-right: -1em;
    }
    h3 {
        text-align: center;
        margin-top: 0.2em;
        background-color: var(--tan6);
        padding: 0.3em 0.5em;
        color: white;
        text-transform: uppercase;
    }
`

export async function getStaticProps() {
    const races = getRaceOverviews()
    const legislativeRaces = getLegislativeDistrictOverviews()
    const text = getOverviewText()
    const ballotIssues = getBallotIssues()
    return {
        props: {
            races,
            legislativeRaces,
            ballotIssues,
            text,
        }
    }
}

export default function Home({ races, legislativeRaces, ballotIssues, text }) {

    // State for filtering overview to candidates for a given voter address
    // Design approach here is to make this optional for readers who won't engage with interactivity
    const [selDistricts, setSelDistricts] = React.useState({
        usHouse: null, // 'us-house-1' or 'us-house-2'
        psc: null, // 'psc-2','psc-3','psc-4'
        mtHouse: 'HD-1', // e.g. 'HD-1',
        mtSenate: 'SD-1', // e.g. 'SD-1'
        matchedAddress: null
    })

    const {
        overviewLedeIn,
        overviewBallotInitiatives,
        overviewLegislatureLedeIn,
        overviewAlsoOnYourBallot,
        overviewAboutThisProject,
    } = text

    const raceLevels = RACE_LEVELS.map(level => {
        const matches = races.filter(d => d.level === level)
        return {
            level,
            races: matches,
        }
    })

    const selHouseDistrict = legislativeRaces.find(d => d.districtKey === selDistricts.mtHouse)
    const selSenateDistrict = legislativeRaces.find(d => d.districtKey === selDistricts.mtSenate)

    return (
        <Layout home pageCss={overviewStyles}
            relativePath='/'
            pageTitle={"Montana's 2024 Candidates | MFTP 2024 Election Guide"}
            pageDescription={"Federal, state and legislative candidates seeking office in 2024"}
            pageFeatureImage={"https://apps.montanafreepress.org/capitol-tracker-2023/cap-tracker-banner-dark.png"} // TODO
            siteSeoTitle={"Montana's 2024 Candidates | MFTP 2024 Election Guide"}
            seoDescription={"Federal, state and legislative candidates seeking office in 2024."}
            socialTitle={"The MTFP 2024 Election Guide"}
            socialDescription={"Federal, state and legislative candidates seeking office in 2024."}
        >

            <Markdown>{overviewLedeIn}</Markdown>

            <AddressLookup selDistricts={selDistricts} setSelDistricts={setSelDistricts} />


            <section>
                <div>
                    {raceLevels.slice(0, 2).map(rl => {
                        return <div key={rl.level}>
                            <a className="link-anchor" id={urlize(rl.level)}></a>
                            <h2>{rl.level}</h2>
                            {
                                rl.races
                                    .filter(r => {
                                        // excludes non-selected races when filter view is active
                                        if (r.category === 'us-house' && selDistricts.usHouse !== null) {
                                            return (selDistricts.usHouse === r.raceSlug)
                                        }
                                        else if (r.category === 'psc' && selDistricts.psc !== null) {
                                            return (selDistricts.psc === r.raceSlug)
                                        } else {
                                            return true
                                        }
                                    })
                                    .map(r => <MajorRaceOverview key={r.raceSlug}
                                        race={r}
                                        showMap={['Federal Delegation', 'Public Service Commission'].includes(r.level)}
                                    />)
                            }
                        </div>
                    })}
                </div>
            </section>
            <hr />

            <section>
                <a className="link-anchor" id="legislature"></a>
                <h2>Montana State Legislature</h2>
                <Markdown>{overviewLegislatureLedeIn}</Markdown>
                <LegislativeDistrictSelector
                    houseDistrictOptions={legislativeRaces.filter(d => d.chamber === 'house').map(d => d.districtKey)}
                    senateDistrictOptions={legislativeRaces.filter(d => d.chamber === 'senate').map(d => d.districtKey)}
                    selHd={selDistricts.mtHouse}
                    selSd={selDistricts.mtSenate}
                    setLegislativeDistricts={(mtHouse, mtSenate) => {
                        setSelDistricts({
                            ...selDistricts,
                            mtHouse,
                            mtSenate,
                        })
                    }}
                />
                <LegislativeRaceOverview
                    selHouseDistrict={selHouseDistrict}
                    selSenateDistrict={selSenateDistrict}
                />
            </section>

            <section>
                <div>
                    {raceLevels.slice(2,).map(rl => {
                        return <div key={rl.level}>
                            <a className="link-anchor" id={urlize(rl.level)}></a>
                            <h2>{rl.level}</h2>
                            {
                                rl.races
                                    .filter(r => {
                                        // excludes non-selected races when filter view is active
                                        if (r.category === 'us-house' && selDistricts.usHouse !== null) {
                                            return (selDistricts.usHouse === r.raceSlug)
                                        }
                                        else if (r.category === 'psc' && selDistricts.psc !== null) {
                                            return (selDistricts.psc === r.raceSlug)
                                        } else {
                                            return true
                                        }
                                    })
                                    .map(r => <MajorRaceOverview key={r.raceSlug}
                                        race={r}
                                        showMap={['Federal Delegation', 'Public Service Commission'].includes(r.level)}
                                    />)
                            }
                        </div>
                    })}
                </div>
            </section>
            <hr />

            <section>
                <a className="link-anchor" id="ballot-initiatives"></a>
                <h2>Ballot initiatives</h2>
                <Markdown>{overviewBallotInitiatives}</Markdown>
                <BallotInitiativeOverview ballotIssues={ballotIssues} />
            </section>

            <section>
                <h2>Other ballot items</h2>
                <Markdown>{overviewAlsoOnYourBallot}</Markdown>
            </section>

            <section>
                <a className="link-anchor" id="about"></a>
                <h2>About this project</h2>
                <Markdown>{overviewAboutThisProject}</Markdown>
            </section>

        </Layout >
    );
}