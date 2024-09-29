import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
} from "@mui/material";
import { levels } from "../data/levels";

const LevelField = ({ level, setLevel }) => {
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>レベル</InputLabel>
                <Select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    label="レベル"
                >
                    {levels.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                            レベル{level.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="body2" sx={{ mt: 1 }}>
                {levels.find((lvl) => lvl.value === level)?.label ||
                    "レベルを選択してください"}
            </Typography>
        </Grid>
    );
};

export default LevelField;
