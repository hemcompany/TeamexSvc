import React from 'react';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from '@mui/material';

export default function TmxPagination({ apiRef }) {
    const page = apiRef.current.state.pagination.paginationModel.page;
    const pageCount = Math.ceil(apiRef.current.state.pagination.rowCount / apiRef.current.state.pagination.paginationModel.pageSize);
    const pageSize = apiRef.current.state.pagination.paginationModel.pageSize;

    const handlePageChange = (event, value) => {
        apiRef.current.setPage(value - 1);
    };

    const handlePageSizeChange = (event) => {
        apiRef.current.setPageSize(event.target.value);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="7px">
            <Typography variant="inherit">Rows per page: </Typography>
            <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                size="small"
                style={{ marginLeft: 16, border: 0 }} 
            >
                {[25, 50, 100].map((size) => (
                    <MenuItem key={size} value={size}>
                    {size}
                    </MenuItem>
                ))}
            </Select>
            <Pagination
                color="primary"
                count={pageCount}
                page={page + 1}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
            />
        </Box>
    );
}