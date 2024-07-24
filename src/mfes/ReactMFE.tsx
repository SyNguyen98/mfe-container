import React, {useEffect, useRef} from 'react';
import ReactDOM from "react-dom/client";

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