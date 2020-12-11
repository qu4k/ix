import { styled } from "uebersicht";

import { Pulse } from "./src/loader.jsx";
import global from "./lib/global.config.js";

export const command = `cd ${global.repo} && git remote update > /dev/null && git rev-list --count --left-right HEAD...@{upstream} | awk 'BEGIN {ORS = ""; print "["} OFS="," {print $1,$2} END {print "]"}'`;

export const className = `
    text-align: right;
    right: 2rem;
    top: 1rem;
    color: #fff;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  `;

const Message = styled("p")((props) => ({
  margin: "0 0",
  textDecoration: props.main ? "underline" : "none",
  fontWeight: props.main ? 600 : "normal",
}));

const ErrorMessage = styled(Message)`
  color: red;
`;

export const refreshFrequency = 60e3 * 60; // ms

export const render = ({ output, error }) => {
  if (error) {
    return (
      <div>
        <ErrorMessage main>ERROR</ErrorMessage>
        <ErrorMessage>{error.message ?? "Unknown error"}</ErrorMessage>
      </div>
    );
  } else if (!output) {
    return <Pulse />;
  }
  const [local, remote] = JSON.parse(output);
  if (remote > local) {
    return (
      <div>
        <Message main>OUTDATED</Message>
        <Message>({remote} commit behind)</Message>
      </div>
    );
  } else if (remote < local) {
    return (
      <div>
        <Message main>OUT OF SYNC</Message>
        <Message>({local} commit above)</Message>
      </div>
    );
  } else {
    return <div></div>;
  }
};
