import * as React from 'react';

const useResizeObserver = (ref: React.RefObject<Element>) => {

    const [dimensions, setDimensions] = React.useState<DOMRectReadOnly>();

    React.useEffect(() => {
        if (ref.current) {
            const observe = ref.current;
            const resizeObserver = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    setDimensions(entry.contentRect)
                });
            });
            resizeObserver.observe(observe);

            return () => {
                resizeObserver.unobserve(observe);
            }
        }

    }, [ref])

    return dimensions;
}

export default useResizeObserver;