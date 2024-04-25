import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HttpService } from '@nestjs/axios';
import { getBrowser, getOS } from 'src/utils';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics } from './analytics.schema';
import { Model } from 'mongoose';
import { LinkService } from '../link.service';

interface AnalyticsJobData {
  id: string;
  agent: string;
  ip: string;
  referrer: string;
  date: Date;
}

interface ResponseData {
  status: string;
  message: string;
  query: string;
  country: string;
  countryCode: string;
}

@Processor('analytics')
export class AnalyticsConsumer {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Analytics.name) private analyticsModel: Model<Analytics>,
    private readonly linkService: LinkService,
  ) {}

  @Process()
  async processData(job: Job<AnalyticsJobData>) {
    try {
      const { data: ipResponse } = await firstValueFrom<
        AxiosResponse<ResponseData>
      >(
        this.httpService
          .get(
            `http://ip-api.com/json/102.131.36.0?fields=status,message,query,country,countryCode`,
          )
          .pipe(
            catchError((err: Observable<unknown>) => {
              console.error(err);
              return of({} as AxiosResponse<ResponseData>);
            }),
          ),
      );

      if (ipResponse.status !== 'success')
        return console.error(ipResponse.message);

      const analytics = {
        bee_id: job.data.id,
        country: {
          code: ipResponse.countryCode,
          name: ipResponse.country,
        },
        browser: getBrowser(job.data.agent).name,
        os: getOS(job.data.agent).name,
        referer: job.data.referrer,
        date: job.data.date,
      };

      const data = await this.analyticsModel.create(analytics);
      await data.save();

      const no_of_visits = await this.analyticsModel.countDocuments({
        bee_id: job.data.id,
      });
      await this.linkService.updateOne(job.data.id, {
        last_visited_at: job.data.date,
        no_of_visits,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
