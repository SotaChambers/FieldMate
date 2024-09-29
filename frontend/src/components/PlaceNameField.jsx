import React from "react";
import { TextField, Grid } from "@mui/material";

const PlaceNameField = ({ place, setPlace }) => {
    return (
        <Grid item xs={12}>
            <TextField
                label="グラウンド名"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                fullWidth
                required
            />
        </Grid>
    );
};

export default PlaceNameField;
