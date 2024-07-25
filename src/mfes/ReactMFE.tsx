import React, {useEffect, useRef} from 'react';
import {mountReactComponent} from "mfe_react/mountReactComponent";

function ReactMfe() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            mountReactComponent(containerRef.current);
        }
    }, []);
    return (
        <div ref={containerRef}>Loading React MFE...</div>
    );
}

export default ReactMfe;