import { styled } from "uebersicht";

import global from "./lib/global.config.js";

export const command = `cd ${global.repo} && git remote update > /dev/null 2> /dev/null && git rev-list --count --left-right HEAD...@{upstream} | awk 'BEGIN {ORS = ""; print "["} OFS="," {print $1,$2} END {print "]"}'`;

export const className = `
    text-align: right;
    right: 2rem;
    top: 1rem;
    color: #fff;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  `;

const Message = styled("p")(props => ({
  margin: "0 0",
  textDecoration: props.main ? "underline" : "none"
}))

export const refreshFrequency = 60e3 * 60; // ms

export const render = ({ output }) => {
  if (!output) {
    return <Message>Could not connect to git</Message>
  }
  const [local, remote] = JSON.parse(output);
  if (remote > local) {
    return (
      <div>
        <Message main>Outdated</Message>
        <Message>({remote} commit behind)</Message>
      </div>
    );
  } else if (remote < local) {
    return <Message>Out of sync</Message>;
  } else {
    return (
      <div></div>
    );
  }
};
