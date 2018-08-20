import React, {Component} from 'react';
import dragDecoratorWrapper from '../common/decorators/DragDecorator';

/**
 * Default row renderer for Table.
 */
class TableRow extends Component {
    render(){
        const {
          className,
          columns,
          style,
        } = this.props;
        const a11yProps = this.getEventsActions();
        return (
          <div
            {...a11yProps}
            className={className}
            role="row"
            style={style}>
            {columns}
          </div>
        );
    }

    getEventsActions = () => {
        const {
          className,
          columns,
          index,
          onRowClick,
          onRowDoubleClick,
          onRowMouseOut,
          onRowMouseOver,
          onRowRightClick,
          rowData,
          style,
        } = this.props;
        const a11yProps = {};

        if (
          onRowClick ||
          onRowDoubleClick ||
          onRowMouseOut ||
          onRowMouseOver ||
          onRowRightClick
        ) {
          a11yProps['aria-label'] = 'row';
          a11yProps.tabIndex = 0;

          if (onRowClick) {
            a11yProps.onClick = event => onRowClick({event, index, rowData});
          }
          if (onRowDoubleClick) {
            a11yProps.onDoubleClick = event =>
              onRowDoubleClick({event, index, rowData});
          }
          if (onRowMouseOut) {
            a11yProps.onMouseOut = event => onRowMouseOut({event, index, rowData});
          }
          if (onRowMouseOver) {
            a11yProps.onMouseOver = event => onRowMouseOver({event, index, rowData});
          }
          if (onRowRightClick) {
            a11yProps.onContextMenu = event =>
              onRowRightClick({event, index, rowData});
          }
        }
        return a11yProps;
    }
}

export const type = 'eventRow';

const spec = {
  beginDrag(props) {
    console.log('beginDrag TableRow', props);
    return {
    }
  },
  endDrag(props, monitor) {
    const dropRes = monitor.getDropResult()
    console.log('---', 'TableRow', dropRes)
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default dragDecoratorWrapper(TableRow, {type, spec, collect});
