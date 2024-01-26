import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

export const getDoginalsOffersList = async (
  collectionSymbol?: string,
  seller?: string,
  status?: 'listed' | 'sold' | 'unlisted'
) => {
  const params: Record<string, any> = {
    offset: 0,
    limit: 100,
  }

  if (collectionSymbol) {
    params.collectionSymbol = collectionSymbol
  }

  if (seller) {
    params.seller = seller
  }

  if (status) {
    params.status = status
  }

  const { data } = await axios.get(MARKETPLACE_BACKEND_API + 'offer/doginals/listings', {
    params,
  })

  return data.offers
}