import axios from 'axios';
import cheerio from 'cheerio';
import { setUrls, urls } from './config';
import { CoupangData } from '../types/types';

function getCoupang(html: string) {
  console.log('coupang go');
  const coupangSelector = `ul#productList`;
  const contentsSelector = `li.search-product`;

  const $ = cheerio.load(html);
  const posts = $(coupangSelector);
  const contensts = posts.find(contentsSelector);
  if (!posts.length) {
    console.log('no coupang');
    return;
  }

  let results: CoupangData[] = [];

  contensts.each((i, el) => {
    const $element = $(el).find('dl.search-product-wrap');
    if ($element.find('.out-of-stock').length > 0) {
      console.log('out of stock');
      return true;
    }

    const name = $element.find('.name').text();
    const price = $element.find('.price-value').text();
    const unitPrice = $element.find('.unit-price').text();
    const link =
      urls.coupang.url +
      $(el)
        .find('.search-product-link')
        .attr('href');

    const index = link.indexOf('?');
    const shortLink = link.substring(0, index);
    const result: CoupangData = {
      name,
      price,
      unitPrice,
      link,
      shortLink
    };

    results.push(result);
  });

  return results;
}

export async function searchCoupang(texts: string[]) {
  const urls: string[] = [];

  texts.forEach(text =>
    urls.push(
      setUrls.coupang({ text, page: 1, userAgent: navigator.userAgent })
    )
  );

  try {
    const {
      data: { results }
    } = await axios.post('http://192.168.0.17:4001/search', {
      urls,
      userAgent: navigator.userAgent
    });

    let datas: CoupangData[][] = [];
    results.forEach((result: string) => {
      const data = getCoupang(result);
      if (data) {
        datas.push(data);
      }
    });
    return datas;
  } catch (err) {
    throw new Error('ERROR In searchCoupang : ' + err);
  }
}
