import { css } from "@emotion/react";

const lookupStyle = css`
    border: 1px solid var(--tan6);
    background-color: var(--tan1);
    padding: 0.5em;

    margin-bottom: 1em;

    h3 {
        margin: 0;
    }
`

export default function AddressLookup(props) {
    return <div css={lookupStyle}>
        <div>Customize this guide to your address</div>
        <div>[TK interactive]</div>
    </div>
}