import { useState } from "react";
import { css } from "@emotion/react";
import mapDistrictCode from "../lib/mapDistrictCode";

import DistrictFinder from '../lib/DistrictFinder'

const PLACEHOLDER = 'Enter address (e.g., 1301 E 6th Ave, Helena)'
const DEFAULT_MESSAGE = 'Look up districts for your address by entering it above.'

export default function AddressLookup({
    selDistricts,
    setSelDistricts,
}) {
    const { usHouse, psc, mtHouse, mtSenate, matchedAddress } = selDistricts;
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const districtFinder = new DistrictFinder();

    function handleChange(event) {
        const input = event.target.value;
        setValue(input);
        setError(null); // Reset error on input change
    }

    function handleSubmit(event) {
        event.preventDefault();
        const result = districtFinder.matchAddressToDistricts(
            value,
            match => {
                setSelDistricts(match);
                setError(null);
            },
            err => setError(` Invalid address, please make sure you enter it in this format: 1301 E 6th Ave, Helena`)
        );
    }

    function reset() {
        setSelDistricts({
            usHouse: null,
            psc: null,
            mtHouse: 'HD-1',
            mtSenate: 'SD-1',
            matchedAddress: null
        });
        setValue(null);
        setError(null);
    }

    // Convert district codes to full names
    const mappedDistricts = {
        usHouse: mapDistrictCode(selDistricts.usHouse),
        psc: mapDistrictCode(selDistricts.psc),
        mtHouse: mapDistrictCode(selDistricts.mtHouse),
        mtSenate: mapDistrictCode(selDistricts.mtSenate)
    };

    return (
        <div css={lookupStyle}>
            <div className="ledein">Show only candidates for your voting address</div>
            <form>
                <input onChange={handleChange} type="address" value={value || ''} placeholder={PLACEHOLDER} />
                <button onClick={handleSubmit}>Look up</button>
            </form>
            <div className="message">
                {error && (
                    <div css={errorStyle}>
                        <strong>Error:</strong> {error}
                    </div>
                )}
                {(matchedAddress === null && !error) && <div>{DEFAULT_MESSAGE}</div>}
                {(matchedAddress !== null && !error) && (
                    <div>
                        <div>Districts for <strong>{matchedAddress}</strong>:</div>
                        <div>{mappedDistricts.usHouse}</div>
                        <div>{mappedDistricts.psc}</div>
                        <div>{mappedDistricts.mtHouse}</div>
                        <div>{mappedDistricts.mtSenate}</div>
                        <a onClick={reset}>Reset</a>
                    </div>
                )}
            </div>
        </div>
    );
}

const errorStyle = css`
    background-color: #ffdddd;
    color: #d8000c;
    border: 1px solid #d8000c;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    white-space: pre-wrap;
    svg {
        margin-right: 10px;
    }
`;

const lookupStyle = css`
    border: 1px solid var(--gray6);
    background-color: var(--gray1);
    padding: 1em;

    margin-bottom: 1em;

    .ledein {
        font-weight: bold;
        text-transform: uppercase;
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
const districtResultsStyle = css`
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    white-space: pre-wrap;
    svg {
        margin-right: 10px;
    }
`;