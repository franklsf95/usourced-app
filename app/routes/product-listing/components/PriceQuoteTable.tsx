import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

export type PricingTier = {
  minimumQuantity: number;
  pricePerItem: number;
};

export const PRICING_TIERS = [
  {
    minimumQuantity: 500,
    pricePerItem: 3,
  },
  {
    minimumQuantity: 300,
    pricePerItem: 3.5,
  },
  {
    minimumQuantity: 200,
    pricePerItem: 4,
  },
  {
    minimumQuantity: 100,
    pricePerItem: 5,
  },
];

export function getPricePerItem(
  quantity: number,
  pricingTiers: PricingTier[],
): number {
  const tier = pricingTiers.find((tier) => quantity >= tier.minimumQuantity);
  return tier
    ? tier.pricePerItem
    : pricingTiers[pricingTiers.length - 1].pricePerItem;
}

function createData() {
  return Array.from(Array(5), (_, i) => {
    const quantity = (i + 1) * 100;
    return {
      name: quantity,
      standard_shipping_unit_price: getPricePerItem(quantity, PRICING_TIERS),
      express_shipping_unit_price: getPricePerItem(quantity, PRICING_TIERS) + 5,
    };
  });
}

export function PricingTable() {
  const rows = createData();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Price (Standard)</TableCell>
            <TableCell>Unit Price (Express)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}{i == rows.length - 1 ? "+" : ""}
              </TableCell>
              <TableCell>
                ${row.standard_shipping_unit_price.toFixed(2)}
              </TableCell>
              <TableCell>
                ${row.express_shipping_unit_price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
