import { CategoryType } from 'interfaces'
import { NODE_API_URL } from 'utils/constant'

export const getCategories = async (codes?: string[]) => {
  const filter: any = {}
  if (codes) filter.codes = codes
  const res = await fetch(`${NODE_API_URL}/api/categories/?filter=${JSON.stringify(filter)}`)
  if (!res.ok) throw new Error()
  const result = (await res.json()) as CategoryType[]
  return result
}
