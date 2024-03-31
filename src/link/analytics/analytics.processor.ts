import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HttpService } from '@nestjs/axios';
import { getBrowser, getOS } from 'src/utils';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import { AxiosResponse } from 'axios';

interface JobData { 
    id: string,
    browser: {
        agent: string;
        ip: string;
        referrer: string;
    }
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
    constructor(private readonly httpService: HttpService) {}

    @Process()
    async processData(job: Job<JobData>) {

        const { data } = await firstValueFrom<AxiosResponse<ResponseData>>(
            this.httpService.get(`http://ip-api.com/json/102.131.36.0?fields=status,message,query,country,countryCode`).pipe(
                catchError((err: Observable<unknown>) => {
                    console.error(err);
                    return of({} as AxiosResponse<ResponseData>);
                })
            )
        );

        if(data.status !== 'success') return console.error(data.message);

        const analytics = {
            bee_id: job.data.id,
            country: {
                code: data.countryCode,
                name: data.country
            },
            browser: getBrowser(job.data.browser.agent),
            os: getOS(job.data.browser.agent),
            referer: job.data.browser.referrer,
        }
        console.log(analytics);
    }
}