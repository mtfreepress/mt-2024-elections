import Markdown from 'react-markdown';
import Layout from '../design/Layout'

import { content } from '../data/how-to-vote.json'

export async function getStaticProps() {
    return {
        props: {
            content,
        }
    }
}

export default function HowToVote({ content }) {
    return (
        <Layout
            relativePath='/how-to-vote'
            pageTitle={"Voter information | MFTP 2024 Election Guide"}
            pageDescription={"How to cast a ballot in Montana's 2024 primary and general elections."}
            pageFeatureImage={"https://apps.montanafreepress.org/capitol-tracker-2023/cap-tracker-banner-dark.png"} // TODO
            siteSeoTitle={"Voter information | MFTP 2024 Election Guide"}
            seoDescription={"How to cast a ballot in Montana's 2024 primary and general elections."}
            socialTitle={"The MTFP 2024 Election Guide — Voter information"}
            socialDescription={"How to cast a ballot in Montana's 2024 primary and general elections."}
        >
            <Markdown>{content}</Markdown>
        </Layout >
    );
}