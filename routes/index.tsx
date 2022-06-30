/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import {Handlers, PageProps} from "$fresh/src/server/types.ts";
import Form from "../islands/Form.tsx";


export const handler: Handlers<any, { data: any }> = {
  GET(_req, ctx) {
    return ctx.render(ctx.state.data);
  },
};

export default (props: PageProps) => {
  return (
    <>
      <h4>
        Password Manager <i>#Classic</i>
      </h4>
      <Form/>
    </>
  );
}
