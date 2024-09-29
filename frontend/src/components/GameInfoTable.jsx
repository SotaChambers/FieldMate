import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const GameInfoTable = ({ gameDetail }) => {
    return (
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table aria-label="game details table">
                <TableHead>
                    <TableRow>
                        <TableCell>項目</TableCell>
                        <TableCell>詳細</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>{gameDetail.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>投稿者</TableCell>
                        <TableCell>{gameDetail.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>日付</TableCell>
                        <TableCell>{gameDetail.date}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>開始時間</TableCell>
                        <TableCell>{gameDetail.time}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>都道府県</TableCell>
                        <TableCell>{gameDetail.prefecture}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>場所</TableCell>
                        <TableCell>{gameDetail.place}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>料金</TableCell>
                        <TableCell>{gameDetail.price}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>レベル</TableCell>
                        <TableCell>{gameDetail.level}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>詳細</TableCell>
                        <TableCell>{gameDetail.comment}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GameInfoTable;
