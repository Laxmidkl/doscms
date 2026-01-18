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
    image: Yup.mixed().required("Image is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <div className="flex gap-20">
      <div>
        <div className="font-bold">{isEdit ? "Edit Banner" : "About Banner"}</div>
        <h6 className="font-semibold">[title, subTitle, description, image]</h6>
      </div>

      <div className="w-full">
        <Formik
          enableReinitialize
          initialValues={{
            title: savedData?.title || "",
            subTitle: savedData?.subTitle || "",
            image: savedData?.image || null,
            description: savedData?.description || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const finalData = {
              ...values,
              image: values.image || savedData?.image || null,
            };

            console.log("FORM DATA", finalData);

            setSavedData(finalData); // store updated data
            toast.success(`${isEdit ? "Updated" : "Submitted"} successfully!`);

            resetForm({ values: { ...finalData, image: null } });
            if (inputRef.current) inputRef.current.value = "";
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

              {/* Single Image Upload */}
              <div className="text-left mt-5">
                <div className="text-lg font-medium text-purple-700 mb-2">Upload Image</div>

                <Field name="image">
                  {({ form }) => {
                    const imageToShow = form.values.image || savedData?.image || null;

                    return (
                      <div
                        onClick={() => inputRef.current.click()}
                        className={`relative h-48 w-48 border border-dashed flex flex-col justify-center items-center cursor-pointer rounded-md overflow-hidden
                          ${imageToShow ? "border-blue-500" : "border-gray-400 text-gray-400"}`}
                      >
                        {!imageToShow && (
                          <>
                            <div className="text-5xl">
                              <IoCloudUploadSharp />
                            </div>
                            <div>Click to upload</div>
                          </>
                        )}

                        {imageToShow && (
                          <>
                            <img
                              src={
                                imageToShow instanceof File
                                  ? URL.createObjectURL(imageToShow)
                                  : imageToShow
                              }
                              alt=""
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent click to upload
                                if (form.values.image) {
                                  form.setFieldValue("image", null);
                                } else {
                                  setSavedData({ ...savedData, image: null });
                                }
                              }}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm hover:bg-red-700"
                            >
                              ✕
                            </button>
                          </>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              form.setFieldValue("image", e.target.files[0]);
                            }
                          }}
                        />
                      </div>
                    );
                  }}
                </Field>
                <ErrorMessage name="image" component="div" className="text-red-600 mt-1" />
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
              <button
                type="submit"
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
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
