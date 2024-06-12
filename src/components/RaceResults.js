import { css } from '@emotion/react'

import { PARTIES } from '../lib/styles'
import { numberFormat, percentFormat, formatDate } from '../lib/utils'

const style = css`
    padding: 0.5em;
    max-width: 450px;
    .title {
        font-style: italic;
        margin-bottom: 0.5em;
    }
    .result-row {
        display: flex;
        padding: 0.2em 0.5em;
        height: 18px;
        width: 100%;

        &.winner {
            background-color: var(--tan1);
        }
    }
    .result-row-name {
        flex: 0 0 150px;
        color: var(--gray4);
        margin-right: 0.5em;
        font-size: 14px;

    }
    .result-row-percent {
        flex: 0 0 3em;
        margin-right: 0.5em;
        text-align: right;
    }
    .result-row-bar {
        flex: 1 0 100px;
    }
    .date {
        font-style: italic;
        font-size: 14px;
        margin-top: 1em;
        margin-left: 0.3em;
    }
`

const RaceResults = props => {
    const { title, primaryParty, results } = props
    const timestamp = results.reportingTime
    const primaryPartyLabel = primaryParty ? PARTIES.find(d => d.key === primaryParty).adjective : null

    return <div css={style}>
        <div className="title">{title}{primaryParty && ` – ${primaryPartyLabel} candidates`}</div>
        {
            results.resultsTotal
                .sort((a, b) => b.votes - a.votes)
                .map((d, i) => <Row key={String(i)} {...d} />)
        }
        <div className="date">Count reported by Montana secretary of state as of {formatDate(new Date(timestamp))}.</div>
    </div>
}

export default RaceResults

const BAR_RANGE = 120
const Row = ({ candidate, votes, votePercent, isWinner, party }) => {
    const partyInfo = PARTIES.find(d => d.key === party)
    const barWidth = votePercent * BAR_RANGE
    return <div className={`result-row ${isWinner ? 'winner' : ''}`}>
        <div className="result-row-name">{candidate}</div>
        <div className="result-row-percent">{percentFormat(votePercent)}</div>
        <div className="result-row-bar"><svg>
            <rect fill={partyInfo.color} x={0} y={0} height={18} width={barWidth} />
            <text fontSize={12} x={barWidth + 5} y={14}>{numberFormat(votes)} votes</text>
        </svg></div>
    </div>
}
