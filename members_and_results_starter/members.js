import * as listRenderer from "./listRenderer.js";

async function membersMain() {
  await buildMembersList();
  const memberList = listRenderer.construct(members);
  memberList.render();
}

const members = [];

async function fetchMembers() {
  const resp = await fetch("./data/members.json");
  const data = await resp.json();
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for (const orgobj of originalObjects) {
    const memberObj = constructMember(orgobj);
    members.push(memberObj);
  }
}

function displayMembers(members) {
  members.sort((a, b) => a.name.localeCompare(b.name));
  const table = document.querySelector("#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.active ? "Aktiv" : "Ikke Aktiv"}</td>
      <td>${member.birthday.toLocaleString("da-DK", { month: "short", day: "numeric", year: "numeric" })}</td>
      <td>${member.getAge()}</td>
      <td>${member.getJuniorSeniorStatus()}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function constructMember(memberdata) {
  const MemberObject = {
    id: memberdata.id,
    name: memberdata.firstName + " " + memberdata.lastName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,

    getAge() {
      const today = new Date();
      const ageInMilliseconds = today.getTime() - this.birthday.getTime();
      const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
      return ageInYears;
    },

    isJunior() {
      return this.getAge() <= 17;
    },

    isSenior() {
      return this.getAge() >= 18;
    },

    getJuniorSeniorStatus() {
      if (this.isJunior()) {
        return "Junior";
      } else {
        return "Senior";
      }
    },
  };

  Object.defineProperties(MemberObject, {
    name: { value: memberdata.firstName + " " + memberdata.lastName, enumerable: false },
    image: { value: memberdata.image, enumerable: false },
    id: { writable: false },
  });

  console.log(MemberObject.name);
  return MemberObject;
}

export default membersMain;
