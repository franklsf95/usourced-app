import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export type PricingTier = {
  quantity: number;
  pricePerItem: number;
};

export const PRICING_TIERS = [
  {
    quantity: 100,
    pricePerItem: 5,
  },
  {
    quantity: 200,
    pricePerItem: 4,
  },
  {
    quantity: 300,
    pricePerItem: 3.5,
  },
  {
    quantity: 500,
    pricePerItem: 3,
  },
];

export function getPricePerItem(
  quantity: number,
  pricingTiers: PricingTier[],
): number {
  const tier = pricingTiers.find((tier) => tier.quantity >= quantity);
  return tier
    ? tier.pricePerItem
    : pricingTiers[pricingTiers.length - 1].pricePerItem;
}

function createData() {
  // make an array from 100 to 1000 with step 100
  return Array.from(Array(10), (_, i) => {
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
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
