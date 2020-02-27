// import * as cron from 'node-cron';
// import {searchCoupang} from './scrape'
// import {CoupangData} from '../../src/types/types'
//
// export function searchCron(texts: string[], time: number) {
//     console.log('cron');
//     console.log(texts);
//     const exp = `${time} * * * *`;
//     console.log({exp})
//     let results: CoupangData[][] = [];
//     cron.schedule(exp,  () => {
//         console.log('CRON RUNNING');
//
//         texts.forEach(async (text) => {
//             const data  = await searchCoupang({text, userAgent: navigator.userAgent, page: 1});
//             console.log({data});
//             if (data && data.length) {
//                 results.push(data);
//             }
//         });
//     })
//
//     // https://www.coupang.com/np/search?q=%EB%A7%88%EC%8A%A4%ED%81%AC&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=latestAsc&minPrice=&maxPrice=&priceRange=&filterType=rocket,&listSize=72&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=2&rocketAll=false&searchIndexingToken=&backgroundColor=
// }
