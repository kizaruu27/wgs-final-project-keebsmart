import { useEffect, useState } from "react";

export function ProductImageGrid({productImages, imagePreview}) {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    setSelectedImage(imagePreview);
  }, [imagePreview])

  return (
    <div>
      <img src={selectedImage} alt="" className="rounded-xl mx-auto" style={{width: 650}} />
      <div className="container mt-1 p-4 mx-auto">
          <div className="overflow-x-auto whitespace-nowrap">
              <div className="inline-flex space-x-4">
                {productImages.map((item, key) => (
                    <img
                      key={key}
                      src={`${item}`}
                      className="rounded-xl cursor-pointer hover:opacity-50"
                      style={{
                        width: 150
                      }}
                      onClick={() => setSelectedImage(item)}
                    />
                ))}
              </div>
          </div>
      </div>
    </div>
  )
}