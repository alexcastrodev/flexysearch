export const omit = (object: Record<string, any>, keys: Array<string>): Record<string, any> => {
  if (!object) return {}
  try {
    const payload = Object.entries(object).filter(([key]) => !keys.includes(key))
    const data: { [key: string]: any } = {}

    payload.forEach((item) => {
      const [key, value] = item
      data[key] = value
    })
    return data
  } catch {
    return {}
  }
}
