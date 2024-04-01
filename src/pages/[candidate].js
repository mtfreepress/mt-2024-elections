import Layout from '../components/layout';
import { getAllCandidateIds, getCandidateData } from '../lib/candidates';

export async function getStaticPaths() {
    // Define routes that should be used for /[candidate] pages
    const slugs = getAllCandidateIds() // Array of URL-friendly slugs
    return {
        paths: slugs.map(d => ({ params: { candidate: d } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    // Populate page props
    const pageData = getCandidateData(params.candidate)
    return {
        props: {
            pageData,
        }
    }
}

export default function CandidatePage({ pageData }) {
    // Page layout
    const { Name } = pageData
    return (
        <Layout>
            <h1>{Name}</h1>
            <div>TK TK TK</div>
        </Layout>
    );
}