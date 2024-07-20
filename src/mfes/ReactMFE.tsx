import React, {useEffect, useRef} from 'react';
import ReactDOM from "react-dom/client";

function ReactMfe() {
    const containerRef = useRef(null);

    useEffect(() => {
        import('mfe-react/mountReactComponent').then(res => {
            res.mountReactComponent(containerRef.current!);
        }).catch(() =>{
            ReactDOM.createRoot(containerRef.current!).render(<div>Error</div>)
        })
    }, []);
    return (
        <div ref={containerRef}>Loading</div>
    );
}

export default ReactMfe;