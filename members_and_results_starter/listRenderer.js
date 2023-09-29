function construct(list, container, itemRenderer) {
  const listRenderer = {
    render() {
      const table = document.querySelector("#members tbody");
      table.innerHTML = "";
      for (const member of list) {
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
    },
  };
  return listRenderer;
}

export { construct };
