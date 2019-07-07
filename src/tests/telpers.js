//return [1, 2, 3 ... n]
export function fillArrWithIncrInt(n) {
    var foo = [];

    if (!n) return foo;

    for (var i=0; i<n; i++) {
        foo.push(i);
    }
    
    return foo
}

export function majority(n) {
    return (n - n%2)/2 + 1
}