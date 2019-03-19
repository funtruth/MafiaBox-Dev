export function pathToFirebase(string) {
    return string
        .replace(/\$/g, '½')
        .replace(/\./g, '¾')
}

export function valueToFirebase(string) {
    return JSON.parse(JSON.stringify(string)
        .replace(/\$/g, '½')
        .replace(/\./g, '¾')
    )
}

export function fromFirebase(string) {
    return string
        .replace(/½/g, '$')
        .replace(/¾/g, '.')
}