import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import GameCard from "./components/GameCard";
import { baseUrl } from "./data/config";

const Games = () => {
    const [gamesData, setGamesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGamesData = async () => {
            try {
                const response = await fetch(`${baseUrl}/games`);
                const data = await response.json();
                setGamesData(data);
            } catch (error) {
                console.error("データの取得に失敗しました:", error);
            }
        };

        fetchGamesData();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/game_detail/${id}`);
    };

    return (
        <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: "20px" }}
        >
            {gamesData.map((game) => (
                <Grid item xs={12} sm={6} md={4} key={game.id}>
                    <GameCard
                        game={game}
                        onClick={() => handleCardClick(game.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Games;
