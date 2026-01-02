const path = require("path");
const fs = require("fs");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/index.css"],
  output: {
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "rene.css",
    }),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          () => {
            fs.unlinkSync(path.resolve(__dirname, "main.js"));
          },
        ],
      },
    }),
  ],
};
