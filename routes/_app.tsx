/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import {AppProps, Handlers} from "$fresh/server.ts";


export const handler: Handlers<any, { data: string }> = {
  GET(_req, ctx) {
    console.log('?')
    
    return ctx.render(ctx.state.data);
  },
};


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