import { useRef, useEffect } from 'react'

/*used to autofocus an input
    this is a workaround for animating components, as <input autoFocus/> does not work

    function example() {
        const focusRef = useAutofocus()
        ...
        return (
            <input ref={focusRef}/>
        )
    }
*/
export default () => {
    const autofocus = useRef(null)

    useEffect(() => {
        if (!autofocus.current) return;
        const timer = setTimeout(() => {autofocus.current.focus()}, 100);
        return () => clearTimeout(timer)
    }, [autofocus])

    return autofocus
}