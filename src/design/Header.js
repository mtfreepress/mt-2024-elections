
import { css } from '@emotion/react'
import Link from 'next/link'

import MTFPLogo from './MTFPLogo'

import updateTime from '../data/update-time.json'

import { formatDate } from '../lib/utils'

// TODO - figure out how to make this work
import headerBackground from "../../public/cap-tracker-background.png"

import { metaData, headerDonateLink } from '../config'

const headerStyle = css`  
  background-color: var(--tan7);
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
  padding: 1em;
`

const titleStyle = css`
  color: var(--tan4);
  font-size: 3em;
  margin-bottom: 5px;
  margin-top: 0;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;

  a {
    color: var(--gray1);
  }
  a:hover {
    color: var(--link);
    text-decoration: none;
  }

  @media screen and (max-width: 468px) {
    font-size: 2em;
  }
`
const subtitleStyle = css`
  color: var(--tan4);
  font-size: 1.15em;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
`
const mtfpBlurbCss = css`
  text-align: center;
  color: var(--gray1);
  font-style: italic;
`

const updateCss = css`
  color: var(--tan4);
  font-size: 0.9em;
  margin-top: 1em;
  text-align: center;
`

const Header = () => {
  const { webTitle, webSubtitle } = metaData
  return <div css={headerStyle} style={{
    backgroundImage: `linear-gradient( rgba(23, 24, 24, 0.2), rgba(23, 24, 24, 0.5) ), url(${headerBackground})`
  }}>
    <h1 css={titleStyle}><Link href="/">{webTitle}</Link></h1>
    <h2 css={subtitleStyle}>{webSubtitle}</h2>
    <div css={mtfpBlurbCss}>
      A digital guide by <MTFPLogo />| <a href={headerDonateLink}>Support this work</a>
    </div>
    <div css={updateCss}>
      Last update: {formatDate(new Date(updateTime.updateTime))}
    </div>
  </div>
}

export default Header