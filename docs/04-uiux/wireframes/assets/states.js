// Wireframe state switcher. Reads ?state=, ?role=, and ?notes=0 from the URL.
// data-show="a b"  → element is visible only in states a or b
// data-hide="a b"  → element is hidden in states a or b
// data-role="staff admin" → element is visible only for those roles
(function () {
  var params = new URLSearchParams(location.search);
  var state = params.get("state") || "default";
  var role = params.get("role") || document.body.getAttribute("data-default-role") || "";
  var has = function (list, value) { return list.split(/\s+/).indexOf(value) !== -1; };

  document.body.setAttribute("data-state", state);
  if (role) document.body.setAttribute("data-role", role);
  if (params.get("notes") === "0") document.body.classList.add("no-notes");
  if (params.get("shot") === "1") document.body.classList.add("shot");

  document.querySelectorAll("[data-show]").forEach(function (el) {
    el.hidden = !has(el.getAttribute("data-show"), state);
  });
  document.querySelectorAll("[data-hide]").forEach(function (el) {
    if (has(el.getAttribute("data-hide"), state)) el.hidden = true;
  });
  document.querySelectorAll("[data-role]").forEach(function (el) {
    if (role && !has(el.getAttribute("data-role"), role)) el.hidden = true;
  });

  document.querySelectorAll(".wf-roles a").forEach(function (a) {
    var url = new URL(a.getAttribute("href"), location.href);
    if (url.searchParams.get("role") === role) a.setAttribute("aria-current", "true");
    if (state !== "default") url.searchParams.set("state", state);
    a.setAttribute("href", url.pathname.split("/").pop() + url.search);
  });

  document.querySelectorAll(".wf-states a").forEach(function (a) {
    var url = new URL(a.getAttribute("href"), location.href);
    if ((url.searchParams.get("state") || "default") === state) a.setAttribute("aria-current", "true");
    if (role && !url.searchParams.has("role")) {
      url.searchParams.set("role", role);
      a.setAttribute("href", url.pathname.split("/").pop() + url.search);
    }
  });
})();
