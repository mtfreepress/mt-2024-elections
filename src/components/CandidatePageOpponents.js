import { css } from "@emotion/react";

import Link from "next/link";

import { PARTIES } from "@/lib/styles";
import { pluralize } from "@/lib/utils";

const opponentsStyle = css`
    .party-buckets {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
     }
    .party-bucket {
        padding: 0 0.5em;
        h4 {
            margin: 0;
            text-transform: uppercase;
        }
        border-left: 3px solid gray;    
        margin-bottom: 1em;
    } 
`

const candidateStyle = css`
    margin-top: 0.5em;
    a {
        width: 180px;
        height: 40px;
        display: flex;
        align-items: stretch;
        background-color: var(--tan1);
        box-shadow: 2px 2px 3px #aaa;
        color: black;
    }
    a:hover {
        opacity: 0.8;
        text-decoration: none;
        /* border: 2px solid black; */
        color: var(--link);
    }
    
    .portrait-col {
        flex: 0 0 40px;
    }
    .portrait-placeholder {
        width: 40px;
        height: 40px;
        background-color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
    .info-col {
        flex: 0 1 100px;
        padding: 0.5em 0.5em;
        position: relative;

        display: flex;
        align-items: center;
    }
    .name {
        font-size: 1em;
        margin-bottom: 0;
    }
    .summary-line {
        font-style: italic;
        font-size: 0.9em;
    }
    .fakelink {
        position: absolute;
        bottom: 3px;
        right: 8px;
        color: var(--tan4);
    }
`

function Candidate(props) {
    const { slug, displayName, summaryLine, party } = props
    const partyInfo = PARTIES.find(d => d.key === party)
    return <div css={candidateStyle} style={{ borderTop: `3px solid ${partyInfo.color}` }}><Link href={`/${slug}`}>
        <div className="portrait-col">
            <div className="portrait-placeholder">[TK]</div>
        </div>
        <div className="info-col">
            <div className="name">{displayName}</div>
            {/* <div className="summary-line">{summaryLine}</div> */}
        </div>
    </Link ></div >
}

export default function CandidatePageOpponents({ opponents, candidateParty }) {
    return <div css={opponentsStyle}>
        <div className="party-buckets">
            {
                PARTIES
                    .sort((a, b) => a.key === candidateParty ? -1 : 1)
                    .map(party => {
                        const opponentsInParty = opponents.filter(d => d.party === party.key)
                        if (opponentsInParty.length === 0) return null
                        return <div className="party-bucket" key={party.key} style={{ borderLeft: `px solid ${party.color}` }}>
                            <h4 style={{
                                color: party.color
                            }}>{pluralize(party.noun, opponentsInParty.length)}</h4>
                            <div>{opponentsInParty.map(d => <Candidate key={d.slug} {...d} />)}</div>
                        </div>
                    })
            }

        </div>
    </div>
}