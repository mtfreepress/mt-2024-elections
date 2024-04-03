import { css } from "@emotion/react";

import Head from 'next/head';

import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'

import { metaData } from "@/config";

const bodyStyle = css`
    position: relative;
`

const contentStyle = css`
    padding: 10px;
    padding-top: 0;
    max-width: 800px;
    margin: auto;
`

// TODO
// - Implement favicon
// - Implement feature image
// - Wire up Google Analytics
// - Wire up Parsely

export default function Layout({ pageTitle, children, home, pageCss }) {
  const { seoTitle, seoDescription, url } = metaData
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link
          rel="shortcut icon"
          href="../public/mtfp-icon.png"
        />
        <meta
          name="description"
          content={seoDescription}
        />

        <meta property="og:url" content={url} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Montana Free Press" />
        <meta property="og:title" content={seoTitle} />
        {/* <meta property="og:image" content={metaImage} /> */}
        {/* <meta property="og:image:width" content="1200" /> */}
        {/* <meta property="og:image:height" content="630" /> */}
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mtfreepress" />
        <meta name="twitter:title" content={seoTitle} />
        {/* <meta name="twitter:image" content={metaImage} /> */}
        <meta name="twitter:description" content={seoDescription} />

        <meta name="og:title" content={seoTitle} />
        <meta name="twitter:card" content="summary_large_image" />

      </Head>

      <div css={[bodyStyle]}>
        <Header />
        <Nav />
        <main css={[contentStyle, pageCss]}>{children}</main>
        <Footer />
      </div>


    </div>
  );
}