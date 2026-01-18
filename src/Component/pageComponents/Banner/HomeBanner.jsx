import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import JoditEditor from "jodit-react";
import * as Yup from "yup";
import { IoCloudUploadSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const Banner = () => {
  const editor = useRef(null);
  const inputRef = useRef(null);

  const [savedData, setSavedData] = useState(null); // stores submitted data

  const isEdit = Boolean(savedData);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    subTitle: Yup.string().required("SubTitle is required"),
    images: Yup.array()
      .of(Yup.mixed())
      .min(1, "At least one image is required")
      .max(3, "You can upload up to 3 images"),
    description: Yup.string().required("Description is required"),
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex gap-20">
      <div>
        <div className="font-bold">{isEdit ? "Edit Banner" : "Home Banner"}</div>
        <h6 className="font-semibold">[title, subTitle, description, image]</h6>
      </div>

      <div className="w-full">
        <Formik
          enableReinitialize
          initialValues={{
            title: savedData?.title || "",
            subTitle: savedData?.subTitle || "",
            images: [], // for new uploads
            description: savedData?.description || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const finalData = {
              ...values,
              images: [...(savedData?.images || []), ...(values.images || [])], // combine old + new
            };
           
          console.log("FORM DATA", finalData);

            setSavedData(finalData); // store data to state
            toast.success(`${isEdit ? "Updated" : "Submitted"} successfully!`);

            // reset only new uploads
            resetForm({ values: { ...finalData, images: [] } });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="w-full">
              <Toaster />

              {/* Title */}
              <div className="flex flex-col">
                <label className="font-semibold pt-5">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="p-2 border-gray-400 rounded-xl mt-1 border-2"
                />
                <ErrorMessage name="title" component={"div"} className="text-red-600" />
              </div>

              {/* Sub Title */}
              <div className="flex flex-col">
                <label className="font-semibold pt-5">Sub Title</label>
                <Field
                  type="text"
                  name="subTitle"
                  className="p-2 border-gray-400 rounded-xl mt-1 border-2"
                />
                <ErrorMessage name="subTitle" component={"div"} className="text-red-600" />
              </div>

              {/* Images */}
              <div className="text-left mt-5">
                <div className="text-lg font-medium text-purple-700 mb-2">
                  Upload Images (max 3)
                </div>

                {/* Existing images */}
                <div className="flex gap-3 flex-wrap mb-3">
                  {savedData?.images?.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img instanceof File ? URL.createObjectURL(img) : img}
                        alt=""
                        className="h-24 w-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedImages = savedData.images.filter((_, index) => index !== i);
                          setSavedData({ ...savedData, images: updatedImages });
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* New uploads */}
                <Field name="images">
                  {({ form }) => {
                    const removeImage = (index) => {
                      const updated = form.values.images.filter((_, i) => i !== index);
                      form.setFieldValue("images", updated);
                    };

                    return (
                      <>
                        <div
                          onClick={() => {
                            if ((form.values.images.length + (savedData?.images?.length || 0)) < 3) {
                              inputRef.current.click();
                            }
                          }}
                          className={`h-48 w-48 border border-dashed flex flex-col justify-center items-center cursor-pointer
                            ${
                              (form.values.images.length + (savedData?.images?.length || 0)) >= 3
                                ? "opacity-50 cursor-not-allowed"
                                : "border-black text-gray-400"
                            }`}
                        >
                          <div className="text-5xl">
                            <IoCloudUploadSharp />
                          </div>
                          <div>Click to upload</div>
                        </div>

                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          ref={inputRef}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const newFiles = Array.from(e.target.files);
                            const existingFiles = form.values.images || [];
                            const combined = [...existingFiles, ...newFiles].slice(
                              0,
                              3 - (savedData?.images?.length || 0)
                            );
                            form.setFieldValue("images", combined);
                            e.target.value = "";
                          }}
                        />

                        <div className="flex gap-3 mt-4 flex-wrap">
                          {form.values.images.map((file, i) => (
                            <div key={i} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                className="h-24 w-24 object-cover rounded-md border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm hover:bg-red-700"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  }}
                </Field>

                <ErrorMessage name="images" component="div" className="text-red-600 mt-1" />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="font-semibold pt-5">Description</label>
                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onChange={(val) => setFieldValue("description", val)}
                />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>

              {/* Submit / Update */}
              <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">
                {isEdit ? "Update" : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Banner;
