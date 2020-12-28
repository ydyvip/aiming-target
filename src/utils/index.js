export function getQueryVariable(variable) {
  let search = decodeURIComponent(window.location.href);
  let url = new URL(search);
  if (url.searchParams.has(variable)) {
    return url.searchParams.get(variable);
  } else {
    return false;
  }
}
