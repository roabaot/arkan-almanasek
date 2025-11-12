"use client";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

type Props = {
  tags: string;
  shareUrl?: string;
  title?: string;
};

const Tag = ({ tags, shareUrl, title }: Props) => {
  const tagList = tags ? tags.split(",").map((tag) => tag.trim()) : [];
  return (
    <div className="md:flex justify-between items-center mt-[30px]">
      <div className="flex flex-wrap gap-6">
        <h3> Tags:</h3>
        {tagList.map((tag, index) => (
          <div key={index} className="bg-[#F2F4F8] rounded-[30px] px-2 py-1">
            <p>{tag}</p>
          </div>
        ))}
      </div>
      {/* social media share */}
      <div className="flex items-center gap-3 mt-5 md:mt-0">
        {/** derive current url/title when not provided (client-only) */}
        <ShareButtons shareUrl={shareUrl} title={title} />
      </div>
    </div>
  );
};

export default Tag;

function ShareButtons({
  shareUrl,
  title,
}: {
  shareUrl?: string;
  title?: string;
}) {
  const url =
    shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");
  const text = title ?? "";

  const openShare = (shareLink: string) => {
    if (typeof window === "undefined") return;
    window.open(
      shareLink,
      "share-dialog",
      "width=600,height=480,scrollbars=yes,resizable=yes"
    );
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  // Use the user's social profile URLs to open the profiles when clicked.
  const instagram = `https://www.instagram.com/mawardsal/`;
  const tiktok = `https://www.tiktok.com/@mawaridksa`;
  const snapchat = `https://www.snapchat.com/@mawardsal`;

  const btnClass =
    "bg-sectionBg w-10 h-10 rounded-full flex items-center justify-center text-primaryBlue hover:bg-primaryBlue hover:text-white duration-300 ease-in-out";

  return (
    <>
      <button
        aria-label="Share on Facebook"
        onClick={(e) => {
          e.preventDefault();
          openShare(facebook);
        }}
        className={btnClass}
        title="Share on Facebook"
      >
        <FaFacebookF size={18} />
      </button>

      <button
        aria-label="Share on X (Twitter)"
        onClick={(e) => {
          e.preventDefault();
          openShare(twitter);
        }}
        className={btnClass}
        title="Share on X (Twitter)"
      >
        <FaXTwitter size={18} />
      </button>

      <button
        aria-label="Share on Instagram"
        onClick={(e) => {
          e.preventDefault();
          openShare(instagram);
        }}
        className={btnClass}
        title="Share on Instagram"
      >
        <FaInstagram size={18} />
      </button>

      <button
        aria-label="Share on TikTok"
        onClick={(e) => {
          e.preventDefault();
          openShare(tiktok);
        }}
        className={btnClass}
        title="Share on TikTok"
      >
        <SiTiktok size={18} />
      </button>

      <button
        aria-label="Share on Snapchat"
        onClick={(e) => {
          e.preventDefault();
          openShare(snapchat);
        }}
        className={btnClass}
        title="Share on Snapchat"
      >
        <FaSnapchatGhost size={18} />
      </button>
    </>
  );
}
