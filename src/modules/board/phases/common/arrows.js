export function getPageKey(t) {
    if (t.classList.contains('srd-default-node')) return t.getAttribute("pagekey")
    else if (t.parentElement && t.parentElement.className) return getPageKey(t.parentElement) 
    else return ""
}