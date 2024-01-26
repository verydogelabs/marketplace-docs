import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

export const getDrc20OfferList = async (
  tick: string,
  offset: number,
  limit: number,
  sortOrder: string,
  sortParam: string,
  status: string = 'listed'
) => {
  const { data } = await axios.get(MARKETPLACE_BACKEND_API + 'offer/drc20/list', {
    params: {
      tick: tick,
      offset: offset,
      limit: limit,
      sortOrder,
      sortParam,
      status,
    },
  })

  return data
}