import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { prefectures } from "../data/prefectures";
import { baseUrl } from "../data/config";

const EditGameDialog = ({ open, onClose, gameDetail, setGameDetail }) => {
    const [editDetail, setEditDetail] = useState({ ...gameDetail });
    const [priceError, setPriceError] = useState("");

    const handleFieldChange = (field) => (e) => {
        setEditDetail({ ...editDetail, [field]: e.target.value });
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (!/^\d+$/.test(value)) {
            setPriceError("料金は整数で入力してください");
        } else {
            setPriceError("");
            setEditDetail((prevDetail) => ({ ...prevDetail, price: value }));
        }
    };

    const handleEditSubmit = async () => {
        try {
            const response = await fetch(`${baseUrl}/update_game`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editDetail),
            });

            if (!response.ok) {
                throw new Error("更新に失敗しました");
            }

            setGameDetail(editDetail);
            onClose();
            alert("更新が成功しました");
        } catch (error) {
            console.error("更新エラー:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
            <DialogTitle>募集情報を編集</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <TextField
                        label="日にち"
                        type="date"
                        value={editDetail.date || ""}
                        onChange={handleFieldChange("date")}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="試合開始時間"
                        type="time"
                        value={editDetail.time || ""}
                        onChange={handleFieldChange("time")}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel>場所（都道府県）</InputLabel>
                        <Select
                            value={editDetail.prefecture || ""}
                            onChange={handleFieldChange("prefecture")}
                        >
                            {prefectures.map((pref, index) => (
                                <MenuItem key={index} value={pref}>
                                    {pref}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <TextField
                        label="グラウンド名"
                        value={editDetail.place || ""}
                        onChange={handleFieldChange("place")}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="料金（折半料金ではなく合計料金）"
                        value={editDetail.price || ""}
                        onChange={handlePriceChange}
                        fullWidth
                        error={!!priceError}
                        helperText={priceError}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="詳細"
                        multiline
                        rows={4}
                        value={editDetail.comment || ""}
                        onChange={handleFieldChange("comment")}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    キャンセル
                </Button>
                <Button onClick={handleEditSubmit} color="primary">
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditGameDialog;
