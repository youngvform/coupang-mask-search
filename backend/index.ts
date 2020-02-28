import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import { CorsOptions } from 'cors';

import { getHTML } from './lib/scrape';

const PORT = 4001;

const expressApp = express();

const corsConfig: CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // permit url
  credentials: true
};
expressApp.use(cors(corsConfig));

expressApp.use(express.json());
expressApp.use(
  express.urlencoded({
    extended: true
  })
);

expressApp.post(
  '/search',
  async (req: Request, res: Response, next: NextFunction) => {
    const { urls, userAgent } = req.body;
    const searchSites: Promise<any>[] = [];
    urls.forEach((url: string) => {
      searchSites.push(getHTML(url, userAgent));
    });

    try {
      const results = await Promise.all(searchSites);

      res.json({ results });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

expressApp.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('gogogogo');
  res.json('gogogogogog');
});

expressApp.listen(PORT, () =>
  console.log(`server is running on port: ${PORT}`)
);
