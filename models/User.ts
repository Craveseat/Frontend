import mongoose, { Schema } from "mongoose";

const newUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    // avatar: {
    //   type: String,
    //   required: true,
    // },
    // activeCravings: [
    //   {
    //     id: {
    //       type: String,
    //       required: true,
    //     },
    //     image: {
    //       type: String,
    //       required: true,
    //     },
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     price: {
    //       type: String,
    //       required: true,
    //     },
    //     craveNote: {
    //       type: String,
    //     },
    //     date: {
    //       type: String,
    //       required: true,
    //     },
    //     liked: {
    //       type: Boolean,
    //     },
    //     bookmarked: {
    //       type: Boolean,
    //     },
    //     mirror: {
    //       type: Boolean,
    //     },
    //     likeCount: {
    //       type: Number,
    //     },
    //     commentCount: {
    //       type: Number,
    //     },
    //     bookmarkCount: {
    //       type: Number,
    //     },
    //     mirrorCount: {
    //       type: Number,
    //     },
    //     comments: [
    //       {
    //         id: {
    //           type: String,
    //         },
    //         avatar: {
    //           type: String,
    //         },
    //         userName: {
    //           type: String,
    //         },
    //         comment: {
    //           type: String,
    //         },
    //         date: {
    //           type: String,
    //         },
    //         liked: {
    //           type: Boolean,
    //         },
    //         reply: [
    //           {
    //             id: {
    //               type: String,
    //             },
    //             avatar: {
    //               type: String,
    //             },
    //             userName: {
    //               type: String,
    //             },
    //             comment: {
    //               type: String,
    //             },
    //             date: {
    //               type: String,
    //             },
    //             liked: {
    //               type: Boolean,
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
  { timestamps: true }
);

const CraveSeatUser =
  mongoose.models.Userr || mongoose.model("Userr", newUserSchema);

export { CraveSeatUser };
