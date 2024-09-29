import React from "react";
import { TextField, Grid } from "@mui/material";

const DateTimeField = ({ date, time, setDate, setTime }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    label="日にち"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="試合開始時間"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </Grid>
        </>
    );
};

export default DateTimeField;
