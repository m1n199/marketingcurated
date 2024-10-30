
const redColors = [
  'ff0000',
  'ee0000',
  'dd0000',
  'cc0000',
  'bb0000',
  'aa0000',
  '990000',
  '880000',
  '770000',
  '660000',
  '550000',
  '440000',
  '330000',
  '220000',
  '110000',
  '000000',
  '100000',
  '200000',
  '300000',
  '400000',
]

function generateUrl() {
  const color = redColors[Math.floor(Math.random() * redColors.length)]
  return `https://via.placeholder.com/500x500/${color}/ffffff?text=Hello`
}

export function useImageGenerator() {
  return { generateUrl }
}