import { useState } from "react";
import { css } from "@emotion/react";

import DistrictFinder from '../lib/DistrictFinder'

const lookupStyle = css`
    border: 1px solid var(--tan6);
    background-color: var(--tan1);
    padding: 1em;

    margin-bottom: 1em;

    .ledein {
        font-style: italic;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.5em;
        margin-bottom: 1em;
        
    }

    input {
        margin: -1px;
        flex: 4 1 15rem;
        height: 2em;
        padding: 0.25em;
    }

    button {
        margin: -1px;
        flex: 1 1 auto;
        background-color: var(--tan5);
        color: white;
        font-weight: normal;
    }
    button:hover {
        background-color: var(--link);
    }

`

const PLACEHOLDER = 'Enter address (e.g., 1301 E 6th Ave, Helena)'
const DEFAULT_MESSAGE = 'Look up districts for your address by entering it above.'

export default function AddressLookup({
    selDistricts,
    setSelDistricts,
}) {
    const { usHouse, psc, mtHouse, mtSenate, matchedAddress } = selDistricts
    const [value, setValue] = useState('XXX')

    const districtFinder = new DistrictFinder()

    function handleChange(event) {
        const input = event.target.value
        setValue(input)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const result = districtFinder.matchAddressToDistricts(
            value,
            match => setSelDistricts(match), // success callback,
            err => console.log({ err }), // fallback
        )
        // TODO - finish implementing this
    }
    function reset() {
        setSelDistricts({
            usHouse: null, // 'us-house-1' or 'us-house-2'
            psc: null, // 'psc-2','psc-3','psc-4'
            mtHouse: 'HD-1', // e.g. 'HD-1',
            mtSenate: 'SD-1', // e.g. 'SD-1'
            matchedAddress: null
        })
    }

    return <div css={lookupStyle}>
        <div className="ledein">Optional: Customize this guide to show races specific to your voting address.</div>
        <form>
            <input onChange={handleChange} type="address" value={value} placeholder={PLACEHOLDER} />
            <button onClick={handleSubmit}>Customize</button>
        </form>
        <div className="message">
            {(matchedAddress === null) && <div>{DEFAULT_MESSAGE}</div>}
            {(matchedAddress !== null) && <div>
                <div>Districts for <strong>{matchedAddress}</strong>:</div>
                <div>{usHouse}, {psc}, {mtHouse}, {mtSenate}</div>
                <a onClick={reset}>Reset</a>
            </div>}
        </div>
    </div>
}