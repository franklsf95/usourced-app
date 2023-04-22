import { ButtonBase, ButtonBaseProps, Stack } from "@mui/material";
import * as React from "react";

export type Color = string;

export type ColorButtonProps = ButtonBaseProps & {
  color: Color;
  size?: number;
  selected?: boolean;
};

export function ColorButton({
  color,
  size = 24,
  selected = false,
  ...other
}: ColorButtonProps): JSX.Element {
  const defaultBorder = "1px solid #999999";
  const highlightedBorder = "1px solid #333333";
  const selectedBorder = "2px solid #333333";
  return (
    <ButtonBase
      focusRipple
      sx={{
        width: size,
        height: size,
        border: selected ? selectedBorder : defaultBorder,
        borderRadius: "50%",
        backgroundColor: color,
        cursor: "pointer",
        "&:hover": {
          border: selected ? selectedBorder : highlightedBorder,
        },
      }}
      {...other}
    />
  );
}

export type ColorSelectorProps = {
  colors: Color[];
  onSelect?: (color: Color) => void;
};

export function ColorSelector({
  colors,
  onSelect,
}: ColorSelectorProps): JSX.Element {
  const [selectedColor, setSelectedColor] = React.useState<Color | null>(null);
  return (
    <Stack direction="row" spacing={1}>
      {colors.map((color) => (
        <ColorButton
          key={color}
          color={color}
          selected={color === selectedColor}
          onClick={() => {
            setSelectedColor(color);
            onSelect?.(color);
          }}
        />
      ))}
    </Stack>
  );
}
