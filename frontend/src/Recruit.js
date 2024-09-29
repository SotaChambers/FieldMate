import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Box, Typography } from "@mui/material";
import DateTimeField from "./components/DateTimeField";
import PlaceField from "./components/PlaceField";
import PriceField from "./components/PriceField";
import LevelField from "./components/LevelField";
import CommentField from "./components/CommentField";
import PlaceNameField from "./components/PlaceNameField";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { baseUrl } from "./data/config";

const Recruit = ({ user }) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [prefecture, setPrefecture] = useState("");
    const [place, setPlace] = useState(""); // グラウンド名
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState("");
    const [level, setLevel] = useState("");
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (!/^\d+$/.test(value)) {
            setPriceError("料金は整数で入力してください");
        } else {
            setPriceError("");
        }
        setPrice(value);
    };

    const handleSubmit = () => {
        if (!date || !time || !prefecture || !place || !price || !level) {
            alert("全ての必須項目を入力してください。");
            return;
        }
        if (priceError) {
            alert("料金にエラーがあります。修正してください。");
            return;
        }

        const formData = {
            owner_id: user.userId,
            date,
            time,
            prefecture,
            place,
            price,
            level,
            comment,
        };

        fetch(`${baseUrl}/recruit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                navigate("/games");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
            <Typography variant="h4" gutterBottom align="center">
                新規募集作成
            </Typography>
            <Grid container spacing={2}>
                <DateTimeField
                    date={date}
                    time={time}
                    setDate={setDate}
                    setTime={setTime}
                />
                <PlaceField
                    prefecture={prefecture}
                    setPrefecture={setPrefecture}
                />
                <PlaceNameField place={place} setPlace={setPlace} />{" "}
                {/* グラウンド名コンポーネント */}
                <PriceField
                    price={price}
                    setPrice={setPrice}
                    priceError={priceError}
                    handlePriceChange={handlePriceChange}
                />
                <LevelField level={level} setLevel={setLevel} />
                <CommentField comment={comment} setComment={setComment} />
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        送信
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default withAuthenticator(Recruit);
