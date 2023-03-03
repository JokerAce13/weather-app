const defaultConfig = {
    open: true,
    debug: true,
    animatable: true
}

export default function draggable($element, config = defaultConfig) {
    if(!($element instanceof HTMLElement)){
        return console.warn(`Elemento invalido, se esperaba un HTMLElement y se recibio ${$element}`)
    }

    let isOpen = config.open
    let isDragging = false
    let startY = 0

    const elementRect = $element.getBoundingClientRect()
    const ELEMENT_BLOCK_SIZE = elementRect.height

    const $marker = $element.querySelector('[data-marker]')
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height

    const VISIBLE_Y_POSITION = 0
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
    let widgetPosition = VISIBLE_Y_POSITION

    isOpen ? openWidget() : closeWidget()

    $marker.addEventListener('click', handleClick)
    $marker.addEventListener('pointerdown', handlePointerDown)
    $marker.addEventListener('pointerup', handlePointerUp)
    $marker.addEventListener('pointerout', handlePointerOut)
    $marker.addEventListener('pointercancel', handlePointerCancel)
    $marker.addEventListener('pointermove', handlePointerMove)

    if (config.animatable) {
        setAnimations()
    }

    function setAnimations(){
        $element.style.transition = 'margin-bottom .3s'
    }

    function bounce(){
        if(widgetPosition < ELEMENT_BLOCK_SIZE / 2){
            return openWidget()
        }
        return closeWidget()
    }

    function dragEnd(){
        isDragging = false
        bounce()
    }

    function pageY(event){
        return event.pageY || event.touches[0].pageY
    }

    function startDrag(event){
        isDragging = true
        startY = pageY(event)
    }

    function handlePointerDown(event){
        logger('PointerDown')
        startDrag(event)
    }

    function handlePointerUp(){
        logger('PointerUp')
        dragEnd()
    }

    function handlePointerOut(){
        logger('PointerOut')
    }

    function handlePointerCancel(){
        logger('PointerCancel')
    }

    function handlePointerMove(event){
        logger('PointerMove')
        drag(event)
    }

    function handleClick(event){
        logger('Click')
        toggle()
    }

    function toggle(){
        if(!isDragging){
            if(!isOpen) {
                return openWidget()
            }
            return closeWidget()
        }
    }

    function logger(message) {
        if (config.debug) {
            console.info(message)
        }
    }

    function openWidget(){
        logger('Abrir Widget')
        isOpen = true;
        widgetPosition = VISIBLE_Y_POSITION
        setWidgetPosition(widgetPosition)
    }

    function closeWidget(){
        logger('Cerrar Widget')
        isOpen = false;
        widgetPosition = HIDDEN_Y_POSITION
        setWidgetPosition(widgetPosition)
    }

    function setWidgetPosition(value){
        $element.style.marginBottom = `-${value}px`
    }

    function drag(event){
        const cursorY = pageY(event)
        const movementY = cursorY - startY
        widgetPosition = widgetPosition + movementY
        startY = cursorY
        if (widgetPosition > HIDDEN_Y_POSITION) {
            return false
        }
        setWidgetPosition(widgetPosition)
    }
}