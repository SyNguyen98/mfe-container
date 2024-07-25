import React from "react";
import {mountVueComponent} from "mfe_vue/mountVueComponent";

const VueMFE = () => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        mountVueComponent(ref.current!);
    }, []);

    return <div ref={ref}>Loading Vue MFE...</div>;
};

export default VueMFE;