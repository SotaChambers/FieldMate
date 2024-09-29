import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Box } from "@mui/material";
import { withAuthenticator } from "@aws-amplify/ui-react";
import GameInfoTable from "./components/GameInfoTable";
import ApplyDialog from "./components/ApplyDialog";
import SelectUserDialog from "./components/SelectUserDialog";
import EditGameDialog from "./components/EditGameDialog";
import CommentSection from "./components/CommentSection";
import StatsCard from "./components/StatsCard";
import { baseUrl } from "./data/config";

const GameDetail = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gameDetail, setGameDetail] = useState(null);
    const [gameLogs, setGameLogs] = useState([]);
    const [applyLogs, setApplyLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openApplyDialog, setOpenApplyDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openSelectDialog, setOpenSelectDialog] = useState(false);
    const [buttonText, setButtonText] = useState("応募する");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [anyMatchFlagTrue, setAnyMatchFlagTrue] = useState(false);

    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/get_detail_game/${id}`
                );
                if (!response.ok)
                    throw new Error("データを取得できませんでした");
                const data = await response.json();
                setGameDetail(data.game);
                setGameLogs(data.game_log);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGameDetail();
    }, [id]);

    useEffect(() => {
        const fetchApplyLogs = async () => {
            try {
                const response = await fetch(`${baseUrl}/apply_game_logs`);
                if (!response.ok)
                    throw new Error("応募ログを取得できませんでした");

                const data = await response.json();
                const filteredLogs = data.filter(
                    (log) => log.game_id === gameDetail?.id
                );
                setApplyLogs(filteredLogs);

                // ログインユーザーが応募済みかを確認
                const userApplied = filteredLogs.some(
                    (log) => log.apply_user_id === user.userId
                );

                // 応募済みのユーザーがいる場合
                if (userApplied) {
                    setButtonText("応募済み");
                    setButtonDisabled(true);
                } else {
                    setButtonText("応募する");
                    setButtonDisabled(false);
                }

                // 応募ログに match_flag が true のエントリーがあるかチェック
                const hasAnyMatchFlagTrue = filteredLogs.some(
                    (log) => log.match_flag === true
                );
                setAnyMatchFlagTrue(hasAnyMatchFlagTrue);
            } catch (err) {
                console.error("応募ログ取得エラー:", err);
            }
        };

        if (gameDetail) {
            fetchApplyLogs();
        }
    }, [gameDetail, user.userId]);

    // 応募数と承認数を計算
    const applyCount = applyLogs.length;
    const matchCount = applyLogs.filter((log) => log.match_flag).length;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>募集情報詳細</h2>
            {gameDetail ? (
                <div>
                    <GameInfoTable gameDetail={gameDetail} />

                    {gameDetail.owner_id === user.userId ? (
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            marginBottom="20px"
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setOpenEditDialog(true)}
                                >
                                    編集
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setOpenSelectDialog(true)}
                                    disabled={anyMatchFlagTrue} // match_flagが1つでもTrueならボタンを無効化
                                >
                                    {anyMatchFlagTrue
                                        ? "決定済み"
                                        : "相手の選択"}{" "}
                                    {/* match_flagがTrueなら「決定済み」を表示 */}
                                </Button>
                            </Grid>
                        </Grid>
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            marginBottom="20px"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenApplyDialog(true)}
                                disabled={buttonDisabled}
                            >
                                {buttonText}
                            </Button>
                        </Box>
                    )}

                    <ApplyDialog
                        open={openApplyDialog}
                        onClose={() => setOpenApplyDialog(false)}
                        gameDetail={gameDetail}
                        user={user}
                        setButtonDisabled={setButtonDisabled}
                        setButtonText={setButtonText}
                    />

                    <EditGameDialog
                        open={openEditDialog}
                        onClose={() => setOpenEditDialog(false)}
                        gameDetail={gameDetail}
                        setGameDetail={setGameDetail}
                    />

                    <SelectUserDialog
                        open={openSelectDialog}
                        onClose={() => setOpenSelectDialog(false)}
                        applyLogs={applyLogs}
                    />

                    {/* StatsCardを追加 */}
                    <StatsCard
                        applyCount={applyCount}
                        matchCount={matchCount}
                    />

                    {/* コメントセクション */}
                    <CommentSection
                        gameLogs={gameLogs}
                        user={user}
                        gameId={gameDetail.id}
                        setGameLogs={setGameLogs}
                    />
                </div>
            ) : (
                <p>試合の詳細が見つかりませんでした。</p>
            )}
        </div>
    );
};

export default withAuthenticator(GameDetail);
