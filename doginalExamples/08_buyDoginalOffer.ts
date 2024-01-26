import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'
const WALLET_API = import.meta.env.VITE_WALLET_API || 'https://wallet-api.dogeord.io/'

type GetTx = {
  status: string
  message: string
}

const getTx = async (txHash: string) => {
  const { data } = await axios.get<GetTx>(`${WALLET_API}tx?hash=${txHash}`)
  return data
}

const waitUntilTxInMempool = async (txHash: string) => {
  let txFound = false
  while (!txFound) {
    const tx = await getTx(txHash)

    if (tx.status === '1') {
      txFound = true
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}

const getPsdtFromOfferId = async (offerId: string, type: 'drc20' | 'doginals') => {
  const { data } = await axios.get(`${MARKETPLACE_BACKEND_API}offer/${type}/psdt-hex?offerId=${offerId}`)

  if (data.status !== 0) {
    return data.psdtHex
  } else {
    throw new Error('No such offer id')
  }
}

export const buyDoginalOffer = async (offerId: string, address: string) => {
  try {
    const sellerPsdtHex = await getPsdtFromOfferId(offerId, 'doginals')

    // Create 3 outputs required for purchasing the offer
    const unsignedBuyerPrePurchaseTx = await (window as any).dogeLabs.createPurchaseOfferInputs(sellerPsdtHex)
    const signedBuyerPrePurchaseTx = await (window as any).dogeLabs.signPsbt(unsignedBuyerPrePurchaseTx)
    const { txHash, rawTx } = await (window as any).dogeLabs.pushPsbt(signedBuyerPrePurchaseTx, [], true)
    await waitUntilTxInMempool(txHash)
    
    const buyerPsdtHex = await (window as any).dogeLabs.createBuyerPsdt(sellerPsdtHex, rawTx)
    const signedPsdtHex = await (window as any).dogeLabs.signPsbt(buyerPsdtHex)
    const data = await (window as any).dogeLabs.buyDoginalOffer(offerId, signedPsdtHex, address)
    if (!data || data.status === 500) {
      // handle this case
    } else {
      // const txHash = data.txHash
      return data
    }
  } catch (error) {
    console.log(error)
    return null
  }
}