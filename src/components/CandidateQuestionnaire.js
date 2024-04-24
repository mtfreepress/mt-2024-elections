import { css } from "@emotion/react";
import Markdown from "react-markdown";

const questionnaireStyle = css`
    
    .question {
        border-left: 5px solid var(--tan2);
        margin-bottom: 1em;
    }
    .query {
        font-weight: bold;
        border: 1px solid var(--tan2);
        border-left: none;
        background: var(--tan1);
        padding: 0.5em;
        font-size: 16px;
    }
    .answer {
        margin: 1em;
        font-size: 0.8em;
    }
    .name {
        font-size: 1rem;
        text-transform: uppercase;
        color: var(--tan5);
    }
`

const Question = props => {
    const { question, answer, displayName } = props

    return <div className="question">
        <div className="query">{question}</div>
        <div className="answer">
            <div className="name">{displayName}:</div>
            <Markdown>{answer}</Markdown>
            {!answer && <p><em>No answer provided.</em></p>}
        </div>
    </div>
}

export default function CandidateQuestionnaire(props) {
    const {
        responses,
        displayName
    } = props

    return <div css={questionnaireStyle}>
        {
            responses.map((response, i) => <Question key={String(i)} {...response} displayName={displayName} />)
        }

    </div>
}