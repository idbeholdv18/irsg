import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { BannerPlugin, Configuration } from "webpack";

export default (env: { mode: "production" | "development" }): Configuration => {
  return {
    mode: env.mode,
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
      new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
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
