import {readFileSync} from 'fs';
import {join} from 'path';

export class PictureService {

    public getPicture(name: string) {
        const path = join(__dirname, `../../../public/${name}.png`);
        const base64 = readFileSync(path, {encoding: 'base64'});
        return {base64: base64};
    }


}