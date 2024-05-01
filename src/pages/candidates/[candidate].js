
import { css } from '@emotion/react'

import Link from 'next/link';

import Layout from '../../design/Layout';

import Markdown from 'react-markdown'

import CandidatePageSummary from '../../components/CandidatePageSummary'
import CandidateWebLinks from '../../components/CandidateWebLinks'
import CandidatePageOpponents from '../../components/CandidatePageOpponents'
import CandidateQuestionnaire from '../../components/CandidateQuestionnaire'
import LinksList from '../../components/LinksList';

import text from '../../data/text'

import { getAllCandidateIds, getCandidateData } from '../../lib/candidates';

const { questionnaireStateOfficeLedein } = text

const candidatePageStyle = css`
    h2 {
        text-transform: uppercase;
        text-align: center;
        padding: 0.3em 0.5em;
        background-color: var(--tan6);
        color: white;
    }

    /* Moving down into component */
    /* .race-candidates {
        border: 1px solid var(--gray2);
        padding: 0.5em;

        h4 {
            margin-top: 0;
        }
    } */


    .link-block {
        margin: 0.5em 0;

        span:not(:last-child):after{
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
        slug,
        party,
        displayName,
        lastName,
        summaryNarrative,
        opponents,
        questionnaire,
        coverage,
        raceDisplayName,
    } = pageData
    return (
        <Layout pageCss={candidatePageStyle}
            relativePath={slug}
            pageTitle={`${displayName} | ${raceDisplayName} | MFTP 2024 Election Guide`}
            pageDescription={`Candidate for ${raceDisplayName}.`}
            pageFeatureImage={"https://apps.montanafreepress.org/capitol-tracker-2023/cap-tracker-banner-dark.png"} // TODO
            siteSeoTitle={`${displayName} | ${raceDisplayName} | MFTP 2024 Election Guide`}
            seoDescription={`Candidate for ${raceDisplayName}.`}
            socialTitle={`${displayName} on the MTFP 2024 Election Guide`}
            socialDescription={`Candidate for ${raceDisplayName}.`}
        >
            <CandidatePageSummary {...pageData} />
            <div className="link-block">
                {/* <Link href="#opponents">Opponents</Link> */}
                <span><Link href="#bio">About {lastName}</Link></span>
                <span><Link href="#issues">On the issues</Link></span>
                <span><Link href="#coverage">{lastName} in MTFP coverage</Link></span>
            </div>

            <section id="opponents" className="race-candidates">
                <CandidatePageOpponents
                    opponents={opponents} candidateParty={party}
                    route='candidates'
                    raceDisplayName={raceDisplayName}
                    currentPage={slug}
                    hasPortraits={true}
                />
            </section>



            {/* NARRATIVE SECTION */}
            <a className="link-anchor" id="bio"></a>
            <section>
                <Markdown>{summaryNarrative}</Markdown>
                <CandidateWebLinks {...pageData} />
            </section>

            <div className="placeholder" style={{ height: 100 }}>[POSSIBLE CTA HERE]</div>





            {/* QUESTIONNAIRE RESPONSES */}
            <a className="link-anchor" id="issues"></a>
            <section>
                <h2>ON THE ISSUES</h2>
                <Markdown>{questionnaireStateOfficeLedein}</Markdown>
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
            <section>
                <h2>MTFP COVERAGE OF {lastName}</h2>
                <LinksList articles={coverage} />
            </section>

        </Layout>
    );
}