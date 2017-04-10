import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  entry: "src/index.js",
  targets: [
    { dest: "lib/index.cjs.js", format: "cjs" },
    { dest: "lib/index.es.js", format: "es" }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
