import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'

type PutRefreshStatus = {
  valid: boolean
}

export const refreshDrc20OfferStatus = async (inscriptionId: string) => {
  return await axios.put<PutRefreshStatus>(
    `${MARKETPLACE_BACKEND_API}offer/drc20/refresh-status?inscriptionId=${inscriptionId}`
  )
}

/*
### Usage example ###
const { res, err } = await refreshDrc20OfferStatus(inscriptionId)
if (err || !res?.data.valid) {
  console.error('This offer is no longer valid. You will be redirected back to the Marketplace.')
  return
} else {
  const { res: drc20OfferRes, err: drc20OfferErr } = await getDrc20Offer(inscriptionId)
  ...
}
*/