import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

type Drc20Data = {
  tick: string
  lastPrice: number
  volume: number
  sales: number
  holders: number
  maxSupply: string
  currentSupply: string
  twentyFourHourVolume: number
  changePercent: number
  floorPrice: number
  inscriptionId?: string
  totalSupply?: string
  activityVolume: number
}

type GetDrc20List = { list: Array<Drc20Data>; total: number; DOGEprice: number }

export const getDrc20List = async (
  offset: number,
  limit: number,
  filterByTick?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
  sortParam: 'volume' | 'price' = 'volume'
) => {
  return await axios.get<GetDrc20List>(`${MARKETPLACE_BACKEND_API}drc20/list`, {
    params: {
      offset,
      limit,
      filterByTick,
      sortOrder,
      sortParam,
    },
  })
}