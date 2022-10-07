import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';


export const WordAccordion = ({word, onMoveWordClick}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const definitionsRendered = word.definitions.map((definition, idx) => {
    const examplesRendered = definition.examples.map((example, idx) => (
      <React.Fragment key={idx}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <Typography sx={{display: 'list-item'}} variant="body1">
            {example}
          </Typography>
        </Grid>
      </React.Fragment>
    ));
    return (
      <React.Fragment key={word.id + idx}>
        <Typography variant="body2" color="text.secondary">{definition.definition}
        </Typography>
        {examplesRendered}
      </React.Fragment>
    )
  })


  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMore/>}
        aria-controls="panel1bh-content"
        id="panel1bh-header">
        <Stack>
          <Typography variant="h5" component="div">
            {word.title}&nbsp;
            <Typography variant="h5" color="text.secondary" component="a">
              /{word.transcription}/
            </Typography>
          </Typography>

          <Typography color="text.secondary" component="div">
            {word.part}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Divider/>
        <Grid container direction={'row'} justifyContent={'flex-end'}>
          <IconButton onClick={onMoveWordClick}>
            <TrendingFlatIcon/>
          </IconButton>
        </Grid>
        <Grid container>
          {definitionsRendered}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

WordAccordion.propTypes = {
  word: PropTypes.object,
  onMoveWordClick: PropTypes.func
}