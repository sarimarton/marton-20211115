export default function format(value: number, fixed?: number) {
  return new Intl.NumberFormat('en', {
    minimumFractionDigits: fixed || 0
  }).format(value)
}