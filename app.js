const path = require( "path");  
const express = require( "express");  
const webpack = require( "webpack");  
const webpackDevMiddleware = require( "webpack-dev-middleware");  
const config= require( "./webpack_web_prod.config.js");

const app           = express(),  
      DIST_DIR      = path.join(__dirname, "dist/web"),
      HTML_FILE     = path.join(DIST_DIR, "index.html"),
      DEFAULT_PORT  = 3000,
      compiler      = webpack(config);

app.set("port", process.env.PORT || DEFAULT_PORT);

  
    app.use(express.static(DIST_DIR));

    app.get("*", (req, res) => res.sendFile(HTML_FILE));


app.listen(app.get("port"));