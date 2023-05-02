import { Grid, InputAdornment, OutlinedInput, Slider } from "@mui/material";
import * as React from "react";

export function InputSlider({
  onChange,
  minValue,
  maxValue,
  initialValue,
  step,
}: {
  onChange: (value: number) => void;
  minValue: number;
  maxValue: number;
  initialValue?: number;
  step?: number;
}) {
  const [value, setValue] = React.useState<number>(initialValue ?? minValue);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      handleValueChange(newValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < minValue) {
      handleValueChange(minValue);
    } else if (value > maxValue) {
      handleValueChange(maxValue);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" px={2}>
      <Grid item xs>
        <Slider
          value={value}
          onChange={handleSliderChange}
          min={minValue}
          max={maxValue}
          step={step ?? minValue}
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
          sx={{ width: 120 }}
          endAdornment={<InputAdornment position="end">items</InputAdornment>}
        />
      </Grid>
    </Grid>
  );
}
