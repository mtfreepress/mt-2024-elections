import { css } from "@emotion/react";

import { PARTIES } from '../lib/styles'

const summaryStyle = css`
    margin-top: 0.5em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    background-color: var(--tan1);
    box-shadow: 2px 2px 4px #aaa;
    color: black;
    
    .portrait-col {
        flex: 1 0 100px;
    }
    .portrait-placeholder {
        width: 100%;
        aspect-ratio: 1 / 1;
        background-color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
    .info-col {
        flex: 1 1 400px;
        padding: 0.5em 1em;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
       
    }
    .info-container {
        /* border: 1px solid red; */
    }
    .intro-line {
        font-size: 1.2em;
        text-transform: uppercase;
        text-align: center;
    }
    .position-line {
        font-size: 1.3em;
        text-transform: uppercase;
        text-align: center;
    }
    .name {
        font-weight: bold;
        font-size: 3em;
        text-align: center;
    }
    .summary-line {
        font-style: italic;
        font-size: 1.3em;
        text-align: center;
    }
`

export default function CandidatePageSummary(props) {
    const {
        displayName,
        party,
        summaryLine,
        raceDisplayName
    } = props

    const partyInfo = PARTIES.find(d => d.key === party)
    return <div css={summaryStyle} style={{ borderTop: `5px solid ${partyInfo.color}` }}>

        <div className="portrait-col">
            <div className="portrait-placeholder">[TK]</div>
        </div>
        <div className="info-col">
            <div className="info-container">
                <div className="intro-line"><strong style={{ color: partyInfo.color }}>{partyInfo.adjective}</strong> candidate for <strong>{raceDisplayName}</strong></div>
                <h1 className="name">{displayName}</h1>
                <div className="summary-line">{summaryLine}</div>
            </div>
        </div>
    </div>
}