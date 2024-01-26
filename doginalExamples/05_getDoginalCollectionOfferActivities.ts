import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

type ActionTypeKeys = 'sale' | 'list' | 'unlist'
type HistoryKeys = '1h' | '6h' | '24h' | '7d'

type DoginalOfferActivityParams = {
  collectionSymbol: string
  action?: ActionTypeKeys
  offset?: number
  limit?: number
  history?: HistoryKeys
  sortParam?: 'top'
}

type DoginalOfferActivity = {
  collectionSymbol: string
  createdAt: string // datestring
  doginalName: string
  from: string
  inscriptionId: string
  inscriptionNumber: number
  price: number
  to: string
  type: ActionTypeKeys
}

export const getDoginalCollectionOfferActivities = async (params: DoginalOfferActivityParams) => {
  const { data } = await axios.get<{ activityList: DoginalOfferActivity[]; total: number }>(
    MARKETPLACE_BACKEND_API + 'offer/doginals/activity',
    {
      params: {
        collectionSymbol: params.collectionSymbol,
        action: params.action,
        offset: params.offset ?? 0,
        limit: params.limit ?? 20,
        history: params.history,
        sortParam: params.sortParam,
      },
    }
  )

  return data
}