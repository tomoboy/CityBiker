import React from 'react';
import CollectiveStop from './CollectiveStop';

function CollectiveStops({stops}) {
    return stops.map((stop, index) =>
            <CollectiveStop
                key={'Collective' + index}
                stop={stop}
            />
    )
}

export default CollectiveStops;