// tina/config.ts
import { defineConfig } from "tinacms";
var branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "nft",
        label: "NFTs",
        path: "content/nfts",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "reference",
            name: "artist",
            label: "Artist",
            collections: ["artist"],
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Price (ETH)",
            required: true,
          },
          {
            type: "string",
            name: "image_ipfs",
            label: "IPFS Image URL",
            description: "ipfs://...",
            required: true,
          },
          {
            type: "string",
            name: "thumbnail_ipfs",
            label: "IPFS Thumbnail URL",
            description: "ipfs://...",
          },
          {
            type: "boolean",
            name: "is_listed",
            label: "Listed for Sale",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["Digital Art", "Photography", "3D", "Mixed Media"],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Description",
            isBody: true,
          },
        ],
      },
      {
        name: "artist",
        label: "Artists",
        path: "content/artists",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "image",
            name: "avatar",
            label: "Avatar",
          },
          {
            type: "string",
            name: "bio_short",
            label: "Short Bio",
          },
          {
            type: "string",
            name: "website",
            label: "Website",
          },
          {
            type: "string",
            name: "twitter",
            label: "Twitter",
          },
          {
            type: "string",
            name: "instagram",
            label: "Instagram",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Full Bio",
            isBody: true,
          },
        ],
      },
    ],
  },
});
export { config_default as default };
