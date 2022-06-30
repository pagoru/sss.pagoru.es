/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import {Handlers, PageProps} from "$fresh/src/server/types.ts";
import Form from "../islands/Form.tsx";

export default () => {
  return (
    <>
      <h4>
        Password Manager <i>#Classic</i>
      </h4>
      <Form/>
    </>
  );
}
