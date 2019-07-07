//start at m, fill incrementally until there are n items
//return [m, m + 1, m + 2 ..., n - 1, n]
export function fillArrWithIncrInt(n, m = 0) {
    var foo = [];

    if (!n) return foo;

    for (var i=m; i<n+m; i++) {
        foo.push(i);
    }
    
    return foo
}

export function majority(n) {return (n - n%2)/2 + 1}