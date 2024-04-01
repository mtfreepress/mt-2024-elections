import { css } from "@emotion/react";

import Link from 'next/link'

function CandidateOverview(props) {
    const { name, id } = props
    return <li><Link href={`/${id}`}>{name}</Link></li>
}

export default function MajorRaceOverview({ race, candidates }) {
    return <div key={race}>
        <h3>{race}</h3>
        <ul>{candidates.map(d => <CandidateOverview key={d.id} {...d} />)}</ul>
    </div>
}