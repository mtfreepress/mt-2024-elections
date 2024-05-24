import { css } from "@emotion/react"
import Markdown from "react-markdown"
import { useRouter } from 'next/router'
import Link from 'next/link'

const questionnaireStyle = css`
    
    .question {
        border-left: 5px solid var(--tan2);
        margin-bottom: 1em;
    }
    .question pre code {
        /* workaround for design bug caused by accidental code block formatting */
        font-family: utopia-std, Georgia, Garamond, "Times New Roman", serif;
        font-size: 18px;
        color: rgb(17, 17, 17);
        /* font-size: 18px; */
        line-height: 1.5em;
        font-weight: 400;
        text-wrap: wrap;
    }
    .query {
        font-weight: bold;
        border: 1px solid var(--tan2);
        border-left: none;
        background: var(--tan1);
        padding: 0.5em;
        font-size: 18px;
        line-height: 1.3em;
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
    .comparison {
        margin: 0.75em;
        /* border: 1px solid var(--gray2); */
    }
    .comparison .label {
        font-style: italic;
        margin-left: 0.2em;
    }
    .comparison a {
        display: inline-block;
        border: 1px solid var(--gray2);
        padding: 0.2em 0.5em;
        margin: 0.2em;
    }
    .comparison a:not(:last-child):after{
        /* content: ' • ' */
    }
`

const Question = props => {
    const {
        question,
        answer,
        displayName,
        questionId,
        basePath,
        opponents,
        currentCandidateSlug
    } = props

    return <div className="question">
        <a className="link-anchor" id={questionId}></a>
        <div className="query">{question}</div>
        <div className="answer">
            <div className="name">{displayName}:</div>
            <Markdown>{answer}</Markdown>
            {!answer && <p><em>No answer provided.</em></p>}
        </div>
        {opponents && <div className="comparison">
            <div className="label">Compare to competing candidates</div>
            <div>
                {
                    opponents.map(candidate => <Link key={candidate.slug}
                        className="comparison-link"
                        style={{ fontWeight: candidate.slug === currentCandidateSlug ? 'bold' : 'normal' }}
                        href={`${basePath}/${candidate.slug}/#${questionId}`}>
                        {candidate.displayName}
                    </Link>)
                }
            </div>
        </div>}
    </div >


}

export default function CandidateQuestionnaire(props) {
    const {
        responses,
        displayName,
        opponents,
        currentCandidateSlug
    } = props

    const router = useRouter()
    const basePath = router.pathname.replace('/[candidate]', '') // hacky

    return <div css={questionnaireStyle}>
        {
            responses.map((response, i) => <Question key={String(i)}
                questionId={`issue-question-${i + 1}`}
                {...response}
                displayName={displayName}
                basePath={basePath}
                opponents={opponents}
                currentCandidateSlug={currentCandidateSlug}
            />)
        }

    </div>
}