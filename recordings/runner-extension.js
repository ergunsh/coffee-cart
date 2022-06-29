const {PuppeteerRunnerExtension} = require("@puppeteer/replay");

function stringifyStep(step) {
  const selectorsText = step.selectors ? ` on "${step.selectors.flat().join(", ")}"` : "";
  const valueText = step.value ? ` with value "${step.value}"` : "";
  const keyText = step.key ? ` with key "${step.key}"` : "";
  return `${step.type}${selectorsText}${valueText}${keyText}`;
}

function greenText(text) {
  return `\u001b[42;1m${text}\u001b[0m`;
}

class Extension extends PuppeteerRunnerExtension {
  async afterEachStep(step, flow) {
    await super.afterEachStep(step, flow);
    console.log(`Executed ${JSON.stringify(step)}`);
    // console.log(`    ${greenText("Executed")} ${stringifyStep(step)}`);
  }
}

module.exports = Extension;