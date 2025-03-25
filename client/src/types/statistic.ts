interface StatisticData {
  _id: {
    day: number;
    month: number;
    year: number;
  };
  createdAt: string;
  total: number;
}

interface Statistic {
  users: StatisticData[];
  totalUser: number;
  products: StatisticData[];
  totalProduct: number;
  totalProfit: number;
  totalOrder: number;
  lastMonthProfit: number;
  profitDatas: StatisticData[];
}

export type { Statistic, StatisticData };
