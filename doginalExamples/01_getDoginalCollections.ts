import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

type DoginalsCollection = {
  name: string
  symbol: string
  description: string
  supply: number
  imageURI: string
  minInscriptionNumber: string
  maxInscriptionNumber: string
  twitterLink: string
  discordLink: string
  websiteLink: string
  floorPrice: number
  sales: number
  totalVolume: number
  totalListed: number
  holders: number
  collectionCreationTimestamp: string
  visible?: boolean
  activityVolume: number
}

type GetDoginalCollections = {
  collections: Array<DoginalsCollection>
  total: number
}

export const getDoginalCollections = async (
  offset: number,
  limit: number,
  filterByName?: string,
  sortOrder?: 'asc' | 'desc',
  sortParam?: 'volume' | 'price' | 'createdAt' | 'launchpadEndDate'
) => {
  return await axios.get<GetDoginalCollections>(MARKETPLACE_BACKEND_API + 'doginals/list', {
    params: {
      limit,
      offset,
      filterByName,
      sortOrder,
      sortParam,
    },
  })
}