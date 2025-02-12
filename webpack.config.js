const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src/index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.min.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
