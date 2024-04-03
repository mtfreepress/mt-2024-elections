
import { css } from '@emotion/react'

import Link from 'next/link';

import Layout from '../design/Layout';

import Markdown from 'react-markdown'

import CandidatePageSummary from '../components/CandidatePageSummary'
import CandidateWebLinks from '../components/CandidateWebLinks'
import CandidatePageOpponents from '../components/CandidatePageOpponents'
import CandidateQuestionnaire from '../components/CandidateQuestionnaire'

import { getAllCandidateIds, getCandidateData } from '../lib/candidates';

const candidatePageStyle = css`
    h2 {
        text-transform: uppercase;
        text-align: center;
        padding: 0.3em 0.5em;
        background-color: var(--tan6);
        color: white;
    }


    .link-block {
        margin: 0.5em 0;

        a:not(:last-child):after{
            content: ' • '
        }
    }
`

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
    const {
        party,
        displayName,
        summaryNarrative,
        opponents,
        questionnaire
    } = pageData
    return (
        <Layout pageCss={candidatePageStyle}>
            {/* HEADER SECTION */}
            <CandidatePageSummary {...pageData} />
            <div className="link-block">
                {/* <Link href="#opponents">Opponents</Link> */}
                <Link href="#issues">On the Issues</Link>
                <Link href="#coverage">MTFP coverage</Link>
            </div>

            <section id="opponents">
                <h4>OPPONENTS</h4>
                <CandidatePageOpponents opponents={opponents} candidateParty={party} />
            </section>



            {/* NARRATIVE SECTION */}
            <section>
                <Markdown>{summaryNarrative}</Markdown>
                <CandidateWebLinks {...pageData} />
            </section>

            <div className="placeholder" style={{ height: 100 }}>[POSSIBLE CTA HERE]</div>





            {/* QUESTIONNAIRE RESPONSES */}

            <section id="issues">
                <h2>ON THE ISSUES</h2>
                {questionnaire ?
                    <CandidateQuestionnaire
                        responses={questionnaire.responses}
                        displayName={displayName}
                    /> :
                    <div className="note">No responses at this time.</div>
                }
            </section>

            {/* MTFP COVERAGE */}

            <section id="coverage">
                <h2>MTFP COVERAGE</h2>
                <div>[MTFP COVERAGE LINKS HERE]</div>
            </section>

        </Layout>
    );
}