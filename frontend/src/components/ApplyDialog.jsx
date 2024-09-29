import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";
import { baseUrl } from "../data/config";

const ApplyDialog = ({
    open,
    onClose,
    gameDetail,
    user,
    setButtonDisabled,
    setButtonText,
}) => {
    const [loading, setLoading] = useState(false); // ローディング状態の管理

    const handleApplyGame = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/apply_game`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    game_id: gameDetail.id,
                    user_id: user.userId,
                }),
            });

            if (!response.ok) {
                throw new Error("応募に失敗しました");
            }

            const data = await response.json();

            // レスポンスデータの確認
            if (!data || !data.apply_logs) {
                throw new Error("応募ログが存在しません。");
            }

            // レスポンスから match_flag の状態をチェック
            const hasAnyMatchFlagTrue = data.apply_logs.some(
                (log) => log.match_flag === true
            );

            if (hasAnyMatchFlagTrue) {
                // 1つでも match_flag が true の場合は「応募済み」
                setButtonText("応募済み");
                setButtonDisabled(true);
            } else {
                // 全て match_flag が false の場合は「応募する」
                setButtonText("応募する");
                setButtonDisabled(false);
            }

            onClose();
            alert("応募処理が完了しました！");
        } catch (error) {
            console.error("応募エラー:", error);
            alert(error.message); // エラーメッセージをアラートで表示
        } finally {
            setLoading(false); // 処理が完了したらローディング状態を解除
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>応募確認</DialogTitle>
            <DialogContent>
                <DialogContentText>この試合に応募しますか？</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" disabled={loading}>
                    キャンセル
                </Button>
                <Button
                    onClick={handleApplyGame}
                    color="primary"
                    disabled={loading}
                >
                    {loading ? "処理中..." : "応募する"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ApplyDialog;
