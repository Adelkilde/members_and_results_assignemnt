async function resultsMain() {
  await buildResultsList();
  displayResults(results);
}

const results = [];
let membersData = null;

async function fetchResults() {
  const resp = await fetch("./data/results.json");
  const data = await resp.json();
  return data;
}

async function fetchMembers() {
  const resp = await fetch("./data/members.json");
  const data = await resp.json();
  return data;
}

async function buildResultsList() {
  const originalObjects = await fetchResults();
  membersData = await fetchMembers();

  for (const orgobj of originalObjects) {
    const resultObj = constructResult(orgobj);
    results.push(resultObj);
  }
}

function displayResults(results) {
  const table = document.querySelector("#results tbody");
  table.innerHTML = "";
  for (const result of results) {
    const html = /*html*/ `
      <tr>
        <td>${result.date.toLocaleString("da-DK", { month: "short", day: "numeric", year: "numeric" })}</td>
        <td>${result.member ? result.member.name : "N/A"}</td>
        <td>${discipliner[result.discipline]}</td>
        <td>${result.type.charAt(0).toUpperCase() + result.type.slice(1).toLowerCase()}</td>
        <td>${result.time}</td>
      </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

const discipliner = {
  breaststroke: "Bryst",
  backstroke: "Ryg",
  freestyle: "Fri svømning",
  butterfly: "Butterfly",
};

function constructResult(resultdata) {
  const resultObject = {
    date: new Date(resultdata.date),
    member: resultdata.memberId,
    discipline: resultdata.discipline,
    type: resultdata.resultType,
    time: resultdata.time,
    memberId: resultdata.memberId,
  };

  Object.defineProperties(resultObject, {
    isTraining: {
      get: function () {
        return this.type === "Training";
      },
      enumerable: false,
    },
    isCompetition: {
      get: function () {
        return this.type === "Competition";
      },
      enumerable: false,
    },
    member: {
      get: function () {
        const matchingMember = membersData.find((member) => member.id === this.memberId);

        if (matchingMember) {
          return {
            id: matchingMember.id,
            name: matchingMember.firstName + " " + matchingMember.lastName,
          };
        }

        return null;
      },
      enumerable: false,
    },
  });

  return resultObject;
}

export default resultsMain;
