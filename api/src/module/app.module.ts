import {Module} from '@nestjs/common';
import {SubscriptionModule} from "./subscription/subscription.module";
import {PictureModule} from "./picture/picture.module";

@Module({
    imports: [
        SubscriptionModule,
        PictureModule,
    ]
})
export class AppModule {
}