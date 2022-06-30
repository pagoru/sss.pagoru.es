/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default (props: AppProps) => {
  return (
    <>
      <Head>
        <title>SSS</title>
        <script src="./sha.min.js" />
        <link rel="stylesheet" href="./styles.min.css"/>
      </Head>
      <main>
        <props.Component />
        <div className="body-mesh"/>
      </main>
    </>
  );
}