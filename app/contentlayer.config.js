import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    summary: {
      type: "string",
      description: "summary, available values: life-insurance",
      required: true,
    },
    style: {
      type: "string",
      description: "Post style, square, polygon",
      required: false,
    },
    bgimage: {
      type: "string",
      description: "Background image",
      required: false,
    },
    action: {
      type: "string",
      description: "url for action button",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (blog) => {
        // console.log(`muly:resolve:blog`, { blog });
        return `/blog/${blog._raw.flattenedPath}`;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "blog",
  documentTypes: [Post],
});
