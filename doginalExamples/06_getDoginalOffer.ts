import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

enum OfferStatus {
  SOLD = 'sold',
  LISTED = 'listed',
  UNLISTED = 'unlisted',
}

type DoginalOffer = {
  offerId: string
  address: string
  inscriptionId: string
  inscriptionNumber: number
  collectionSymbol: string
  collectionName: string
  doginalName: string
  price: number
  psdtHex?: string | null
  status: OfferStatus
}

type GetDoginalOffer = {
  offer: DoginalOffer
  timestamp: string
}

export const getDoginalOffer = async (inscriptionId: string) => {
  const { data } = await axios.get<GetDoginalOffer>(
    `${MARKETPLACE_BACKEND_API}offer/doginal?inscriptionId=${inscriptionId}`
  )
  return data
}


/*
### Usage example ###
const { res, err } = await refreshDoginalOfferStatus(inscriptionId)
if (err || !res?.data.valid) {
  console.error('This offer is no longer valid. You will be redirected back to the Marketplace.')
  return
} else {
  const { offer, timestamp } = await getDoginalOffer(inscriptionId)
  setOffer(offer)
}
*/