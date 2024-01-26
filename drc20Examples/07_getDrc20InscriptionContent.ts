import axios from 'axios'

export const getInscriptionContent = async (inscriptionId: string) => {
  return await axios.get(`https://wonky-ord.dogeord.io/content/${inscriptionId}`)
}