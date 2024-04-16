import React from 'react'
import { css } from "@emotion/react";

import Layout from '../design/Layout'

import Markdown from 'react-markdown'

import AddressLookup from '../components/AddressLookup'
import MajorRaceOverview from '../components/MajorRaceOverview'
import LegislativeRaceOverview from '../components/LegislativeRaceOverview'
import BallotInitiativeOverview from '../components/BallotInitiativeOverview'

import { urlize } from '../lib/utils'
import { getRaceOverviews, getOverviewText } from '../lib/overview'

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
    const text = getOverviewText()
    return {
        props: {
            races,
            text,
        }
    }
}

export default function Home({ races, text }) {

    // State for filtering overview to candidates for a given voter address
    // Design approach here is to make this optional for readers who won't engage with interactivity
    const [selDistricts, setSelDistricts] = React.useState({
        usHouse: null, // 'us-house-1' or 'us-house-3'
        psc: null, // 'psc-2','psc-3','psc-4'
        mtHouse: null, // e.g. 'HD-1',
        mtSenate: null, // e.g. 'SD-1'
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

    return (
        <Layout home pageCss={overviewStyles}
            pageTitle={"Montana's 2024 Candidates | MFTP 2024 Election Guide"}>

            <Markdown>{overviewLedeIn}</Markdown>

            <AddressLookup setSelDistricts={setSelDistricts} />


            <section>
                <div>
                    {raceLevels.map(rl => {
                        return <div key={rl.level} id={urlize(rl.level)}>
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
                <h2>State Legislature</h2>
                <Markdown>{overviewLegislatureLedeIn}</Markdown>
                <LegislativeRaceOverview />
            </section>

            <section>
                <h2>Ballot initiatives</h2>
                <Markdown>{overviewBallotInitiatives}</Markdown>
                <BallotInitiativeOverview />
            </section>

            <section>
                <h2>Other ballot items</h2>
                <Markdown>{overviewAlsoOnYourBallot}</Markdown>
            </section>

            <section>
                <h2>About this project</h2>
                <Markdown>{overviewAboutThisProject}</Markdown>
            </section>

        </Layout >
    );
}