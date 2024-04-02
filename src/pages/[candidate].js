
import Link from 'next/link';

import Layout from '../components/layout';

import Markdown from 'react-markdown'

import { getAllCandidateIds, getCandidateData } from '../lib/candidates';

export async function getStaticPaths() {
    // Define routes that should be used for /[candidate] pages
    const slugs = getAllCandidateIds() // Array of URL-friendly slugs
    return {
        paths: slugs.map(d => ({ params: { candidate: d } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    // Populate page props
    const pageData = getCandidateData(params.candidate)
    return {
        props: {
            pageData,
        }
    }
}

export default function CandidatePage({ pageData }) {
    console.log(pageData)
    // Page layout
    const {
        displayName,
        lastName,
        party,
        summaryLine,
        summaryNarrative,
        opponents,
        raceDisplayName
    } = pageData
    return (
        <Layout>
            {/* HEADER SECTION */}
            <div>
                <div>Candidate for {raceDisplayName}</div>
                <h1>{displayName}</h1>
                <div>[PORTRAIT TK]</div>
                <div>[CAMPAIGN WEB LINKS TK]</div>
                <div>{party}</div>
                <div>{summaryLine}</div>
            </div>
            <div>
                <div>Opponents</div>
                <ul>
                    {
                        opponents.map(c => <li key={c.slug}>
                            <div><Link href={`/${c.slug}`}>{c.displayName} ({c.party})</Link></div>
                            <div>{c.summaryLine}</div>
                        </li>)
                    }
                </ul>
            </div>

            {/* NARRATIVE SECTION */}
            <section>
                <Markdown>{summaryNarrative}</Markdown>
            </section>


            {/* QUESTIONNAIRE RESPONSES */}

            <section>
                <h3>ON THE ISSUES</h3>
                <div>[QUESTIONNAIRE RESPONSES HERE]</div>
            </section>

            {/* POSSIBLE CTA */}

            <h2>[POSSIBLE CTA HERE]</h2>

            {/* MTFP COVERAGE */}

            <section>
                <h3>MTFP COVERAGE</h3>
                <div>[MTFP COVERAGE LINKS HERE]</div>
            </section>

            {/* ELECTION RESULTS */}

            <section>
                <div>[TK FIGURE OUT HOW TO HANDLE ELECTION RESULTS]</div>
            </section>



        </Layout>
    );
}