import { Player } from '../types'

export const getNextSymbol = (players: Player[], symbol: string): string =>
  symbol === players[0].symbol ? players[1].symbol : players[0].symbol
