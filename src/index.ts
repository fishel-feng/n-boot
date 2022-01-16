import * as http from 'http';
import { matchUrl } from './utils/math-url';
import { Request } from './request';
import { Response } from './response';


type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS';
type Handler = <T>(req: Request, res: Response) => Promise<T>;

interface Router {
  method: Method;
  url: string;
  handler: Handler;
}

export class NBoot {
  private server: http.Server;

  private routeList: Router[] = [
    {
      method: 'GET',
      url: '/',
      handler: <any>(async (req: Request, res: Response) => {}),
    },
  ];

  route(method: Method, url: string, handler: Handler): NBoot {
    this.routeList.push({ method, url, handler });
    return this;
  }

  start(port: number) {
    this.server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');

      for (const routeItem of this.routeList) {
        if (matchUrl(req.url, routeItem.url) && req.method === routeItem.method) {
          routeItem.handler(new Request(req), new Response(res));
          break;
        }
      }
    });
    this.server.listen(port);
  }
}
