import { useState } from "react";
import { css } from "@emotion/react";
import mapDistrictCode from "../lib/mapDistrictCode";
import DistrictFinder from '../lib/DistrictFinder';

const PLACEHOLDER = 'Enter address (e.g., 1301 E 6th Ave, Helena)';
const DEFAULT_MESSAGE = 'Look up districts for your address by entering it above.';

export default function AddressLookup({
    selDistricts,
    setSelDistricts,
}) {
    const { usHouse, psc, mtHouse, mtSenate, matchedAddress } = selDistricts;
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const districtFinder = new DistrictFinder();

    function handleChange(event) {
        const input = event.target.value;
        setValue(input);
        setError(null); // Reset error on input change
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const result = districtFinder.matchAddressToDistricts(
            value,
            match => {
                setSelDistricts(match);
                setError(null);
                setLoading(false);
            },
            err => {
                setError(` Invalid address, please make sure you enter it in this format: 1301 E 6th Ave, Helena`);
                setLoading(false);
            }
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
                <button onClick={handleSubmit} disabled={loading} css={buttonStyle}>
                    {loading ? 'Searching...' : 'Look up'}
                </button>
            </form>
            <div className="message">
                {error && (
                    <div css={errorStyle}>
                        <strong>Error:</strong> {error}
                    </div>
                )}
                {(matchedAddress === null && !error) && <div>{DEFAULT_MESSAGE}</div>}
                {(matchedAddress !== null && !error) && (
                    <div css={resultsContainerStyle}>
                        <div css={headerStyle}>
                            <div css={headerTitleStyle}>Districts for <strong>{matchedAddress}</strong>:</div>
                        </div>
                        <div css={resultsContainerInnerStyle}>
                            <div css={distResStyle}>{mappedDistricts.usHouse}</div>
                            <div css={distResStyle}>{mappedDistricts.mtHouse}</div>
                            <div css={distResStyle}>{mappedDistricts.mtSenate}</div>
                            <div css={distResStyle}>{mappedDistricts.psc}</div>
                        </div>
                        <a onClick={reset} css={resetStyle}>Reset</a>
                    </div>
                )}
            </div>
        </div>
    );
}


const resultsContainerStyle = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const headerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const headerTitleStyle = css`
    flex: 1;
    margin-right: 10px;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

const resetStyle = css`
    cursor: pointer;
    background: #737373;
    color: white;
    padding: 3px 10px;
    align-self: flex-end;
    transition: box-shadow 0.3s ease, background .3s ease;
    &:hover {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        background: var(--link);
    }

    @media (max-width: 768px) {
       
    }
`;

const resultsContainerInnerStyle = css`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
`;

const distResStyle = css`
    flex: 1 1 23%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;
    max-width: 23%;
    padding: 10px;
    border: 1px solid var(--gray4);
    background-color: var(--gray0);
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
`;
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

const buttonStyle = css`
    flex: 1 1 auto;
    background-color: var(--tan5);
    color: white;
    font-weight: normal;
    transition: background-color 0.3s ease;
    text-align: center;
    padding: 0.5em 1em;
    width: 120px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
`;