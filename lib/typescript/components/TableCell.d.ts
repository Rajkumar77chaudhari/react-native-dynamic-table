import React from 'react';
interface CellProps {
    title: string | number | undefined | null;
    isHeader?: boolean;
    width: number;
    headerColor?: string;
    handlePanResponderMove?: (_: any, gestureState: any) => void;
}
declare const Cell: React.FunctionComponent<CellProps>;
export default Cell;
//# sourceMappingURL=TableCell.d.ts.map