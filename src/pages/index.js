import Head from 'next/head';
import Layout from '../components/layout';

import MajorRaceOverview from '@/components/majorRaceOverview';


import utilStyles from '../styles/utils.module.css';

import { getCandidateOverviewDataByRace } from '../lib/candidates';

export async function getStaticProps() {
    const races = getCandidateOverviewDataByRace()
    return {
        props: {
            races,
        }
    }
}

export default function Home({ races }) {
    return (
        <Layout home>
            <Head>
                <title>TITLE TK</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>LedeInText here</p>
            </section>

            <section>
                <h2>Races</h2>
                <div>
                    {races.map(d => <MajorRaceOverview key={d.race} {...d} />)}
                </div>
            </section>
        </Layout>
    );
}