// Shared recharts tooltip/formatter types — recharts ships loose callback
// signatures, so these narrow the bits our custom tooltips actually read.

export interface ChartPayloadItem {
  value?: number | string
  name?: string
  dataKey?: string | number
  color?: string
  payload?: Record<string, unknown>
}

export interface ChartTooltipProps {
  active?: boolean
  label?: string | number
  payload?: ChartPayloadItem[]
}
