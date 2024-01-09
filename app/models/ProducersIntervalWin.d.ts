export interface ProducerData {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducersIntervalWin {
  min: ProducerData;
  max: ProducerData;
}