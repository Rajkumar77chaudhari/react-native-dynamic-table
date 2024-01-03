import React from "react";
interface TableProps {
    data: Record<string, any>[];
    headerColor?: string;
    onRowPress: (row: Record<string, any>) => void;
    heading: string;
    description: string;
}
declare const Table: React.FunctionComponent<TableProps>;
export default Table;
//# sourceMappingURL=Table.d.ts.map