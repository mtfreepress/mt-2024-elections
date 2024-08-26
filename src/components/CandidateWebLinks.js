import { css } from '@emotion/react'

import { WEB_LINKS } from '../lib/styles'

const linkContainerStyle = css`
    margin: 0.5em 0;
    color: var(--tan5);

`

const socialTagStyle = css`
    display: inline-block;
    margin-right: 0.5em;
    font-size: 0.9em;

    background-color: var(--tan5);
    color: white;
    padding: 0.3em 0.6em;
    position: relative;

    .icon svg {
        width: 16px;
        fill: white;
        color: white; // redundant for text stuff
        margin-right: 0.5em;
        position: relative;
        top: 2px;
    }

    :hover {
        color: var(--link);
        svg {
            fill: var(--link);
        }
    }

`

const SocialTag = ({ url, type, icon, replace }) => {

    let label = url.replace('http://', '').replace('https://', '').replace('www.', '')
        .replace(replace, '')
        .replace(/\/$/g, '')

    // Further overrides
    if (type === 'FB') {
        label = label.replace(/-\d+$/, '') // trailing numbers
        if (label.match(/profile.php\?id=\d+/)) label = 'Facebook'
    }
    if (type === 'YT') {
        label = 'YouTube'
    }

    return <a css={socialTagStyle} href={`${url}`}>
        <span className="icon">{icon}</span>
        <span className="icon-label">{label}</span>
    </a>
}

export default function CandidateWebLinks(props) {
    console.log(props)
    const webLinks = WEB_LINKS.map(type => {
        const url = props['campaign' + type.key] // e.g. campaignWebsite or campaignFB
        if (!url) return null
        return <SocialTag key={type.key} url={url} {...type} type={type.key} />
    }).filter(d => d !== null)

    if (!webLinks.length > 0) return null

    return <div css={linkContainerStyle}>
        <h4>Campaign links</h4>
        <div>{webLinks}</div>
    </div>
}