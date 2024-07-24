import { ImageList, ImageListItem } from "@mui/material";

export function ProductImageGrid({productImages, imagePreview}) {
    return (
      <ImageList variant="masonry" cols={2} gap={12}>
        <ImageListItem>
          <img src={imagePreview} alt="" className="rounded-xl duration-500 hover:scale-110" />
        </ImageListItem>
        {productImages.map((item, key) => (
          <ImageListItem key={key}>
            <img
              src={`${item}`}
              className="rounded-xl"
            />
          </ImageListItem>
        ))}
      </ImageList>
    )
}