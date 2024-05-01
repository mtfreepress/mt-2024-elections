// import { css } from "@emotion/react";
import Markdown from "react-markdown";

export default function BallotInitiativeOverview({ ballotIssues }) {
    if (!ballotIssues || ballotIssues.length === 0) return null
    return <div>
        {
            ballotIssues.map(initiative => {
                const { number, description } = initiative
                return <div key={number}>
                    <h3>{number}</h3>
                    <Markdown>{description}</Markdown>
                </div>
            })

        }
    </div>
}