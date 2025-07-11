import {Body, Controller, Get, Headers, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PictureModel} from "./picture.model";
import {PictureService} from "./picture.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller({path: 'picture'})
@ApiTags('Picture')
export class PictureController {


    private pictureService: PictureService;
    constructor() {
        this.pictureService = new PictureService();
    }

    @Get(':name')
    @ApiOperation({summary: 'Get one picture'})
    @ApiOkResponse({description: 'base 63 picture'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getPicture(@Param('name') name: string) {
        return this.pictureService.getPicture(name);
    }


}