export const ButtonCost = [
  { cost: 1, value: 1.5 },
  { cost: 225, value: 5.25 },
  { cost: 1350, value: 150.75 },
  { cost: 6840, value: 350.175 },
  { cost: 18000, value: 840 },
  { cost: 72000, value: 7500 },
  { cost: 130500, value: 11250 },
  { cost: 472500, value: 13050 },
  { cost: 900000, value: 41250 },
  { cost: 1656000, value: 57000 },
  { cost: 7479000, value: 91500 },
  { cost: 33750000, value: 139500 },
  { cost: 81450000, value: 255000 },
  { cost: 990000000, value: 1281000 },
  { cost: 6532500000, value: 2145000 },
  { cost: 29250000000, value: 6750000 },
  { cost: 60750000000, value: 13365000 },
  { cost: 140400000000, value: 21370500 },
  { cost: 399600000000, value: 54000000 },
  { cost: 802098000000, value: 120000000 },
  { cost: 2106000000000, value: 300000000 },
  { cost: 6300000000000, value: 534600000 },
  { cost: 13770000000000, value: 1039500000 },
  { cost: 35280000000000, value: 1425000000 }
  ];

  export const formatCost = (cost) => {
    const magnitudeLabels = ['', 'k', 'm', 'b', 'T','qd','qn'];
  const magnitude = Math.floor(Math.log10(cost) / 3);
  const divisor = Math.pow(10, magnitude * 3);
  const scaled = cost / divisor;
  const label = magnitudeLabels[magnitude];
  const formatted = scaled.toFixed(2);
  return `${formatted}${label}`;
};
