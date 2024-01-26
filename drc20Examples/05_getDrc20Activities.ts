import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

type ActionTypeKeys = 'sale' | 'list' | 'unlist'
type HistoryKeys = '1h' | '6h' | '24h' | '7d'

type Drc20OfferActivity = {
  tick: string
  inscriptionId: string
  inscriptionNumber: number
  type: ActionTypeKeys
  price: number
  totalPrice: number
  amount: number
  from: string
  to: string
  createdAt: string
}

type GetDrc20OfferActivityResponse = {
  activities: Array<Drc20OfferActivity>
  total: number
}

type GetDrc20OfferActivityParams = {
  tick: string
  offset: number
  limit?: number
  action?: ActionTypeKeys
  history?: HistoryKeys
  sortParam?: 'top'
}

export const getDrc20Activities = async ({
  tick,
  offset,
  limit,
  action,
  history,
  sortParam,
}: GetDrc20OfferActivityParams) => {
  const { data } = await axios.get<GetDrc20OfferActivityResponse>(MARKETPLACE_BACKEND_API + 'offer/drc20/activity', {
    params: {
      tick,
      action,
      offset,
      limit,
      history,
      sortParam,
    },
  })

  return data
}