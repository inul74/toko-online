export default function Images({
  setFeatureImage,
  featureImage,
  imageList,
  setImageList,
}) {
  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1 className="font-semibold">Images</h1>
      <div className="flex flex-col gap-1">
        {featureImage && (
          <div className="flex justify-center">
            <img
              className="h-20 object-cover rounded-lg"
              src={URL.createObjectURL(featureImage)}
              alt=""
            />
          </div>
        )}
        <label
          className="text-gray-500 text-xs"
          htmlFor="product-feature-image"
        >
          Feature Image <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="file"
          id="product-feature-image"
          name="product-feature-image"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFeatureImage(e.target.files[0]);
            }
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        {imageList?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {imageList?.map((item) => {
              return (
                <img
                  className="w-20 object-cover rounded-lg"
                  src={URL.createObjectURL(item)}
                  alt=""
                />
              );
            })}
          </div>
        )}
        <label className="text-gray-500 text-xs" htmlFor="product-images">
          Images <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="file"
          id="product-images"
          name="product-images"
          multiple
          onChange={(e) => {
            const newFiles = [];
            for (let i = 0; i < e.target.files.length; i++) {
              newFiles.push(e.target.files[i]);
            }
            setImageList(newFiles);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>
    </section>
  );
}
