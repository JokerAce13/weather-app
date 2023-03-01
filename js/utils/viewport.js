export function getViewport() {
    return window.innerHeight
}

export function setViewport($element) {
    const viewportBlockSize = getViewport()
    $element.style.blockSize = `${viewportBlockSize}px`
}

export function onViewportResize(callback){
    window.addEventListener('resize', callback)
}

export function offViewportResize(callback){
    window.removeEventListener('resize', callback)
}

export function viewportSize($element){
    setViewport($element)
    onViewportResize(() => setViewport($element))
}