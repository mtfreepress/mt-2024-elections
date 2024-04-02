import { css } from "@emotion/react";

import Link from 'next/link'

function CandidateOverview(props) {
    const { slug, displayName, summaryLine, party } = props
    return <li>
        <div><Link href={`/${slug}`}>{displayName} ({party})</Link></div>
        <div>{summaryLine}</div>
    </li>
}

export default function MajorRaceOverview({ race }) {
    const { raceSlug, displayName, candidates } = race
    return <div key={raceSlug}>
        <h2>{displayName}</h2>
        <ul>{candidates.map(d => <CandidateOverview key={d.slug} {...d} />)}</ul>
    </div>
}