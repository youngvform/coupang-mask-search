import { Params } from '../types/types';

export const urls = {
  coupang: {
    url: 'https://www.coupang.com',
    search: '/np/search?q=',
    page:
      '&brand=&offerCondition=&filter=&availableDeliveryFilter=&filterType=rocket%2Ccoupang_global&isPriceRange=false&priceRange=&minPrice=&maxPrice=&trcid=&traid=&filterSetByUser=true&channel=recent&backgroundColor=&component=&rating=0&sorter=latestAsc&listSize=36&rocketAll=true&page='
  },
  coupangRanking: {
    page:
      '&brand=&offerCondition=&filter=&availableDeliveryFilter=&filterType=rocket%2Ccoupang_global&isPriceRange=false&priceRange=&minPrice=&maxPrice=&page=1&trcid=&traid=&filterSetByUser=true&channel=user&backgroundColor=&component=&rating=0&sorter=scoreDesc&listSize=36&rocketAll=true&page='
  }
};

export const setUrls = {
  coupang: (params: Params) => {
    return (
      urls.coupang.url +
      urls.coupang.search +
      params.text +
      urls.coupang.page +
      params.page
    );
  },
  coupangRanking: (params: Params) =>
    urls.coupang.url +
    urls.coupang.search +
    params.text +
    urls.coupangRanking.page +
    params.page
};
