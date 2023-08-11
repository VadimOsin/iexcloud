import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchStocks} from '../actions/stocksActions';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Button} from '@mui/material';
import styled from '@emotion/styled';

const StyledTable = styled(Table)`
  margin-top: 20px;
  width: 100%;
`;

const TableLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const StockTable = () => {
    const dispatch = useDispatch();
    const {stocks, loading, error, currentPage, totalPages} = useSelector((state) => state.stocks);

    React.useEffect(() => {
        dispatch(fetchStocks());
        dispatch(fetchStocks(currentPage));
    }, [dispatch, currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(fetchStocks(currentPage - 1));
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(fetchStocks(currentPage + 1));
        }
    };

    const handleDragEnd = (result) => {
        const {destination, source} = result;

        if (!destination) {
            return;
        }

        if (destination.index === source.index) {
            return;
        }

        const movedStock = stocks[source.index];
        const newStocks = Array.from(stocks);
        newStocks.splice(source.index, 1);
        newStocks.splice(destination.index, 0, movedStock);

        dispatch({type: 'FETCH_STOCKS_SUCCESS', payload: {stocks: newStocks, currentPage, totalPages}});
    };

    if (loading) {
        return (
            <TableLoader>
                <CircularProgress/>
            </TableLoader>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(typeof stocks);
    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="stocks">
                    {(provided, snapshot) => (
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>Latest Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                {Array.isArray(stocks) && stocks.map((stock, index) => (
                                    <Draggable key={stock.symbol} draggableId={stock.symbol} index={index}>
                                        {(provided) => (
                                            <TableRow
                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{stock.symbol}</TableCell>
                                                <TableCell>{stock?.quote?.companyName}</TableCell>
                                                <TableCell>{stock?.quote?.latestPrice}</TableCell>
                                            </TableRow>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </TableBody>
                        </StyledTable>
                    )}
                </Droppable>
            </DragDropContext>
            <div>
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </Button>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </>
    );
};

export default StockTable;