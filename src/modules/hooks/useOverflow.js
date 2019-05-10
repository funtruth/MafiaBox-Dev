import { useRef, useState, useEffect } from 'react'

/*
ISSUES: needs to be re-mounted if text changes.
DESCRIPTION: used to check if a text-ellipsis element is overflowed
    function example() {
        const [overflowRef, overflowed] = useOverflow(null)
        ...
        return (
            <div
                ref={overflowRef}
                style={{
                    float: overflowed ? 'none' : 'left', 
                }}
            />
        )
    }
*/
export default () => {
    const target = useRef(null)

    const [overflowed, setOverflowed] = useState(true)

    const compare = (t) => {
        if (!t) return;
        if (t.classList.contains('text-ellipsis')) {
            if (t.scrollWidth > t.clientWidth) setOverflowed(true)
            else setOverflowed(false)
        } else {
            compare(t.lastChild)
        }
    }

    useEffect(() => {
        compare(target.current)
    }, [target])

    return [target, overflowed]
}