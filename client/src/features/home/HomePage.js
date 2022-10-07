import React from "react";
import {
  Box, Divider,
  Grid,
  List
} from "@mui/material";

import ReplayIcon from '@mui/icons-material/Replay';
import Replay30Icon from '@mui/icons-material/Replay30';
import {ListItemLink} from "../../utils/components/ListItemLink";
import {NewWordButton} from "../newword/NewWordButton";


export const HomePage = () => {
  return (
    <Box sx={{
      height: '100px'
    }}>
      <Grid>
        <List>
          <ListItemLink to={'/to-learn'} title={'To learn'} icon={<ReplayIcon fontSize={"large"}/>}/>
          <Divider/>
          <ListItemLink to={'/learned'} title={'Learned'} icon={<Replay30Icon fontSize={"large"}/>}/>
          <Divider/>
        </List>
      </Grid>
      <NewWordButton/>
    </Box>
  )
}