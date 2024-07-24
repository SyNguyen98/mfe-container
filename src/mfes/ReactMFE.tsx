import React, {useEffect, useRef} from 'react';
import {mountReactComponent} from "mfe_react/mountReactComponent";

function ReactMfe() {
    const containerRef = useRef(null);

    useEffect(() => {
        mountReactComponent(containerRef.current!);
    }, []);
    return (
        <div ref={containerRef}>Loading</div>
    );
}

export default ReactMfe;