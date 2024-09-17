import {Body, Controller, Delete, Get, Headers, Param, Post, Put, Redirect} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BodySubscription, BodySubscriptionPrice} from "./subscription.model";
import {SubscriptionService} from "./subscription.service";

@Controller({path: 'subscription'})
@ApiTags('Subscription')
export class SubscriptionController {
    private subscriptionService: SubscriptionService;

    constructor() {
        this.subscriptionService = new SubscriptionService();
    }


    @Post('subscribe')
    @ApiOperation({summary: 'Subscribe user'})
    @ApiCreatedResponse({description: 'User subscribed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async subscribeUser(@Headers('authorization') token: string, @Body() body: BodySubscription) {
        return await this.subscriptionService.subscribeUserByToken(token, body);
    }

    @Get('subscribe-validation:uid')
    @Redirect("https://pcs.c2smr.fr", 301)
    @ApiOperation({summary: 'Subscribe user'})
    @ApiCreatedResponse({description: 'User subscribed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async subscribeUserValidation(@Headers('authorization') token: string, @Param() body: any) {
        return await this.subscriptionService.subscribeUserValidation(body.uid);
    }


    @Post('price')
    @ApiOperation({summary: 'Get subscription price'})
    @ApiOkResponse({description: 'Subscription price'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async subscriptionPrice() {
        return this.subscriptionService.subscriptionPrice();
    }


}