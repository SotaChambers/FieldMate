import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Card,
    Typography,
    Avatar,
} from "@mui/material";
import { baseUrl } from "../data/config";

const CommentSection = ({ gameLogs, user, gameId, setGameLogs }) => {
    const [newComment, setNewComment] = useState("");
    const [posting, setPosting] = useState(false);

    const handleCommentSubmit = async () => {
        if (newComment.trim() === "") return;
        setPosting(true);

        try {
            const response = await fetch(`${baseUrl}/submit_game_comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    game_id: gameId,
                    user_id: user.userId,
                    comment: newComment,
                }),
            });

            if (!response.ok) {
                throw new Error("コメントの送信に失敗しました");
            }

            const newLog = await response.json();
            setGameLogs([...gameLogs, newLog.data]);
            setNewComment("");
        } catch (error) {
            console.error("コメント送信エラー:", error);
        } finally {
            setPosting(false);
        }
    };

    return (
        <div>
            <h2>コメント</h2>
            <div
                style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    padding: "10px",
                }}
            >
                {gameLogs.length > 0 ? (
                    gameLogs
                        .sort(
                            (a, b) => new Date(a.post_at) - new Date(b.post_at)
                        )
                        .map((log) => (
                            <Box
                                key={log.id}
                                display="flex"
                                flexDirection="row"
                                alignItems="flex-start"
                                marginBottom="10px"
                            >
                                {/* ログインユーザーでない場合のみアイコンを表示 */}
                                {log.user_id !== user.userId &&
                                    log.username && (
                                        <Avatar
                                            alt={log.username}
                                            style={{ marginRight: "10px" }}
                                        >
                                            {log.username[0]}
                                        </Avatar>
                                    )}

                                <Card
                                    style={{
                                        backgroundColor: "#f1f3f5",
                                        maxWidth: "80%",
                                        padding: "10px",
                                        marginLeft:
                                            log.user_id === user.userId
                                                ? "auto"
                                                : "0",
                                        marginRight:
                                            log.user_id === user.userId
                                                ? "0"
                                                : "auto",
                                    }}
                                >
                                    {/* Usernameを表示（右寄せ・左寄せ） */}
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        align={
                                            log.user_id === user.userId
                                                ? "right"
                                                : "left"
                                        }
                                    >
                                        {log.user_id === user.userId
                                            ? "あなた"
                                            : log.username || "名無し"}
                                    </Typography>

                                    {/* コメント本文 */}
                                    <Typography
                                        variant="body1"
                                        style={{ textAlign: "left" }} // メッセージは常に左寄せ
                                    >
                                        {log.comment}
                                    </Typography>

                                    {/* 投稿日時 */}
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        align={
                                            log.user_id === user.userId
                                                ? "right"
                                                : "left"
                                        }
                                    >
                                        {log.post_at}
                                    </Typography>
                                </Card>
                            </Box>
                        ))
                ) : (
                    <p>コメントはありません。</p>
                )}
            </div>

            {/* コメント入力フィールドと送信ボタン */}
            <Box display="flex" flexDirection="column" marginTop="20px">
                <TextField
                    label="コメントを入力"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={posting}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    style={{ marginTop: "10px" }}
                    disabled={posting || newComment.trim() === ""}
                >
                    {posting ? "送信中..." : "送信"}
                </Button>
            </Box>
        </div>
    );
};

export default CommentSection;
