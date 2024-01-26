import axios from 'axios'

const MARKETPLACE_BACKEND_API = import.meta.env.VITE_MARKETPLACE_BACKEND_API || 'https://marketplace-api.dogeord.io/'
const WALLET_API = import.meta.env.VITE_WALLET_API || 'https://wallet-api.dogeord.io/'

const getUtxoFromInscriptionId = async (inscriptionId: string) => {
  const { data } = await axios.get(WALLET_API + 'inscription/utxo', {
    params: {
      inscriptionId: inscriptionId,
    },
  })

  if (data.status === 0) {
    throw new Error(data.message)
  }

  return data.result
}

const getSellerPsdtHex = async (
  sellerAddress: string,
  inscriptionPrice: number,
  transactionId: string,
  transactionOutput: number,
  discount: boolean
) => {
  try {
    const { data } = await axios.post(MARKETPLACE_BACKEND_API + 'psdt/seller/create', {
      sellerAddress: sellerAddress,
      inscriptionPrice: inscriptionPrice,
      transactionId: transactionId,
      transactionOutput: transactionOutput,
      discount: discount,
    })

    return data.sellerPsdtHex
  } catch (e) {
    throw new Error('Error: ' + e)
  }
}

const createDoginalOffer = async (psdtHex: string) => {
  const url = MARKETPLACE_BACKEND_API + 'offer/doginals/create'
  const requestBody = {
    psdtHex: psdtHex,
  }

  return await axios.post(url, requestBody)
}

export const listDrc20 = async (address: string, inscriptionId: string, priceInShibes: number) => {
  try {
    const { txId, outputIndex } = await getUtxoFromInscriptionId(inscriptionId)
    const psdtHex = await getSellerPsdtHex(address, priceInShibes, txId, outputIndex, false)
    const signedPsdtHex = await (window as any).dogeLabs.signPsbt(psdtHex)
    const { data } = await createDoginalOffer(signedPsdtHex)
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}