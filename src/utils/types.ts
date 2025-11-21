export type CarInfo = {
  plate: string
  brand: string
  model: string
  make_date: string
  owner: {
    full_name: string
    national_id: string
  }
}

export type HistoryInfo = {
  plate: string
  owner_full_name: string
  make_date: string
}
