import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
    backgroundColor: "#f3f4f6",
    color: "#111827",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%", // カードの高さを揃える
    cursor: "pointer", // カーソルをクリック可能に
});

const GameCard = ({ game, onClick }) => {
    return (
        <StyledCard onClick={onClick}>
            <CardContent>
                <SportsBaseballIcon sx={{ fontSize: 40, color: "#3b82f6" }} />
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                >
                    {game.date} {game.time}
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                >
                    {game.prefecture} {game.place}
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                >
                    {game.price} 円
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                >
                    レベル: {game.level}
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: "10px" }}
                >
                    {game.comment}
                </Typography>
            </CardContent>
        </StyledCard>
    );
};

export default GameCard;
