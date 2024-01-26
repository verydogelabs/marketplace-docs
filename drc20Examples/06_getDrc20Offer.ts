import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

enum OfferStatus {
  SOLD = 'sold',
  LISTED = 'listed',
  UNLISTED = 'unlisted',
}

type Drc20Offer = {
  offerId: string
  address: string
  inscriptionId: string
  inscriptionNumber: number
  tick: string
  amount: number
  unitPrice: number
  price: number
  status: OfferStatus
  psdtHex: string
}

type GetDrc20Offer = {
  offer: Drc20Offer
  timestamp: string
}

export const getDrc20Offer = async (inscriptionId: string) => {
  return await axios.get<GetDrc20Offer>(`${MARKETPLACE_BACKEND_API}offer/drc20?inscriptionId=${inscriptionId}`)
}

/*
### Usage example ###
const { res, err } = await refreshDrc20OfferStatus(inscriptionId)
if (err || !res?.data.valid) {
  console.error('This offer is no longer valid. You will be redirected back to the Marketplace.')
  return
} else {
  const { res: drc20OfferRes, err: drc20OfferErr } = await getDrc20Offer(inscriptionId)
  if (drc20OfferErr) {
    console.log(drc20OfferErr)
    return
  }

  setOffer(drc20OfferRes!.data.offer)
}
*/