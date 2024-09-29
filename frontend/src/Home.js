import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import GameCard from "./components/GameCard";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { baseUrl } from "./data/config";

const Home = ({ user }) => {
    const [postedGames, setPostedGames] = useState([]);
    const [commentedGames, setCommentedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ルーティング用のフック

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`${baseUrl}/games`);
                if (!response.ok)
                    throw new Error("データを取得できませんでした");
                const gamesData = await response.json();

                const userPostedGames = gamesData.filter(
                    (game) => game.owner_id === user.userId
                );
                setPostedGames(userPostedGames);

                const responseLogs = await fetch(`${baseUrl}/game_logs`);
                if (!responseLogs.ok)
                    throw new Error("コメントデータを取得できませんでした");
                const logsData = await responseLogs.json();

                const userCommentedGames = logsData
                    .filter((log) => log.user_id === user.userId)
                    .map((log) =>
                        gamesData.find(
                            (game) => game.id === log.game_recruit_id
                        )
                    );

                const uniqueCommentedGames = Array.from(
                    new Set(userCommentedGames.map((game) => game.id))
                ).map((id) =>
                    userCommentedGames.find((game) => game.id === id)
                );

                setCommentedGames(uniqueCommentedGames);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGames();
    }, [user.userId]);

    const handleCardClick = (id) => {
        navigate(`/game_detail/${id}`); // カードクリックで詳細ページに遷移
    };

    if (loading) return <CircularProgress />;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                投稿した試合
            </Typography>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                style={{ marginTop: "20px" }}
            >
                {postedGames.length > 0 ? (
                    postedGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} key={game.id}>
                            <GameCard
                                game={game}
                                onClick={() => handleCardClick(game.id)} // クリックハンドラー追加
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography>投稿した試合はありません。</Typography>
                )}
            </Grid>

            <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
                コメントした試合
            </Typography>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                style={{ marginTop: "20px" }}
            >
                {commentedGames.length > 0 ? (
                    commentedGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} key={game.id}>
                            <GameCard
                                game={game}
                                onClick={() => handleCardClick(game.id)} // クリックハンドラー追加
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography>コメントした試合はありません。</Typography>
                )}
            </Grid>
        </div>
    );
};

export default withAuthenticator(Home);
