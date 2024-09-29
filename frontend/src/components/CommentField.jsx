import React from "react";
import { TextField, Grid } from "@mui/material";

const CommentField = ({ comment, setComment }) => {
    return (
        <Grid item xs={12}>
            <TextField
                label="詳細"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                rows={4}
                fullWidth
            />
        </Grid>
    );
};

export default CommentField;
