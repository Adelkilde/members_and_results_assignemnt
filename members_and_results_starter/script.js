import { initTabs } from "./tabs.js";
import membersMain from "./members.js";
import resultsMain from "./results.js";

window.addEventListener("load", initApp);

async function initApp() {
  initTabs();
  membersMain();
  resultsMain();
  // TODO: Make the rest of the program ...
}
