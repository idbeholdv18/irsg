import path from "path";
import { Configuration } from "webpack";
import CopyPlugin from "copy-webpack-plugin";

export default (): Configuration => {
  return {
    mode: "development",
    entry: {
      main: path.resolve(__dirname, "src", "index.ts"),
    },
    output: {
      clean: true,
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    target: "node",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "templates", "slice"),
            to: path.resolve(__dirname, "dist", "templates", "slice"),
          },
        ],
      }),
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },
  };
};
