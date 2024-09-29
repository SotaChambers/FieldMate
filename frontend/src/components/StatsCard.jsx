import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const StatsCard = ({ applyCount, matchCount }) => {
    return (
        <Grid container spacing={2} justifyContent="center" marginBottom="20px">
            <Grid item>
                <Card
                    sx={{
                        minWidth: 200,
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <CardContent>
                        <Typography variant="h8" component="div">
                            応募数
                        </Typography>
                        <Typography variant="h6" color="primary">
                            {applyCount}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card
                    sx={{
                        minWidth: 200,
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <CardContent>
                        <Typography variant="h8" component="div">
                            承認数
                        </Typography>
                        <Typography variant="h6" color="primary">
                            {matchCount}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default StatsCard;
