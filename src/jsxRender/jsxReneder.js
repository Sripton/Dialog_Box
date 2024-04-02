import React from "react";
import { renderToString } from "react-dom/server";
import Layout from "../components/Layout";

export default function jsxRender(_, initState, callBack) {
  const layoutComponents = React.createElement(Layout, { initState });
  const html = renderToString(layoutComponents);
  return callBack(null, `<!DOCTYPE html>${html}`);
}
