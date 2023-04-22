import {
  Box,
  Grid,
  InputAdornment,
  OutlinedInput,
  Slider,
  Typography,
} from "@mui/material"
import * as React from "react"

export default function InputSlider() {
  const minValue = 100;
  const maxValue = 1000;
  const [value, setValue] = React.useState<number>(100);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Choose quantity:
      </Typography>
      <Grid container spacing={2} alignItems="center" px={2}>
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleSliderChange}
            min={minValue}
            max={maxValue}
            step={100}
          />
        </Grid>
        <Grid item>
          <OutlinedInput
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={
              {
                // step: 10,
                // min: 0,
                // max: 100,
                // type: "number",
              }
            }
            sx={{ width: 112 }}
            endAdornment={<InputAdornment position="end">items</InputAdornment>}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
