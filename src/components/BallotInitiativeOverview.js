import { css } from "@emotion/react";
import Markdown from "react-markdown";

const DUMMY_INITIATIVES = [
    {
        number: 'I-XX1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi leo urna molestie at elementum eu facilisis. Vitae suscipit tellus mauris a. \n\nVulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sit amet porttitor eget dolor morbi. Semper eget duis at tellus at urna condimentum mattis pellentesque. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Dapibus ultrices in iaculis nunc sed augue. Convallis posuere morbi leo urna molestie. Porttitor lacus luctus accumsan tortor posuere ac ut. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Non blandit massa enim nec. Placerat orci nulla pellentesque dignissim enim sit amet. Magna eget est lorem ipsum. Sit amet volutpat consequat mauris nunc congue nisi vitae. Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Augue lacus viverra vitae congue. Metus aliquam eleifend mi in nulla. Molestie at elementum eu facilisis sed odio morbi quis commodo.'
    },
    {
        number: 'I-XX2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi leo urna molestie at elementum eu facilisis. Vitae suscipit tellus mauris a. \n\nVulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sit amet porttitor eget dolor morbi. Semper eget duis at tellus at urna condimentum mattis pellentesque. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Dapibus ultrices in iaculis nunc sed augue. Convallis posuere morbi leo urna molestie. Porttitor lacus luctus accumsan tortor posuere ac ut. Donec massa sapien faucibus et molestie ac feugiat sed lectus. '
    }
]

export default function BallotInitiativeOverview(props) {
    return <div>
        {
            DUMMY_INITIATIVES.map(initiative => {
                const { number, description } = initiative
                return <div key={number}>
                    <h3>{number}</h3>
                    <Markdown>{description}</Markdown>
                </div>
            })

        }
    </div>
}