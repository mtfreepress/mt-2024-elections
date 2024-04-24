
import { css } from '@emotion/react'

import Link from 'next/link';

import Layout from '../../design/Layout';

import Markdown from 'react-markdown'

import LegislativeCandidatePageSummary from '../../components/LegislativeCandidatePageSummary'
import CandidateWebLinks from '../../components/CandidateWebLinks'
import CandidatePageOpponents from '../../components/CandidatePageOpponents'
import CandidateQuestionnaire from '../../components/CandidateQuestionnaire'
import LinksList from '../../components/LinksList'

import text from '../../data/text'
import { getAllCandidateIds, getCandidateData } from '../../lib/legislative-candidates';

const { questionnaireLegislatureLedein } = text

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
    // Define routes that should be used for /[legeCandidate] pages
    const slugs = getAllCandidateIds() // Array of URL-friendly slugs
    // const slugs = []
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
        slug,
        party,
        displayName,
        summaryNarrative,
        opponents,
        questionnaire,
        coverage,
        raceDisplayName,
        cap_tracker_2023_link
    } = pageData
    return (
        <Layout pageCss={candidatePageStyle}
            relativePath={slug}
            pageTitle={`${displayName} | MFTP 2024 Election Guide`}
            pageDescription={`Candidate for ${raceDisplayName}.`}
            pageFeatureImage={"https://apps.montanafreepress.org/capitol-tracker-2023/cap-tracker-banner-dark.png"} // TODO
            siteSeoTitle={"Voter information | MFTP 2024 Election Guide"}
            seoDescription={`Candidate for ${raceDisplayName}.`}
            socialTitle={`${displayName} on the MTFP 2024 Election Guide`}
            socialDescription={`Candidate for ${raceDisplayName}.`}
        >
            <LegislativeCandidatePageSummary {...pageData} />
            <div className="link-block">
                {/* <Link href="#opponents">Opponents</Link> */}
                <Link href="#issues">On the issues</Link>
                <Link href="#coverage">MTFP coverage</Link>
                {cap_tracker_2023_link && <Link href={cap_tracker_2023_link}> Legislative record via MTFP Capitol Tracker</Link>}
            </div>

            <a className="link-anchor" id="opponents"></a>
            <section>
                <CandidatePageOpponents
                    opponents={opponents}
                    candidateParty={party}
                    route='legislature'
                    raceDisplayName={raceDisplayName}
                    currentPage={slug}

                />
            </section>



            {/* NARRATIVE SECTION */}
            <section>
                <Markdown>{summaryNarrative}</Markdown>
                <CandidateWebLinks {...pageData} />
            </section>

            <div className="placeholder" style={{ height: 100 }}>[POSSIBLE CTA HERE]</div>

            {/* QUESTIONNAIRE RESPONSES */}

            <a className="link-anchor" id="issues"></a>
            <section>
                <h2>ON THE ISSUES</h2>
                <Markdown>{questionnaireLegislatureLedein}</Markdown>
                {questionnaire ?
                    <CandidateQuestionnaire
                        responses={questionnaire.responses}
                        displayName={displayName}
                    /> :
                    <div className="note">No responses at this time.</div>
                }
            </section>

            {/* MTFP COVERAGE */}
            <a className="link-anchor" id="coverage"></a>
            <section id="coverage">
                <h2>MTFP COVERAGE</h2>
                <LinksList articles={coverage} />
            </section>

        </Layout>
    );
}