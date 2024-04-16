import Markdown from 'react-markdown';
import Layout from '../design/Layout'


// TODO wire up CMS import for HowToVote from markdown content

export default function HowToVote({ content }) {

    return (
        <Layout home pageTitle="How to vote in Montana's 2024 election | MFTP 2024 Election Guide">

            <Markdown>{content}</Markdown>
        </Layout >
    );
}