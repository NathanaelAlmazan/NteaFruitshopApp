import React from 'react';

const useLongPress = (
    onLongPress: () => void,
    onClick: () => void,
    { shouldPreventDefault = true, delay = 300 } = {}
    ) => {
    const [longPressTriggered, setLongPressTriggered] = React.useState(false);
    const timeout = React.useRef<NodeJS.Timeout>();
    const target = React.useRef<EventTarget>();

    const start = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
            if (shouldPreventDefault && event.target) {
                    event.target.addEventListener("touchend", preventDefault, {
                    passive: false
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress();
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>, shouldTriggerClick = true) => {
            timeout.current && clearTimeout(timeout.current);
            shouldTriggerClick && !longPressTriggered && onClick();
            setLongPressTriggered(false);
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener("touchend", preventDefault);
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => start(e),
        onTouchStart: (e: React.TouchEvent<HTMLButtonElement>) => start(e),
        onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => clear(e),
        onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => clear(e, false),
        onTouchEnd: (e: React.TouchEvent<HTMLButtonElement>) => clear(e)
    };
};

const isTouchEvent = (event: Event) => {
    return "touches" in event;
};

const preventDefault = (event: Event) => {
    if (!isTouchEvent(event)) return;

    if (event.preventDefault) {
        event.preventDefault();
    }
};

export default useLongPress;