import React from "react";
import Grid from "@material-ui/core/Grid";
import MiddlePage from "./components/middle-page";
import ComposedTextField from "./components/top-page";
import BottomPage from "./components/bottom-page";
import Container from "@material-ui/core/Container";
import { AppProvider } from "./Context";
import { AppSubProvider } from "./SubContext";

export default function App() {
  return (
    <AppProvider>
      <AppSubProvider>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ margin: "8vh 0 20vh 0" }}
          >
            <Grid item lg>
              <ComposedTextField />
            </Grid>
          </Grid>
          <Container>
            <Grid container spacing={3}>
              <Grid item lg>
                <MiddlePage />
              </Grid>
              <Grid item xs={6}>
                <BottomPage />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </AppSubProvider>
    </AppProvider>
  );
}
