export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 200) * Math.PI) / 180.0

  return {
    x: centerX + (radius * Math.cos(angleInRadians) + 30),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

export const initializeArc = (x, y, radius, endAngle, startAngle = 0) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    1,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(' ')

  return d
}
