"use client";

import Close from "@/components/SVGS/Close";
import React, { useState } from "react";
import ProfileImg from "@/public/Images/profileIMG.png";
import Image from "next/image";
import Edit from "@/components/SVGS/Edit";
import User from "@/components/SVGS/User";
import Bio from "@/components/SVGS/Bio";
import Padlock from "@/components/SVGS/Padlock";
import Phone from "@/components/SVGS/Phone";
import Location from "@/components/SVGS/Location";
import Message2 from "@/components/SVGS/Message2";
import Link from "next/link";

// Dummy profile data
const dummyProfile = {
  username: "Pauleye12",
  full_name: "Paul Ogunmepon",
  email: "pauleye.ogunmepon75@gmail.com",
  phone_number: "+234 812 345 6789",
  bio: "Food lover & home chef 🍳 Always on the hunt for the best local flavors.",
  delivery_address: "12 Marina Road, Lagos Island, Lagos",
  password: "••••••••",
};

type EditingField =
  | "username"
  | "full_name"
  | "email"
  | "phone_number"
  | "bio"
  | "delivery_address"
  | null;

const ManageProfile = () => {
  const [profile, setProfile] = useState(dummyProfile);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [editValue, setEditValue] = useState("");
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const handleEdit = (field: EditingField) => {
    if (field) {
      setEditValue(profile[field]);
      setEditingField(field);
    }
  };

  const handleSave = () => {
    if (editingField) {
      setProfile((prev) => ({ ...prev, [editingField]: editValue }));
      setSaveSuccess(editingField);
      setEditingField(null);
      setEditValue("");
      setTimeout(() => setSaveSuccess(null), 2000);
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
    <div className="bg-[#EC5934] pt-20 min-h-screen">
      <div className="bg-white rounded-t-[30px] pt-9 px-7 flex flex-col items-center w-full gap-5 pb-10 min-h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="flex items-center w-full justify-between px-4 py-3">
          <div className="w-6"></div>
          <p className="font-semibold text-lg">Manage Profile</p>
          <Link href="/home/profile">
            <Close />
          </Link>
        </div>

        {/* Profile Image */}
        <div className="w-full flex flex-col justify-center items-center gap-3 relative">
          <div className="relative">
            <Image
              width={120}
              height={120}
              src={ProfileImg}
              alt="manage-profile"
              className="rounded-full object-cover"
            />
            <button className="absolute bottom-1 right-1 bg-[#EC5934] rounded-full p-[6px] shadow-md hover:bg-[#d94e2e] transition-colors">
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
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg">{profile.full_name}</p>
            <p className="text-[#898A8D] text-sm">@{profile.username}</p>
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

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 rounded-full border border-[#E0E0E0] text-[#50555C] font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-full bg-[#EC5934] text-white font-medium text-sm hover:bg-[#d94e2e] transition-colors"
                >
                  Save
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
            value={profile.username}
            onEdit={() => handleEdit("username")}
            showSuccess={saveSuccess === "username"}
          />

          {/* Full Name */}
          <ProfileField
            icon={<User />}
            label="Full Name"
            value={profile.full_name}
            onEdit={() => handleEdit("full_name")}
            showSuccess={saveSuccess === "full_name"}
          />

          {/* Bio */}
          <ProfileField
            icon={<Bio />}
            label="Bio"
            value={profile.bio}
            onEdit={() => handleEdit("bio")}
            showSuccess={saveSuccess === "bio"}
          />

          {/* Password */}
          <ProfileField
            icon={<Padlock />}
            label="Password"
            value={dummyProfile.password}
            onEdit={() => {}}
            actionLabel="Change"
          />

          {/* Email */}
          <ProfileField
            icon={<Message2 />}
            label="Email"
            value={profile.email}
            onEdit={() => handleEdit("email")}
            showSuccess={saveSuccess === "email"}
          />

          {/* Phone Number */}
          <ProfileField
            icon={<Phone />}
            label="Phone Number"
            value={profile.phone_number}
            onEdit={() => handleEdit("phone_number")}
            showSuccess={saveSuccess === "phone_number"}
          />

          {/* Delivery Address */}
          <ProfileField
            icon={<Location />}
            label="Delivery Address"
            value={profile.delivery_address}
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
  onEdit: () => void;
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
    </div>
  );
};

export default ManageProfile;
