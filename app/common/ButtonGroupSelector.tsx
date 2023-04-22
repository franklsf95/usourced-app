import { Button, Stack } from "@mui/material";
import * as React from "react";

export type ButtonGroupSelectorChoice = {
  label: string;
  value: string;
};

export type ButtonGroupSelectorProps = {
  choices: ButtonGroupSelectorChoice[];
  onSelect?: (value: string) => void;
};

export function ButtonGroupSelector({
  choices,
  onSelect,
}: ButtonGroupSelectorProps): JSX.Element {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  return (
    <Stack direction="row" spacing={1}>
      {choices.map((choice) => (
        <Button
          key={choice.value}
          variant={choice.value === selectedValue ? "contained" : "outlined"}
          onClick={() => {
            setSelectedValue(choice.value);
            onSelect?.(choice.value);
          }}
          sx={{ borderRadius: 4 }}
        >
          {choice.label}
        </Button>
      ))}
    </Stack>
  );
}
