import React from "react";
import App from "./App";

export default function Layout({ initState }) {
  return (

    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">
          <App {...initState} />
        </div>
      </body>
    </html>
  );
}
