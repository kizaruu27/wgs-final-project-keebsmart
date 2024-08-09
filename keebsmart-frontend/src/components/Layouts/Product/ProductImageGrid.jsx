import { useEffect, useState } from "react";
import { urlEndpoint } from "../../../server/url";

export function ProductImageGrid({ productImages, imagePreview }) {
  // State to store the currently selected image
  const [selectedImage, setSelectedImage] = useState('');

  // Update the selected image when imagePreview changes
  useEffect(() => {
    setSelectedImage(imagePreview);
  }, [imagePreview]);

  return (
    <div>
      {/* Display the currently selected image */}
      <img
        src={`${urlEndpoint}/${selectedImage}`}
        alt="Product preview"
        className="rounded-xl mx-auto" // Styles for rounded corners and center alignment
        style={{ width: 650 }} // Inline style to set width of the main image
      />
      <div className="container mt-1 p-4 mx-auto">
        <div className="overflow-x-auto whitespace-nowrap">
          {/* Display thumbnails of all product images */}
          <div className="inline-flex space-x-4">
            {productImages.map((item, key) => (
              <img
                key={key} // Unique key for each image in the list
                src={`${urlEndpoint}/${item}`} // URL of the image
                className="rounded-xl cursor-pointer hover:opacity-50" // Styles for thumbnails: rounded corners, pointer cursor, and hover effect
                style={{ width: 150 }} // Inline style to set width of thumbnails
                onClick={() => setSelectedImage(item)} // Update the selected image on thumbnail click
                alt={`Thumbnail ${key}`} // Accessibility attribute for each thumbnail
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}