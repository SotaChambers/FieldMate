import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { baseUrl } from "../data/config";

const SelectUserDialog = ({ open, onClose, applyLogs }) => {
    const [selectedUser, setSelectedUser] = useState("");

    const handleUserSelect = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleApproveGame = async () => {
        try {
            const selectedLog = applyLogs.find(
                (log) => log.username === selectedUser
            );
            if (!selectedLog) throw new Error("ユーザーが見つかりません");

            const response = await fetch(`${baseUrl}/approve_game`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apply_user_id: selectedLog.apply_user_id,
                }),
            });

            if (!response.ok) {
                throw new Error("承認に失敗しました");
            }

            alert("承認しました");
            onClose();
        } catch (error) {
            console.error("承認エラー:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
            <DialogTitle>相手の選択</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>ユーザー</InputLabel>
                    <Select value={selectedUser} onChange={handleUserSelect}>
                        {applyLogs.map((log, index) => (
                            <MenuItem key={index} value={log.username}>
                                {log.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>キャンセル</Button>
                <Button
                    onClick={handleApproveGame}
                    color="primary"
                    disabled={!selectedUser}
                >
                    承認する
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SelectUserDialog;
