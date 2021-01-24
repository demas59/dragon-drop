import Images from "../classes/images";
import ImageModel from "../models/ImageModel";

export default class imagesController {
  async getAll(req: Request, res: Response) {
    const images: Images[] = await ImageModel.getImages();
    res.json(images);
  }
}
