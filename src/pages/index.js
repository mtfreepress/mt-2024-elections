import Head from 'next/head';
import Layout from '../components/layout';

import Markdown from 'react-markdown'

import MajorRaceOverview from '@/components/majorRaceOverview';

import { getRaceOverviews, getOverviewText } from '../lib/overview';

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
    const {
        overviewLedeIn,
        overviewBallotInitiatives,
        overviewLegislatureLedeIn,
        overviewAlsoOnYourBallot,
        overviewAboutThisProject,
    } = text
    return (
        <Layout home>
            <Head>
                <title>TITLE TK</title>
            </Head>

            <section>
                <Markdown>{overviewLedeIn}</Markdown>
            </section>

            <section>
                <div>[TK Customize this guide to your address - interactive]</div>
            </section>

            <section>
                <div>
                    {races.map(r => <MajorRaceOverview key={r.raceSlug} race={r} />)}
                </div>
            </section>

            <section>
                <h2>Montana Legislature</h2>
                <Markdown>{overviewLegislatureLedeIn}</Markdown>
            </section>

            <section>
                <h2>Ballot initiatives</h2>
                <Markdown>{overviewBallotInitiatives}</Markdown>
            </section>

            <section>
                <h2>Other items on your ballot</h2>
                <Markdown>{overviewAlsoOnYourBallot}</Markdown>
            </section>

            <section>
                <h2>About this project</h2>
                <Markdown>{overviewAboutThisProject}</Markdown>
            </section>

        </Layout>
    );
}