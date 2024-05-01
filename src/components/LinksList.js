// import React from 'react'
import { css } from '@emotion/react'

import {
    formatDate
} from '../lib/utils'

const linkListStyle = css`
    margin: 1em 0;
    padding: 0;

    .link-container {
        display: flex;
        flex-wrap: wrap;
    }
`
const articleStyle = css`
    display: block;
    background-color: #EAE3DA;
    color: #222;
    padding: 0.7em 0.7em;
    border: 1px solid #806F47;
    margin: 0.3em;

    cursor: pointer;
    flex: 1 1 200px;
    min-width: 150px;

    :hover {
        text-decoration: none;
        color: #ce5a00;
    }

    :hover .title {
        /* color: #BA892D; */
        text-decoration: underline;
        
    }

    .dek {
        font-size: 0.8em;
        line-height: 0.9em;
        text-transform: uppercase;
        color: var(--gray4) !important;
        margin-bottom: 0.5em;
    }

    .title {
        font-size: 1em;
        font-weight: bold;
        line-height: 1em;
        color: #ce5a00;
        margin-bottom: 0.3em;
    }

    .detail {
        font-size: 0.8em;
        font-style: italic;
        color: #666;
    }

`

// Handles null dates from improperly parsed links
const presentDate = date => date ? formatDate(new Date(date)) : null

const LinksList = ({ articles }) => {
    if (!articles || articles.length === 0) return <div css={linkListStyle}>
        <div className="no-stories">No stories currently in our database.</div>
    </div>

    return <div css={linkListStyle}>
        <div className="link-container">
            {
                articles
                    .map((article, i) => <Article key={String(i)} {...article} />)
            }
        </div>
    </div>
}
export default LinksList

const Article = (props) => {
    const { link, title, date } = props
    // const category = props.categories.nodes[0].name // TK switch to processing
    // const author = props.author.node.name // TK switch to processing

    return <a css={articleStyle} href={link}>
        {/* <div className='dek'>📰 {category}</div> */}
        <div className='title'>{title}</div>
        <div className='detail'>{formatDate(new Date(date))}</div>
    </a>
}