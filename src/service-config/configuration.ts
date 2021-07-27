import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

async function fetchConfig() {
  const http = new HttpService();
  const response = http.get(`${process.env.CONFIG_BASE_URL}`);
  const resp = await firstValueFrom(response);
  return resp.data;
}
export default fetchConfig;
