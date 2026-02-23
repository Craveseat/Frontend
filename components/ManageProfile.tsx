"use client";

import Close from "@/components/SVGS/Close";
import React, { useRef, useState } from "react";
import ProfileImg from "@/public/Images/profileIMG.png";
import Image from "next/image";
import Edit from "@/components/SVGS/Edit";
import User from "@/components/SVGS/User";
import Bio from "@/components/SVGS/Bio";
import { useUserDetails } from "@/contexts/UserDetailsContext";
import Padlock from "@/components/SVGS/Padlock";
import Phone from "@/components/SVGS/Phone";
import Location from "@/components/SVGS/Location";
import Message2 from "@/components/SVGS/Message2";
import Link from "next/link";
import { updateProfile, updateProfilePicture } from "@/utils/api";
import { LoginUserDetails } from "@/utils/types";
import { Spinner } from "@/components/Loader";

// Dummy profile data
// const dummyProfile = {
//   username: "Pauleye12",
//   full_name: "Paul Ogunmepon",
//   email: "pauleye.ogunmepon75@gmail.com",
//   phone_number: "+234 812 345 6789",
//   bio: "Food lover & home chef 🍳 Always on the hunt for the best local flavors.",
//   delivery_address: "12 Marina Road, Lagos Island, Lagos",
//   password: "••••••••",
// };

type EditingField =
  | "username"
  | "full_name"
  | "email"
  | "phone_number"
  | "bio"
  | "delivery_address"
  | null;

const ManageProfile = ({ setShowProfile }: { setShowProfile: () => void }) => {
  const { user, setUserDetails } = useUserDetails();
  const [profile, setProfile] = useState(user);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [editValue, setEditValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);

    // Reset input so the same file can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploadingPicture(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await updateProfilePicture(formData);
      console.log(res);
      setUserDetails(res.data);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadingPicture(false);
      cancelPreview();
    }
  };

  const cancelPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const handleEdit = (field: EditingField) => {
    if (field && profile) {
      setEditValue(profile[field]);
      setEditingField(field);
    }
  };

  const handleSave = async () => {
    if (editingField && profile) {
      try {
        setErrMsg(null);
        setIsUpdating(true);
        const res = await updateProfile({
          [editingField]: editValue,
        });
        console.log(res);
        setUserDetails(res.data);
        setSaveSuccess(editingField);

        setEditingField(null);
        setEditValue("");
        console.log(res);
      } catch (error: unknown) {
        console.log(error);
        setErrMsg(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      } finally {
        setIsUpdating(false);
        setTimeout(() => setSaveSuccess(null), 2000);
      }
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const fieldLabel: Record<string, string> = {
    username: "Username",
    full_name: "Full Name",
    email: "Email",
    phone_number: "Phone Number",
    bio: "Bio",
    delivery_address: "Delivery Address",
  };

  return (
    <div className="bg-transparent pt-12 min-h-screen">
      <div className="bg-white rounded-t-[30px] pt-9 px-7 flex flex-col items-center w-full gap-5 pb-10 min-h-[calc(100vh-20px)]">
        {/* Header */}
        <div className="flex items-center w-full justify-between px-4 py-3">
          <div className="w-6"></div>
          <p className="font-semibold text-lg">Manage Profile</p>
          <button onClick={() => setShowProfile()}>
            <Close />
          </button>
        </div>

        {/* Profile Image */}
        <div className="w-full flex flex-col justify-center items-center gap-3 relative">
          <div className="relative">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                width={120}
                height={120}
                src={previewUrl}
                alt="preview"
                className="rounded-full aspect-square object-cover"
              />
            ) : (
              <Image
                width={120}
                height={120}
                src={user?.image_url || ProfileImg}
                alt="profile-image"
                className="rounded-full aspect-square object-cover"
              />
            )}
            {/* Hidden file input for profile picture upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePictureChange}
              accept="image/*"
              className="hidden"
            />
            {!previewUrl && (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPicture}
                className="absolute bottom-1 right-1 bg-[#EC5934] rounded-full p-[6px] shadow-md hover:bg-[#d94e2e] transition-colors disabled:opacity-60"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>
            )}
          </div>

          {/* Preview confirm/cancel buttons */}
          {previewUrl && (
            <div className="flex gap-3 mt-1">
              <button
                onClick={cancelPreview}
                disabled={isUploadingPicture}
                className="py-2 px-5 rounded-full border border-[#E0E0E0] text-[#50555C] font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpload}
                disabled={isUploadingPicture}
                className="py-2 px-5 rounded-full bg-[#EC5934] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#d94e2e] transition-colors disabled:opacity-60"
              >
                {isUploadingPicture ? <Spinner /> : "Upload"}
              </button>
            </div>
          )}

          {uploadSuccess && (
            <span className="text-green-500 text-sm font-medium animate-pulse">
              ✓ Profile picture updated!
            </span>
          )}

          <div className="text-center">
            <p className="font-semibold text-lg">{user?.full_name || ""}</p>
            <p className="text-[#898A8D] text-sm">@{user?.username || ""}</p>
          </div>
        </div>

        {/* Edit Modal Overlay */}
        {editingField && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
            <div className="bg-white w-full max-w-md rounded-t-[24px] p-6 pb-8 animate-slide-up">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-lg">
                  Edit {fieldLabel[editingField]}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-[#898A8D] hover:text-black transition-colors p-1"
                >
                  <Close />
                </button>
              </div>

              {editingField === "bio" ? (
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EC5934] focus:ring-1 focus:ring-[#EC5934] transition-all resize-none"
                  rows={4}
                  placeholder={`Enter your ${fieldLabel[editingField].toLowerCase()}`}
                  autoFocus
                />
              ) : (
                <input
                  type={editingField === "email" ? "email" : "text"}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EC5934] focus:ring-1 focus:ring-[#EC5934] transition-all"
                  placeholder={`Enter your ${fieldLabel[editingField].toLowerCase()}`}
                  autoFocus
                />
              )}

              {errMsg && <p className="text-red-500 text-xs ">{errMsg}</p>}

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 rounded-full border border-[#E0E0E0] text-[#50555C] font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="flex-1 py-3 rounded-full bg-[#EC5934] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#d94e2e] transition-colors   disabled:cursor-not-allowed "
                >
                  {isUpdating ? <Spinner /> : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Fields */}
        <div className="flex flex-col items-center w-full mt-2">
          {/* Username */}
          <ProfileField
            icon={<User />}
            label="Username"
            value={user?.username || ""}
            // onEdit={() => handleEdit("username")}
            showSuccess={saveSuccess === "username"}
          />

          {/* Full Name */}
          <ProfileField
            icon={<User />}
            label="Full Name"
            value={user?.full_name || ""}
            onEdit={() => handleEdit("full_name")}
            showSuccess={saveSuccess === "full_name"}
          />

          {/* Bio */}
          <ProfileField
            icon={<Bio />}
            label="Bio"
            value={user?.bio || ""}
            onEdit={() => handleEdit("bio")}
            showSuccess={saveSuccess === "bio"}
          />

          {/* Password */}
          {/* <ProfileField
            icon={<Padlock />}
            label="Password"
            value={dummyProfile.password}
            onEdit={() => {}}
            actionLabel="Change"
          /> */}

          {/* Email */}
          <ProfileField
            icon={<Message2 />}
            label="Email"
            value={user?.email || ""}
            // onEdit={() => handleEdit("email")}
            showSuccess={saveSuccess === "email"}
          />

          {/* Phone Number */}
          <ProfileField
            icon={<Phone />}
            label="Phone Number"
            value={profile?.phone_number || ""}
            onEdit={() => handleEdit("phone_number")}
            showSuccess={saveSuccess === "phone_number"}
          />

          {/* Delivery Address */}
          <ProfileField
            icon={<Location />}
            label="Delivery Address"
            value={user?.delivery_address || ""}
            onEdit={() => handleEdit("delivery_address")}
            showSuccess={saveSuccess === "delivery_address"}
          />
        </div>
      </div>

      {/* Slide-up animation */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

/* Reusable profile field row component */
const ProfileField = ({
  icon,
  label,
  value,
  onEdit,
  showSuccess,
  actionLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onEdit?: () => void;
  showSuccess?: boolean;
  actionLabel?: string;
}) => {
  return (
    <div className="flex items-start w-full justify-between border-b border-b-[#0000001A] py-5 px-3 gap-3">
      <div className="flex-shrink-0 mt-[2px] text-[#898A8D]">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#898A8D] mb-[2px]">{label}</p>
        <p className="text-sm text-[#1A1A1A] break-words">{value}</p>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex-shrink-0 flex items-center gap-1 mt-1"
        >
          {showSuccess ? (
            <span className="text-green-500 text-xs font-medium animate-pulse">
              ✓ Saved
            </span>
          ) : actionLabel ? (
            <span className="text-[#EC5934] text-xs font-medium">
              {actionLabel}
            </span>
          ) : (
            <Edit />
          )}
        </button>
      )}
    </div>
  );
};

export default ManageProfile;
