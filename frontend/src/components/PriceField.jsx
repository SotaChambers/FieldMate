import React from "react";
import { TextField, Grid } from "@mui/material";

const PriceField = ({ price, setPrice, priceError, handlePriceChange }) => {
    return (
        <Grid item xs={12}>
            <TextField
                label="料金（折半料金ではなく合計料金）"
                value={price}
                onChange={handlePriceChange}
                fullWidth
                error={!!priceError} // エラーがある場合の表示
                helperText={priceError} // エラーメッセージ表示
            />
        </Grid>
    );
};

export default PriceField;
