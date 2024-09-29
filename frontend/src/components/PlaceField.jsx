import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { prefectures } from "../data/prefectures";

const PlaceField = ({ prefecture, setPrefecture }) => {
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>場所（都道府県）</InputLabel>
                <Select
                    value={prefecture}
                    onChange={(e) => setPrefecture(e.target.value)}
                    label="場所（都道府県）"
                >
                    {prefectures.map((pref, index) => (
                        <MenuItem key={index} value={pref}>
                            {pref}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default PlaceField;
