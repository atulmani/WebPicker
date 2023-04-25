import React from 'react';
import '../helper/index';

const Tile = (tile) => {
    //1. tile
    //2. tile#
    //3. position_#_#
    //4.row_from_#_to_#
    //5.col_from_#_to_#
    //6.isMoving
    //7.new
    //8.merged
    let classArray = ['tile'];
    classArray.push('tile' + tile.tile.value);
    if (!tile.tile.mergedInto) {
        classArray.push(`position_${tile.tile.row}_${tile.tile.column}`)
    }
    if (tile.tile.mergedInto) {
        classArray.push('merged');
    }
    if (tile.tile.isNew()) {
        classArray.push('new')
    }
    if (tile.tile.hasMoved()) {
        classArray.push(`row_from_${tile.tile.fromRow()}_to_${tile.tile.toRow()}`);
        classArray.push(`column_from_${tile.tile.fromColumn()}_to_${tile.tile.toColumn()}`);
        classArray.push('isMoving')
    }

    let classes = classArray.join(' ');
    return (
        <span className={classes}></span>
    )
}

export default Tile
