// 在babel7.4.0之后所有的polyfill操作都依赖core-js
/**
 * 用preset-env来转换语法和polyfill，
 * 然后再利用@babel/plugin-transform-runtime来引入helpers跟generator做到代码重复利用
 */
module.exports = {

    presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: "3", debug: true }]],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: { version: 3, proposals: true },
            },
        ],
        ["@vue/babel-plugin-jsx"],

    ],

}